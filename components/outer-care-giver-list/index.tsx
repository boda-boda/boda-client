import React, { useCallback, useEffect, useState } from 'react';
import CareInfoIconSVG from '../../svgs/care-info-icon-svg';
import PhoneNumberIconSVG from '../../svgs/phone-number-icon-svg';
import PlusIconSVG from '../../svgs/plus-icon-svg';
import * as S from './styles';
import MinusIconSVG from '../../svgs/minus-icon-svg';
import Link from 'next/link';
import {
  DAY_LIST,
  CARE_INFO_LIST,
  SEOUL_GU_DONG,
  KOREAN_CONSONANT_LIST,
  RELIGION_LIST,
  dummyCareWorkers,
  CAPABILITY,
  PAGINATION_LENGTH,
  OUTER_CARE_WORKER_SCHEDULE_TYPES,
} from '../../constant';
import {
  CareWorkerSchedule,
  toggleDayOfCareWorkerSchedule,
} from '../../model/care-worker-schedule';
import { DayType } from '../../common/types/date';
import axios from 'axios';
import { useCareCenter } from '../../context/care-center';
import CareWorker from '../../model/care-worker';
import DoubleArrowLeftSVG from '../../svgs/double-arrow-left';
import DoubleArrowRightSVG from '../../svgs/double-arrow-right';
import { range } from '../../common/lib';
import SingleArrowRightSVG from '../../svgs/single-arrow-right-svg';
import SingleArrowLeftSVG from '../../svgs/single-arrow-left-svg';

const slicedCareInfoList = [];
for (let i = 0; i < CARE_INFO_LIST.length; i += 5)
  slicedCareInfoList.push(CARE_INFO_LIST.slice(i, i + 5));

const slicedReligionList = [];
for (let i = 0; i < RELIGION_LIST.length; i += 5)
  slicedReligionList.push(RELIGION_LIST.slice(i, i + 5));

