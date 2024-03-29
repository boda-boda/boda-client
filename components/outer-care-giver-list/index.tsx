import React from 'react';
import CareInfoIconSVG from '../../svgs/care-info-icon-svg';
import PhoneNumberIconSVG from '../../svgs/phone-number-icon-svg';
import * as S from './styles';
import Link from 'next/link';
import {
  CARE_INFO_LIST,
  SEOUL_GU_DONG,
  RELIGION_LIST,
  dummyCareWorkers,
  PAGINATION_LENGTH,
  OUTER_CARE_WORKER_SCHEDULE_TYPES,
} from '../../constant';
import DoubleArrowLeftSVG from '../../svgs/double-arrow-left';
import DoubleArrowRightSVG from '../../svgs/double-arrow-right';
import SingleArrowRightSVG from '../../svgs/single-arrow-right-svg';
import SingleArrowLeftSVG from '../../svgs/single-arrow-left-svg';
import { useOuterCareGiverList } from './hooks';

const slicedCareInfoList = [];
for (let i = 0; i < CARE_INFO_LIST.length; i += 5)
  slicedCareInfoList.push(CARE_INFO_LIST.slice(i, i + 5));

const slicedReligionList = [];
for (let i = 0; i < RELIGION_LIST.length; i += 5)
  slicedReligionList.push(RELIGION_LIST.slice(i, i + 5));

export default function OuterCareGiverList() {
  const {
    city,
    setCity,
    gu,
    setGu,
    dong,
    setDong,
    selectedTime,
    toggleTime,
    toggleCareInfo,
    selectedCareInfo,
    toggleReligion,
    selectedReligion,
    handleReset,
    careCenter,
    careWorkersPerPage,
    setCareWorkersPerPage,
    setCurrentPage,
    currentPage,
    maxPage,
    getPaginationBarNumbers,
    careWorkers,
    onClickSearchOuterCareGiver,
    convertedOuterCareWorkerIds,
  } = useOuterCareGiverList();

  return (
    <>
      <S.CgList>
        <S.Section isBackgroundColored={false}>
          <S.InnerSection>
            <S.InnerContent>
              <S.SectionTitle>돌봄 요양보호사 검색</S.SectionTitle>
              <S.FilterTable>
                <tbody>
                  <tr>
                    <th>지역</th>
                    <td>
                      <S.DropDown
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        defaultValue=""
                      >
                        <option value="">시/도 선택</option>
                        <option value="서울특별시">서울특별시</option>
                      </S.DropDown>
                      <S.DropDown
                        value={gu}
                        onChange={(e) => setGu(e.target.value)}
                        defaultValue=""
                      >
                        <option value="">전체</option>
                        {city === ''
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
                        <option value="">전체</option>
                        {city === '' || gu === ''
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
                <S.FilterButton onClick={onClickSearchOuterCareGiver}>검색</S.FilterButton>
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
              <S.CardList>
                {!careCenter.isValidating && careCenter.isLoggedIn ? (
                  careWorkers.length === 0 ? (
                    <S.EmptyCardContainer>
                      <S.EmptyCard>해당 조건의 요양보호사가 없습니다.</S.EmptyCard>
                    </S.EmptyCardContainer>
                  ) : (
                    <S.CardList>
                      {careWorkers.map((worker, idx) =>
                        convertedOuterCareWorkerIds.includes(worker.id) ? (
                          <S.StyledLink>
                            <Link
                              key={`worker-${idx}`}
                              href={{
                                pathname: '/search/[id]',
                              }}
                              as={`/search/${worker.id}`}
                              passHref
                            >
                              <S.Card>
                                <S.ProfileImage src={worker.profile} />
                                <S.InfoContainer>
                                  <S.BasicInfo>
                                    {worker.name} ({worker.age}/{worker.gender[0]})
                                  </S.BasicInfo>
                                  <S.ConvertedInfo>이미 전환된 요양보호사 입니다.</S.ConvertedInfo>
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
                                      {worker.outerCareWorkerCapabilities.map(
                                        (capability, index) => {
                                          return (
                                            <S.InfoItem key={`careInfoItem-${index}`}>
                                              {capability}
                                            </S.InfoItem>
                                          );
                                        }
                                      )}
                                    </S.InfoItemList>
                                  </S.InfoRow>
                                </S.InfoContainer>
                              </S.Card>
                            </Link>
                          </S.StyledLink>
                        ) : (
                          <S.StyledLink>
                            <Link
                              key={`worker-${idx}`}
                              href={{
                                pathname: '/search/[id]',
                              }}
                              as={`/search/${worker.id}`}
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
                                      {worker.outerCareWorkerCapabilities.map(
                                        (capability, index) => {
                                          return (
                                            <S.InfoItem key={`careInfoItem-${index}`}>
                                              {capability}
                                            </S.InfoItem>
                                          );
                                        }
                                      )}
                                    </S.InfoItemList>
                                  </S.InfoRow>
                                </S.InfoContainer>
                              </S.Card>
                            </Link>
                          </S.StyledLink>
                        )
                      )}
                      <S.PaginationContainer>
                        <S.PaginationItem
                          isLeft
                          key={'first-page-btn'}
                          onClick={() => {
                            setCurrentPage(1);
                          }}
                        >
                          <DoubleArrowLeftSVG />
                        </S.PaginationItem>
                        <S.PaginationItem
                          key={'previous-pageset-btn'}
                          onClick={() => {
                            if (currentPage === 1) return;
                            setCurrentPage(currentPage - 1);
                          }}
                        >
                          <SingleArrowLeftSVG />
                        </S.PaginationItem>
                        {getPaginationBarNumbers().map((pageNumber) => (
                          <S.PaginationItem
                            key={`page-${pageNumber}`}
                            onClick={() => {
                              setCurrentPage(pageNumber);
                            }}
                            isClicked={currentPage === pageNumber}
                          >
                            {pageNumber}
                          </S.PaginationItem>
                        ))}
                        <S.PaginationItem
                          key={'next-pageset-btn'}
                          onClick={() => {
                            if (currentPage === maxPage) return;
                            setCurrentPage(currentPage + 1);
                          }}
                        >
                          <SingleArrowRightSVG />
                        </S.PaginationItem>
                        <S.PaginationItem key={'last-page-btn'}>
                          <DoubleArrowRightSVG
                            key={'last-page-btn'}
                            onClick={() => {
                              setCurrentPage(maxPage);
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
