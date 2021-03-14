import React, { useState } from 'react';
import CareInfoIconSVG from '../../svgs/care-info-icon-svg';
import PhoneNumberIconSVG from '../../svgs/phone-number-icon-svg';
import PlusIconSVG from '../../svgs/plus-icon-svg';
import * as S from './styles';
import MinusIconSVG from '../../svgs/minus-icon-svg';
import Link from 'next/link';
import { dayList, careInfoList, seoulGuDong } from '../../constant';
import CareGiverSchedule from '../../model/care-giver-schedule';
import { DayType } from '../../common/types/date';

interface CareGiverListProps {
  isMyCaregiver: boolean;
}

const careInfo = ['석션', '휠체어', '기저귀', '목욕', '재활']; //얘네는 임시
const slicedCareInfoList = [];
for (let i = 0; i < careInfoList.length; i += 5)
  slicedCareInfoList.push(careInfoList.slice(i, i + 5));
const SEARCH_TIMES = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const SEARCH_MINUTES = Array.from(Array(60).keys()).filter((a) => a % 5 === 0);

export default function CareGiverList({ isMyCaregiver }: CareGiverListProps) {
  const [rerender, setRerender] = useState(false);

  const [schedules, setSchedules] = useState([new CareGiverSchedule()]);
  const [selectedCareInfo, setSelectedCareInfo] = useState([] as string[]);

  const [gu, setGu] = useState('-1');
  const [dong, setDong] = useState('-1');

  const toggleDays = (selectedDaysIndex: number, day: DayType) => {
    const newSchedules = [...schedules];
    newSchedules[selectedDaysIndex].toggleDay(day);
    setSchedules(newSchedules);
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

  const handleReset = () => {
    if (!confirm('검색 조건을 초기화하시겠습니까?')) return;

    setSchedules([new CareGiverSchedule()]);
    setSelectedCareInfo([]);
  };

  return (
    <>
      <S.CgList>
        <S.Section isBackgroundColored={false}>
          <S.InnerContent>
            <S.SectionTitle>요양보호사 검색</S.SectionTitle>
            <S.FilterTable>
              <tbody>
                <tr>
                  <th>지역</th>
                  <td>
                    <S.DropDown defaultValue="">
                      <option value="" disabled hidden>
                        시/도 선택
                      </option>
                      <option value="서울특별시">서울특별시</option>
                    </S.DropDown>
                    <S.DropDown onChange={(e) => setGu(e.target.value)} defaultValue="">
                      <option value="" disabled hidden>
                        구 선택
                      </option>
                      {seoulGuDong.map((gudong, idx) => (
                        <option key={`${gudong.gu}-${idx}`} value={gudong.gu}>
                          {gudong.gu}
                        </option>
                      ))}
                    </S.DropDown>
                    <S.DropDown defaultValue="">
                      <option value="" disabled>
                        동 선택
                      </option>
                      {gu === '-1'
                        ? null
                        : seoulGuDong
                            .find((gudong) => gudong.gu === gu)
                            ?.dongs.map((dong, idx) => (
                              <option key={`${dong}-${idx}`} value={dong}>
                                {dong}
                              </option>
                            ))}
                    </S.DropDown>
                  </td>
                </tr>
                <tr>
                  <th>돌봄 시간</th>
                  <td style={{ padding: 0 }}>
                    {schedules.map((schedule, scheduleIndex) => {
                      return (
                        <S.TimeSelectContainer
                          isLast={schedules.length - 1 === scheduleIndex}
                          key={`timeselectcontainer-${scheduleIndex}`}
                        >
                          <S.TdFlexBox>
                            {dayList.map((day) => {
                              return (
                                <S.ToggleButton
                                  isSelected={schedule.isDayIncluded(day)}
                                  className="square"
                                  onClick={() => toggleDays(scheduleIndex, day)}
                                  key={`dayListItem-${day}`}
                                >
                                  {day}
                                </S.ToggleButton>
                              );
                            })}
                          </S.TdFlexBox>
                          <S.TdFlexBox>
                            <S.ClockSelectContainer>
                              <S.ClockInput
                                type="text"
                                maxLength={2}
                                value={schedule.startHour ? schedule.startHour : 0}
                                onChange={(e) => {
                                  const currentHour = e.target.value.replace(/[^0-9]/g, '');
                                  schedule.startHour = parseInt(currentHour);
                                  if (schedule.startHour >= 24) schedule.startHour = 23;
                                  setRerender(!rerender);
                                }}
                              />
                              시
                              <S.ClockInput
                                type="text"
                                maxLength={2}
                                value={schedule.startMinute ? schedule.startMinute : 0}
                                onChange={(e) => {
                                  const currentMinute = e.target.value.replace(/[^0-9]/g, '');
                                  schedule.startMinute = parseInt(currentMinute);
                                  if (schedule.startMinute >= 60) schedule.startMinute = 59;
                                  setRerender(!rerender);
                                }}
                              />
                              분
                            </S.ClockSelectContainer>
                            부터
                            <S.ClockSelectContainer>
                              <S.ClockInput
                                type="text"
                                maxLength={2}
                                value={schedule.endHour ? schedule.endHour : 0}
                                onChange={(e) => {
                                  const currentHour = e.target.value.replace(/[^0-9]/g, '');
                                  schedule.endHour = parseInt(currentHour);
                                  if (schedule.endHour >= 24) schedule.endHour = 23;
                                  setRerender(!rerender);
                                }}
                              />
                              시
                              <S.ClockInput
                                type="text"
                                maxLength={2}
                                value={schedule.endMinute ? schedule.endMinute : 0}
                                onChange={(e) => {
                                  const currentMinute = e.target.value.replace(/[^0-9]/g, '');
                                  schedule.endMinute = parseInt(currentMinute);
                                  if (schedule.endMinute >= 60) schedule.endMinute = 59;
                                  setRerender(!rerender);
                                }}
                              />
                              분
                            </S.ClockSelectContainer>
                            까지
                          </S.TdFlexBox>
                          {schedules.length - 1 === scheduleIndex ? (
                            <S.AddButton
                              onClick={() => {
                                setSchedules([...schedules, new CareGiverSchedule()]);
                              }}
                            >
                              <PlusIconSVG />
                            </S.AddButton>
                          ) : (
                            <S.AddButton
                              onClick={() =>
                                setSchedules((schedules) =>
                                  schedules.filter((_, i) => i !== scheduleIndex)
                                )
                              }
                            >
                              <MinusIconSVG />
                            </S.AddButton>
                          )}
                        </S.TimeSelectContainer>
                      );
                    })}
                  </td>
                </tr>
                <tr>
                  <th rowSpan={2}>가능 조건</th>
                  <td className="innerTable">
                    <table>
                      <tbody>
                        {slicedCareInfoList.map((slicedCareInfo, row) => {
                          return (
                            <tr key={`${row}`}>
                              {slicedCareInfo.map((careInfo, index) => {
                                return (
                                  <td
                                    className={`available ${index === 4 && 'right'}`}
                                    key={`${index}`}
                                  >
                                    {careInfo}
                                    <S.CheckBox
                                      type="checkbox"
                                      onChange={() => toggleCareInfo(careInfo)}
                                    />
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
              <S.FilterButton onClick={handleReset}>검색</S.FilterButton>
            </S.ResetButtonContainer>
          </S.InnerContent>
        </S.Section>
        <S.Section isBackgroundColored={true}>
          <S.InnerContent>
            <S.SectionTitle>검색 결과</S.SectionTitle>
            <S.CardList>
              <Link
                href={{
                  pathname: '/list/[id]',
                }}
                as={`/list/0`}
                passHref
              >
                <S.StyledLink>
                  <S.Card>
                    <S.ProfileImage src="https://user-images.githubusercontent.com/52532871/110496615-001dbd00-8139-11eb-80b6-78d719193f1d.jpeg" />
                    <S.InfoContainer>
                      <S.BasicInfo>김요양 (60/여)</S.BasicInfo>
                      <S.Time>1시간 전</S.Time>
                      <S.InfoTable>
                        <tbody>
                          <tr>
                            <td>
                              <S.SVGIconBox>
                                <PhoneNumberIconSVG />
                              </S.SVGIconBox>
                            </td>
                            <th>연락처</th>
                            <td>010-1234-1234</td>
                          </tr>
                          <tr>
                            <td>
                              <S.SVGIconBox>
                                <CareInfoIconSVG />
                              </S.SVGIconBox>
                            </td>
                            <th>가능 조건</th>
                            <td>
                              <S.InfoItemList>
                                {careInfo.map((careInfo, index) => {
                                  return (
                                    <S.InfoItem key={`careInfoItem-${index}`}>
                                      {careInfo}
                                    </S.InfoItem>
                                  );
                                })}
                              </S.InfoItemList>
                            </td>
                          </tr>
                        </tbody>
                      </S.InfoTable>
                    </S.InfoContainer>
                  </S.Card>
                </S.StyledLink>
              </Link>
              <Link
                href={{
                  pathname: '/list/[id]',
                }}
                as={`/list/1`}
                passHref
              >
                <S.StyledLink>
                  <S.Card>
                    <S.ProfileImage src="https://user-images.githubusercontent.com/52532871/110496616-014eea00-8139-11eb-821b-0da24e11a924.jpeg" />
                    <S.InfoContainer>
                      <S.BasicInfo>조요양 (41/여)</S.BasicInfo>
                      <S.Time>1시간 전</S.Time>
                      <S.InfoTable>
                        <tbody>
                          <tr>
                            <td>
                              <S.SVGIconBox>
                                <PhoneNumberIconSVG />
                              </S.SVGIconBox>
                            </td>
                            <th>연락처</th>
                            <td>010-1234-1234</td>
                          </tr>
                          <tr>
                            <td>
                              <S.SVGIconBox>
                                <CareInfoIconSVG />
                              </S.SVGIconBox>
                            </td>
                            <th>가능 조건</th>
                            <td>
                              <S.InfoItemList>
                                {careInfo.map((careInfo, index) => {
                                  return (
                                    <S.InfoItem key={`careInfoItem-${index}`}>
                                      {careInfo}
                                    </S.InfoItem>
                                  );
                                })}
                              </S.InfoItemList>
                            </td>
                          </tr>
                        </tbody>
                      </S.InfoTable>
                    </S.InfoContainer>
                  </S.Card>
                </S.StyledLink>
              </Link>
              <Link
                href={{
                  pathname: '/list/[id]',
                }}
                as={`/list/2`}
                passHref
              >
                <S.StyledLink>
                  <S.Card>
                    <S.ProfileImage src="https://user-images.githubusercontent.com/52532871/110497825-27c15500-813a-11eb-9bc3-f50574285d26.jpeg" />
                    <S.InfoContainer>
                      <S.BasicInfo>박요양 (48/여)</S.BasicInfo>
                      <S.Time>1시간 전</S.Time>
                      <S.InfoTable>
                        <tbody>
                          <tr>
                            <td>
                              <S.SVGIconBox>
                                <PhoneNumberIconSVG />
                              </S.SVGIconBox>
                            </td>
                            <th>연락처</th>
                            <td>010-1234-1234</td>
                          </tr>
                          <tr>
                            <td>
                              <S.SVGIconBox>
                                <CareInfoIconSVG />
                              </S.SVGIconBox>
                            </td>
                            <th>가능 조건</th>
                            <td>
                              <S.InfoItemList>
                                {careInfo.map((careInfo, index) => {
                                  return (
                                    <S.InfoItem key={`careInfoItem-${index}`}>
                                      {careInfo}
                                    </S.InfoItem>
                                  );
                                })}
                              </S.InfoItemList>
                            </td>
                          </tr>
                        </tbody>
                      </S.InfoTable>
                    </S.InfoContainer>
                  </S.Card>
                </S.StyledLink>
              </Link>
              <Link
                href={{
                  pathname: '/list/[id]',
                }}
                as={`/list/3`}
                passHref
              >
                <S.StyledLink>
                  <S.Card>
                    <S.ProfileImage src="https://user-images.githubusercontent.com/52532871/110497839-2a23af00-813a-11eb-8a6b-07e11fa47792.jpeg" />
                    <S.InfoContainer>
                      <S.BasicInfo>강요양 (54/여)</S.BasicInfo>
                      <S.Time>1시간 전</S.Time>
                      <S.InfoTable>
                        <tbody>
                          <tr>
                            <td>
                              <S.SVGIconBox>
                                <PhoneNumberIconSVG />
                              </S.SVGIconBox>
                            </td>
                            <th>연락처</th>
                            <td>010-1234-1234</td>
                          </tr>
                          <tr>
                            <td>
                              <S.SVGIconBox>
                                <CareInfoIconSVG />
                              </S.SVGIconBox>
                            </td>
                            <th>가능 조건</th>
                            <td>
                              <S.InfoItemList>
                                {careInfo.map((careInfo, index) => {
                                  return (
                                    <S.InfoItem key={`careInfoItem-${index}`}>
                                      {careInfo}
                                    </S.InfoItem>
                                  );
                                })}
                              </S.InfoItemList>
                            </td>
                          </tr>
                        </tbody>
                      </S.InfoTable>
                    </S.InfoContainer>
                  </S.Card>
                </S.StyledLink>
              </Link>
            </S.CardList>
          </S.InnerContent>
        </S.Section>
      </S.CgList>
    </>
  );
}
