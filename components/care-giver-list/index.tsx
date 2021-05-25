import React, { useCallback, useEffect, useState } from 'react';
import CareInfoIconSVG from '../../svgs/care-info-icon-svg';
import PhoneNumberIconSVG from '../../svgs/phone-number-icon-svg';
import PlusIconSVG from '../../svgs/plus-icon-svg';
import * as S from './styles';
import MinusIconSVG from '../../svgs/minus-icon-svg';
import Link from 'next/link';
import {
  CARE_INFO_LIST,
  SEOUL_GU_DONG,
  KOREAN_CONSONANT_LIST,
  KOREAN_ASCII_LIST,
  LOCALSTORAGE_KEY,
  RELIGION_LIST,
  dummyCareWorkers,
  CAPABILITY,
  PAGINATION_LENGTH,
  WORKING_STATE,
  OUTER_CARE_WORKER_SCHEDULE_TYPES,
  NAME_ORDER,
} from '../../constant';
import {
  CareWorkerSchedule,
  isCareWorkerScheduleValid,
  isCareWorkerScheduleValidListPage,
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

export default function CareGiverList() {
  const careCenter = useCareCenter();

  const [rerender, setRerender] = useState(false);

  const [careWorkers, setCareWorkers] = useState([] as CareWorker[]);
  const [filteredCareWorkers, setFilteredCareWorkers] = useState([] as CareWorker[]);

  const [name, setName] = useState('');
  const [city, setCity] = useState('-1');
  const [gu, setGu] = useState('-1');
  const [dong, setDong] = useState('-1');
  const [schedules, setSchedules] = useState([CareWorkerSchedule.noArgsConstructor()]);
  const [selectedCareInfo, setSelectedCareInfo] = useState([] as string[]);
  const [selectedReligion, setSelectedReligion] = useState([] as string[]);
  const [selectedWorkingState, setSelectedWorkingState] = useState([] as string[]);
  const [selectedConsonantFilter, setSelectedConsonantFilter] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPaginationGroup, setCurrentPaginationGroup] = useState(0);
  const [careWorkersPerPage, setCareWorkersPerPage] = useState(10);
  const [selectedTime, setSelectedTime] = useState('');
  const [useLocalStorage, setUseLocalStorage] = useState(false);

  const [isLocalStorageLoaded, setIsLocalStorageLoaded] = useState(false);

  const indexOfLastCareworker = currentPage * careWorkersPerPage;
  const indexOfFirstCareworker = indexOfLastCareworker - careWorkersPerPage;
  const currentPageCareWorkers = filteredCareWorkers.slice(
    indexOfFirstCareworker,
    indexOfLastCareworker
  );
  const maxPageNumber = Math.ceil(filteredCareWorkers.length / careWorkersPerPage);

  // Pagination 원래방식, 원래는 현재 페이지가 중앙에, 바뀐 코드는 현재 페이지 상관없이 다음 버튼(single arrow) 눌러야 넘어감
  // const getPagenationBarNumbers = useCallback(() => {
  //   if (currentPage > 2 && currentPage < maxPageNumber - 1) {
  //     return range(Math.max(1, currentPage - 2), Math.min(maxPageNumber, currentPage + 2));
  //   } else if (currentPage <= 2) {
  //     return range(1, Math.min(maxPageNumber, 5));
  //   } else {
  //     return range(Math.max(maxPageNumber - 4, 1), maxPageNumber);
  //   }
  // }, [currentPage, careWorkersPerPage, maxPageNumber]);

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
        response.data.sort(NAME_ORDER);
        setCareWorkers(response.data);
        setFilteredCareWorkers(response.data);
      } catch (e) {}
    })();
  }, [careCenter]);

  const toggleTime = (time: string) => {
    if (time === selectedTime) {
      setSelectedTime('');
      return;
    }
    setSelectedTime(time);
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

  const toggleWorkingState = (state: string) => {
    if (selectedWorkingState.includes(state)) {
      setSelectedWorkingState((selectedWorkingState) =>
        selectedWorkingState.filter((selected) => selected !== state)
      );
      return;
    }
    setSelectedWorkingState([...selectedWorkingState, state]);
  };

  const handleReset = useCallback(() => {
    if (!confirm('검색 조건을 초기화하시겠습니까?')) return;

    setName('');
    setCity('-1');
    setGu('-1');
    setDong('-1');
    setSelectedConsonantFilter(-1);
    setSchedules([CareWorkerSchedule.noArgsConstructor()]);
    setSelectedCareInfo([] as string[]);
    setSelectedReligion([] as string[]);
    setSelectedTime('');
    setSelectedWorkingState([] as string[]);
    setFilteredCareWorkers(careWorkers);
    setCurrentPage(1);
    setCurrentPaginationGroup(0);
  }, [careWorkers]);

  const filterByLetter = (letters: string[], cwName: string) => {
    if (letters.length > cwName.length) return false;

    return letters.every(
      (letter, index) =>
        cwName[index].charCodeAt(0) >=
          KOREAN_ASCII_LIST[KOREAN_CONSONANT_LIST.indexOf(letter)][0].charCodeAt(0) &&
        cwName[index].charCodeAt(0) <=
          KOREAN_ASCII_LIST[KOREAN_CONSONANT_LIST.indexOf(letter)][1].charCodeAt(0)
    );
  };

  const filterName = (cws: CareWorker[]) => {
    const result = cws.filter((cw: CareWorker) => {
      if (name === '-1') return true;
      if (name.split('').every((letter) => KOREAN_CONSONANT_LIST.includes(letter))) {
        return filterByLetter(name.split(''), cw.name);
      }
      if (name.length > cw.name.length) return false;
      return cw.name.includes(name);
    });
    return result;
  };

  const filterArea = (cws: CareWorker[]) => {
    const result = cws.filter((cw: CareWorker) => {
      if (city === '-1') return true;
      return (
        cw.careWorkerAreas.length !== 0 &&
        cw.careWorkerAreas.some(
          (area) =>
            area.city === city &&
            (area.gu === gu || gu === '-1' || !area.gu) &&
            (area.dong === dong || dong === '-1' || !area.dong)
        )
      );
    });
    return result;
  };

  const filterSchedule = (cws: CareWorker[]) => {
    const result = cws.filter((cw: CareWorker) =>
      schedules.every((filterSchedule) =>
        cw.careWorkerSchedules.every((singleSchedule) =>
          filterSchedule.days.every(
            (day) =>
              singleSchedule.day !== day ||
              parseInt(singleSchedule.startAt.split(':')[0], 10) * 60 +
                parseInt(singleSchedule.startAt.split(':')[1], 10) >
                filterSchedule.endHour * 60 + filterSchedule.endMinute ||
              parseInt(singleSchedule.endAt.split(':')[0], 10) * 60 +
                parseInt(singleSchedule.endAt.split(':')[1], 10) <
                filterSchedule.startHour * 60 + filterSchedule.startMinute
          )
        )
      )
    );
    return result;
  };

  const filterCareInfo = (cws: CareWorker[]) => {
    const result = cws.filter((cw: CareWorker) =>
      selectedCareInfo.every((careInfo) =>
        cw.careWorkerMetas
          .filter((meta) => meta.type === 'Capability')
          .map((meta) => meta.key)
          .includes(careInfo)
      )
    );
    return result;
  };
  const filterReligion = (cws: CareWorker[]) => {
    const result =
      selectedReligion.length === 0
        ? cws
        : cws.filter((cw: CareWorker) =>
            selectedReligion.some((religion) =>
              cw.careWorkerMetas
                .filter((meta) => meta.type === 'Religion')
                .map((meta) => meta.key)
                .includes(religion)
            )
          );
    return result;
  };

  const filterTime = (cws: CareWorker[]) => {
    const result =
      selectedTime === ''
        ? cws
        : cws.filter((cw: CareWorker) => cw.time === selectedTime || cw.time === '종일');
    return result;
  };

  const filterWorkingState = (cws: CareWorker[]) => {
    const result =
      selectedWorkingState.length === 0
        ? cws
        : cws.filter((cw: CareWorker) => selectedWorkingState.includes(cw.workingState));
    return result;
  };

  const filterNameByLetter = (cws: CareWorker[]) => {
    if (selectedConsonantFilter === -1) return cws;
    const result = cws.filter(
      (cw: CareWorker) =>
        cw.name[0].charCodeAt(0) >= KOREAN_ASCII_LIST[selectedConsonantFilter][0].charCodeAt(0) &&
        cw.name[0].charCodeAt(0) <= KOREAN_ASCII_LIST[selectedConsonantFilter][1].charCodeAt(0)
    );
    return result;
  };

  const handleOnClickConsonantFilterItem = (nameIndex: number) => {
    setSelectedConsonantFilter(nameIndex);
    setCurrentPage(1);
    setCurrentPaginationGroup(0);
  };

  const handleSearchOnClickSearchButton = () => {
    if (schedules.some((a) => !isCareWorkerScheduleValidListPage(a))) {
      alert(
        '요양보호사 스케줄 양식에 오류가 있습니다. \n\n시작시간은 종료시간을 넘어갈 수 없습니다.'
      );
      return;
    }

    setFilteredCareWorkers(
      filterNameByLetter(
        filterTime(
          filterWorkingState(filterReligion(filterCareInfo(filterArea(filterName(careWorkers)))))
        )
      )
    );
    setSelectedConsonantFilter(-1);
    setCurrentPage(1);
    setCurrentPaginationGroup(0);
  };

  const handleSearchOnClickConsonantFilterItem = () => {
    setFilteredCareWorkers(
      filterNameByLetter(
        filterTime(
          filterWorkingState(filterReligion(filterCareInfo(filterArea(filterName(careWorkers)))))
        )
      )
    );
    setCurrentPage(1);
    setCurrentPaginationGroup(0);
  };

  useEffect(() => {
    if (selectedConsonantFilter === -1) handleSearchOnClickSearchButton();
    else handleSearchOnClickConsonantFilterItem();
  }, [selectedConsonantFilter, isLocalStorageLoaded]);

  // 로컬 스토리지에
  // prettier-ignore
  useEffect(() => {
    if(!filteredCareWorkers.length || isLocalStorageLoaded) return; // 이미 가져왔으면 안 함, careWorker가 없는 상황에는 안함
    const savedSearchParams = localStorage.getItem(LOCALSTORAGE_KEY.MY_CARE_WORKER_SEARCH_PARAMS);
    if (savedSearchParams === null) {
      setIsLocalStorageLoaded(true);
      return; // 저장된게 없으면 안 가져옴 (오류 방지)
    }
    try { 
      const { name, city, gu, dong, schedules, selectedCareInfo, selectedConsonantFilter, currentPage, careWorkersPerPage, selectedWorkingState, selectedTime, selectedReligion, useLocalStorage } = JSON.parse(savedSearchParams) as any;
      setName(name ? name : ''); setCity(city ? city : '-1'); setGu(gu ? gu : '-1'); setDong(dong ? dong : '-1'); setSchedules(schedules ? schedules : []); setSelectedCareInfo(selectedCareInfo ? selectedCareInfo : []); setSelectedConsonantFilter(selectedConsonantFilter ? selectedConsonantFilter : -1); setCurrentPage(currentPage ? currentPage : 1); setCareWorkersPerPage(careWorkersPerPage ? careWorkersPerPage : 10);
      setIsLocalStorageLoaded(true); setSelectedWorkingState(selectedWorkingState ? selectedWorkingState : []); setSelectedTime(selectedTime ? selectedTime:''); setSelectedReligion(selectedReligion ? selectedReligion : []); setUseLocalStorage(useLocalStorage?useLocalStorage:false);
    }
    catch {
      localStorage.removeItem(LOCALSTORAGE_KEY.MY_CARE_WORKER_SEARCH_PARAMS);
    }
  }, [name, city, gu, dong, schedules, selectedCareInfo, filteredCareWorkers, selectedWorkingState, selectedTime, selectedReligion, useLocalStorage]);

  // 로컬 스토리지에 검색결과 저장 (작성 후 1초 후에 저장 - 디바운스를 위함) // TODO: 검증 및 최적화
  useEffect(() => {
    if (!isLocalStorageLoaded) return; // 한번도 가져온 적이 없으면 저장하지 않게 함
    if (useLocalStorage) {
      //로컬스토리지 사용 체크됐을 때만 저장
      const timeout = setTimeout(() => {
        const availableSchedule = schedules.filter((a) => isCareWorkerScheduleValid(a));

        if (!availableSchedule.length) {
          localStorage.setItem(LOCALSTORAGE_KEY.MY_CARE_WORKER_SEARCH_PARAMS, JSON.stringify({
      name,city,gu,dong, schedules : [CareWorkerSchedule.noArgsConstructor()], selectedCareInfo, selectedConsonantFilter, currentPage,careWorkersPerPage, selectedWorkingState, selectedTime, selectedReligion, useLocalStorage,
    })) // prettier-ignore
        } else {
          localStorage.setItem(LOCALSTORAGE_KEY.MY_CARE_WORKER_SEARCH_PARAMS, JSON.stringify({
      name,city,gu,dong,schedules : availableSchedule, selectedCareInfo, selectedConsonantFilter, currentPage,careWorkersPerPage, selectedWorkingState, selectedTime, selectedReligion, useLocalStorage,
    })) // prettier-ignore
        }
      }, 500);
      return () => clearTimeout(timeout);
    } else {
      //로컬스토리지 사용 체크 해제했을 때 로컬스토리지 사용 여부만 저장함
      localStorage.setItem(
        LOCALSTORAGE_KEY.MY_CARE_WORKER_SEARCH_PARAMS,
        JSON.stringify({
          useLocalStorage,
        })
      );
    }
  }, [
    name,
    city,
    gu,
    dong,
    schedules,
    selectedCareInfo,
    selectedConsonantFilter,
    currentPage,
    careWorkersPerPage,
    rerender,
    selectedWorkingState,
    selectedTime,
    selectedReligion,
    useLocalStorage,
  ]);

  return (
    <>
      <S.CgList>
        <S.Section isBackgroundColored={false}>
          <S.InnerSection>
            <S.InnerContent>
              <S.SectionTitleWrapper>
                <S.SectionTitle>요양보호사 검색</S.SectionTitle>
                <S.UseLocalStorageWrapper onClick={() => setUseLocalStorage(!useLocalStorage)}>
                  검색필터 저장하기
                </S.UseLocalStorageWrapper>
                <S.LocalStorageCheckBox
                  type="checkbox"
                  checked={useLocalStorage}
                  onChange={() => setUseLocalStorage(!useLocalStorage)}
                ></S.LocalStorageCheckBox>
              </S.SectionTitleWrapper>
              <S.FilterTable>
                <tbody>
                  <tr>
                    <th>이름</th>
                    <td>
                      <S.TextInput
                        value={name}
                        onKeyPress={(e: any) => {
                          if (e.key === 'Enter') {
                            handleSearchOnClickSearchButton();
                            return;
                          }
                        }}
                        onChange={(e: any) => {
                          setName(e.target.value);
                        }}
                        autoFocus
                      ></S.TextInput>
                    </td>
                    <th>시간</th>
                    <td className="time">
                      <S.TimeSelectContainer>
                        {OUTER_CARE_WORKER_SCHEDULE_TYPES.map((time) => {
                          return (
                            <S.ToggleButton
                              isSelected={selectedTime === time}
                              className="square"
                              onClick={() => toggleTime(time)}
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
                    <th>지역</th>
                    <td colSpan={3}>
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
                  <tr>
                    <th className="innerTableHeader">재직 구분</th>
                    <td className="innerTable" colSpan={3}>
                      <table>
                        <tbody>
                          <tr>
                            {WORKING_STATE.map((item, index) => {
                              return (
                                <td className={`available  last`} key={`${index}`}>
                                  <div
                                    className="hoverDiv"
                                    onClick={() => toggleWorkingState(item)}
                                  >
                                    {item}
                                    <S.CheckBox
                                      type="checkbox"
                                      checked={selectedWorkingState.includes(item)}
                                      onChange={() => toggleWorkingState(item)}
                                    />
                                  </div>
                                </td>
                              );
                            })}
                            <td className="available last empty"></td>
                            <td className="available last empty right"></td>
                          </tr>
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
                    setCurrentPaginationGroup(0);
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
                      handleOnClickConsonantFilterItem(nameIndex);
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