export default function OuterCareGiverList() {
  const careCenter = useCareCenter();

  const [rerender, setRerender] = useState(false);

  const [careWorkers, setCareWorkers] = useState([] as CareWorker[]);
  const [filteredCareWorkers, setFilteredCareWorkers] = useState([] as CareWorker[]);

  const [city, setCity] = useState('-1');
  const [gu, setGu] = useState('-1');
  const [dong, setDong] = useState('-1');
  const [selectedTime, setSelectedTime] = useState([] as string[]);
  const [schedules, setSchedules] = useState([CareWorkerSchedule.noArgsConstructor()]);
  const [selectedCareInfo, setSelectedCareInfo] = useState([] as string[]);
  const [selectedReligion, setSelectedReligion] = useState([] as string[]);
  const [selectedConsonantFilter, setSelectedConsonantFilter] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPaginationGroup, setCurrentPaginationGroup] = useState(0);
  const [careWorkersPerPage, setCareWorkersPerPage] = useState(10);

  const indexOfLastCareworker = currentPage * careWorkersPerPage;
  const indexOfFirstCareworker = indexOfLastCareworker - careWorkersPerPage;
  const currentPageCareWorkers = filteredCareWorkers.slice(
    indexOfFirstCareworker,
    indexOfLastCareworker
  );
  const maxPageNumber = Math.ceil(filteredCareWorkers.length / careWorkersPerPage);

  const getPaginationBarNumbers = useCallback(() => {
    return range(
      currentPaginationGroup * PAGINATION_LENGTH + 1,
      Math.min((currentPaginationGroup + 1) * PAGINATION_LENGTH, maxPageNumber)
    );
  }, [currentPaginationGroup, maxPageNumber]);

  useEffect(() => {
    if (careCenter.isValidating || !careCenter.isLoggedIn) return;

    (async () => {
      try {
        const response = await axios.get('/care-worker');
        setCareWorkers(response.data);
        setFilteredCareWorkers(response.data);
      } catch (e) {}
    })();
  }, [careCenter]);

  const toggleDays = (selectedDaysIndex: number, day: DayType) => {
    const newSchedules = [...schedules];
    toggleDayOfCareWorkerSchedule(newSchedules[selectedDaysIndex], day);
    setSchedules(newSchedules);
  };

  const toggleTime = (time: string) => {
    if (selectedTime.includes(time)) {
      setSelectedTime((selectedTime) => selectedTime.filter((selected) => selected !== time));
      return;
    }
    setSelectedTime([...selectedTime, time]);
  };

  const toggleCareInfo = (careInfo: string) => {
    if (selectedCareInfo.includes(careInfo)) {
      setSelectedCareInfo((selectedCareInfo) =>
        selectedCareInfo.filter((selected) => selected !== careInfo)
      );
      return;
    }
    setSelectedCareInfo([...selectedCareInfo, careInfo]);
  };

  const toggleReligion = (religion: string) => {
    if (selectedReligion.includes(religion)) {
      setSelectedReligion((selectedReligion) =>
        selectedReligion.filter((selected) => selected !== religion)
      );
      return;
    }
    setSelectedReligion([...selectedReligion, religion]);
  };

  const handleReset = useCallback(() => {
    if (!confirm('검색 조건을 초기화하시겠습니까?')) return;

    setCity('-1');
    setGu('-1');
    setDong('-1');
    setSelectedConsonantFilter(-1);
    setSchedules([CareWorkerSchedule.noArgsConstructor()]);
    setSelectedCareInfo([] as string[]);
    setSelectedReligion([] as string[]);
    setFilteredCareWorkers(careWorkers);
  }, [careWorkers]);

  const handleSearchOnClickSearchButton = () => {};

  return (
    <>
      <S.CgList>
        <S.Section isBackgroundColored={false}>
          <S.InnerSection>
            <S.InnerContent>
              <S.SectionTitle>요양보호사 검색</S.SectionTitle>
              <S.FilterTable>
                <tbody>
                  <tr>
                    <th>지역</th>
                    <td>
                      <S.DropDown
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        defaultValue="-1"
                      >
                        <option value="-1">시/도 선택</option>
                        <option value="서울특별시">서울특별시</option>
                      </S.DropDown>
                      <S.DropDown
                        value={gu}
                        onChange={(e) => setGu(e.target.value)}
                        defaultValue=""
                      >
                        <option value="-1">전체</option>
                        {city === '-1'
                          ? null
                          : SEOUL_GU_DONG.map((gudong, idx) => (
                              <option key={`${gudong.gu}-${idx}`} value={gudong.gu}>
                                {gudong.gu}
                              </option>
                            ))}
                      </S.DropDown>
                      <S.DropDown
                        value={dong}
                        onChange={(e) => setDong(e.target.value)}
                        defaultValue=""
                      >
                        <option value="-1">전체</option>
                        {city === '-1' || gu === '-1'
                          ? null
                          : SEOUL_GU_DONG.find((gudong) => gudong.gu === gu)?.dongs.map(
                              (dong, idx) => (
                                <option key={`${dong}-${idx}`} value={dong}>
                                  {dong}
                                </option>
                              )
                            )}
                      </S.DropDown>
                    </td>
                    <th>시간</th>
                    <td className="time">
                      <S.TimeSelectContainer>
                        {OUTER_CARE_WORKER_SCHEDULE_TYPES.map((time) => {
                          return (
                            <S.ToggleButton
                              isSelected={selectedTime.includes(time)}
                              className="square"
                              onClick={() => {
                                toggleTime(time);
                              }}
                              key={`timeListItem-${time}`}
                            >
                              {time}
                            </S.ToggleButton>
                          );
                        })}
                      </S.TimeSelectContainer>
                    </td>
                  </tr>
                  <tr>
                    <th>가능 조건</th>
                    <td className="innerTable" colSpan={3}>
                      <table>
                        <tbody>
                          {slicedCareInfoList.map((slicedCareInfo, row) => {
                            return (
                              <tr key={`${row}`}>
                                {slicedCareInfo.map((careInfo, index) => {
                                  return (
                                    <td
                                      className={`available ${index === 4 && 'right'} ${
                                        row === slicedCareInfoList.length - 1 && 'last'
                                      }`}
                                      key={`${index}`}
                                      onClick={() => toggleCareInfo(careInfo)}
                                    >
                                      <div className="hoverDiv">
                                        {careInfo}
                                        <S.CheckBox
                                          type="checkbox"
                                          checked={selectedCareInfo.includes(careInfo)}
                                          onChange={() => toggleCareInfo(careInfo)}
                                        />
                                      </div>
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <th className="innerTableHeader">종교</th>
                    <td className="innerTable" colSpan={3}>
                      <table>
                        <tbody>
                          {slicedReligionList.map((slicedReligion, row) => {
                            return (
                              <tr key={`${row}`}>
                                {slicedReligion.map((religion, index) => {
                                  return (
                                    <td
                                      className={`available ${index === 4 && 'right'} ${
                                        row === slicedReligionList.length - 1 && 'last'
                                      }`}
                                      key={`${index}`}
                                      onClick={() => toggleReligion(religion)}
                                    >
                                      <div className="hoverDiv">
                                        {religion}
                                        <S.CheckBox
                                          type="checkbox"
                                          checked={selectedReligion.includes(religion)}
                                          onChange={() => toggleReligion(religion)}
                                        />
                                      </div>
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </S.FilterTable>
              <S.ResetButtonContainer>
                <S.FilterButton onClick={handleReset} isReset>
                  초기화
                </S.FilterButton>
                <S.FilterButton onClick={handleSearchOnClickSearchButton}>검색</S.FilterButton>
              </S.ResetButtonContainer>
            </S.InnerContent>
          </S.InnerSection>
        </S.Section>
        <S.Section isBackgroundColored={true}>
          {careCenter.isValidating ||
            (!careCenter.isLoggedIn && (
              <S.NeedLogin>
                <S.NeedLoginModal>
                  자세한 내용은 회원가입 및 로그인 후에 확인 가능합니다.
                </S.NeedLoginModal>
              </S.NeedLogin>
            ))}
          <S.InnerSection isBlur={careCenter.isValidating || !careCenter.isLoggedIn}>
            <S.InnerContent>
              <S.SectionTitle>검색 결과</S.SectionTitle>
              <S.CareWorkersPerPageContainer>
                <S.CareWorkersPerPageDropDown
                  value={careWorkersPerPage}
                  onChange={(e) => {
                    setCareWorkersPerPage(Number(e.target.value) as number);
                    setCurrentPage(1);
                    setCurrentPaginationGroup(0);
                  }}
                >
                  <option value="10">10명 씩 보기</option>
                  <option value="20">20명 씩 보기</option>
                </S.CareWorkersPerPageDropDown>
              </S.CareWorkersPerPageContainer>
              <S.ConsonantFilterList>
                <S.ConsonantFilterItem
                  isClicked={selectedConsonantFilter === -1}
                  onClick={() => {
                    setSelectedConsonantFilter(-1);
                    setCurrentPage(1);
                  }}
                  isLeft
                >
                  전체
                </S.ConsonantFilterItem>
                {KOREAN_CONSONANT_LIST.map((name, nameIndex) => (
                  <S.ConsonantFilterItem
                    key={`name-${nameIndex}`}
                    isClicked={selectedConsonantFilter === nameIndex}
                    onClick={() => {
                      setSelectedConsonantFilter(nameIndex);
                    }}
                  >
                    {name}
                  </S.ConsonantFilterItem>
                ))}
              </S.ConsonantFilterList>
              <S.CardList>
                {!careCenter.isValidating && careCenter.isLoggedIn ? (
                  currentPageCareWorkers.length === 0 ? (
                    <S.EmptyCardContainer>
                      <S.EmptyCard>해당 조건의 요양보호사가 없습니다.</S.EmptyCard>
                    </S.EmptyCardContainer>
                  ) : (
                    <S.CardList>
                      {currentPageCareWorkers.map((worker, idx) => (
                        <S.StyledLink>
                          <Link
                            key={`worker-${idx}`}
                            href={{
                              pathname: '/list/[id]',
                            }}
                            as={`/list/${worker.id}`}
                            passHref
                          >
                            <S.Card>
                              <S.ProfileImage src={worker.profile} />
                              <S.InfoContainer>
                                <S.BasicInfo>
                                  {worker.name} ({worker.age}/{worker.gender[0]})
                                </S.BasicInfo>
                                {/* <S.Time>1시간 전</S.Time> TODO: 이거 구현해야함 백엔드에서 */}
                                <S.InfoRow>
                                  <S.SVGIconBox>
                                    <PhoneNumberIconSVG />
                                  </S.SVGIconBox>
                                  <S.InfoType>휴대전화</S.InfoType>
                                  <S.InfoValue>{worker.phoneNumber}</S.InfoValue>
                                </S.InfoRow>
                                <S.InfoRow>
                                  <S.SVGIconBox>
                                    <CareInfoIconSVG />
                                  </S.SVGIconBox>
                                  <S.InfoType>가능 조건</S.InfoType>

                                  <S.InfoItemList>
                                    {worker.careWorkerMetas
                                      ?.filter((meta) => meta.type === CAPABILITY)
                                      .map((meta, index) => {
                                        return (
                                          <S.InfoItem key={`careInfoItem-${index}`}>
                                            {meta.key}
                                          </S.InfoItem>
                                        );
                                      })}
                                  </S.InfoItemList>
                                </S.InfoRow>
                              </S.InfoContainer>
                            </S.Card>
                          </Link>
                        </S.StyledLink>
                      ))}
                      <S.PaginationContainer>
                        <S.PaginationItem
                          isLeft
                          key={'first-page-btn'}
                          onClick={() => {
                            setCurrentPage(1);
                            setCurrentPaginationGroup(0);
                          }}
                        >
                          <DoubleArrowLeftSVG />
                        </S.PaginationItem>
                        <S.PaginationItem
                          key={'previous-pageset-btn'}
                          onClick={() => {
                            const paginationGroup = Math.max(0, currentPaginationGroup - 1);

                            setCurrentPage(Math.max(currentPaginationGroup * PAGINATION_LENGTH, 1));
                            setCurrentPaginationGroup(paginationGroup);
                          }}
                        >
                          <SingleArrowLeftSVG />
                        </S.PaginationItem>
                        {getPaginationBarNumbers().map((pageNumber) => (
                          <S.PaginationItem
                            key={`page-${pageNumber}`}
                            onClick={() => {
                              setCurrentPage(pageNumber as number);
                            }}
                            isClicked={currentPage === pageNumber}
                          >
                            {pageNumber}
                          </S.PaginationItem>
                        ))}
                        <S.PaginationItem
                          key={'next-pageset-btn'}
                          onClick={() => {
                            const paginationGroup = Math.min(
                              Math.floor(maxPageNumber / PAGINATION_LENGTH),
                              currentPaginationGroup + 1
                            );
                            setCurrentPage(
                              Math.max(
                                paginationGroup * PAGINATION_LENGTH + 1,
                                getPaginationBarNumbers().slice(-1)[0]
                              )
                            );
                            setCurrentPaginationGroup(paginationGroup);
                          }}
                        >
                          <SingleArrowRightSVG />
                        </S.PaginationItem>
                        <S.PaginationItem key={'last-page-btn'}>
                          <DoubleArrowRightSVG
                            key={'last-page-btn'}
                            onClick={() => {
                              setCurrentPage(maxPageNumber);
                              setCurrentPaginationGroup(
                                Math.floor(maxPageNumber / PAGINATION_LENGTH)
                              );
                            }}
                          />
                        </S.PaginationItem>
                      </S.PaginationContainer>
                    </S.CardList>
                  )
                ) : (
                  <>
                    {dummyCareWorkers.map((worker, idx) => (
                      <S.Card key={`dummy-${idx}`}>
                        <S.ProfileImage src={worker.profile} />
                        <S.InfoContainer>
                          <S.BasicInfo>
                            {worker.name} ({worker.age}/{worker.gender[0]})
                          </S.BasicInfo>
                          <S.InfoRow>
                            <S.SVGIconBox>
                              <PhoneNumberIconSVG />
                            </S.SVGIconBox>
                            <S.InfoType>휴대전화</S.InfoType>
                            <S.InfoValue>{worker.phoneNumber}</S.InfoValue>
                          </S.InfoRow>
                          <S.InfoRow>
                            <S.SVGIconBox>
                              <CareInfoIconSVG />
                            </S.SVGIconBox>
                            <S.InfoType>가능 조건</S.InfoType>
                            <S.InfoItemList>
                              {worker.careWorkerMetas.map((meta, index) => {
                                return (
                                  <S.InfoItem key={`careInfoItem-${index}`}>{meta.key}</S.InfoItem>
                                );
                              })}
                            </S.InfoItemList>
                          </S.InfoRow>
                        </S.InfoContainer>
                      </S.Card>
                    ))}
                  </>
                )}
              </S.CardList>
            </S.InnerContent>
          </S.InnerSection>
        </S.Section>
      </S.CgList>
    </>
  );
}
