import React, { useState } from 'react';
import CareInfoIconSVG from '../../svgs/care-info-icon-svg';
import PhoneNumberIconSVG from '../../svgs/phone-number-icon-svg';
import TimeInput from '../../svgs/time-input-svg';
import PlusIconSVG from '../../svgs/plus-icon-svg';
import * as S from './styles';
import MinusIconSVG from '../../svgs/minus-icon-svg';
import Link from 'next/link';
import { dayList, careInfoList } from '../../constant';

interface CareGiverListProps {
  isMyCaregiver: boolean;
}

const careInfo = ['석션', '휠체어', '기저귀', '목욕', '재활']; //얘네는 임시

export default function CareGiverList({ isMyCaregiver }: CareGiverListProps) {
  const [selectedDayList, setSelectedDayList] = useState([[]] as string[][]);
  const [selectedCareInfo, setSelectedCareInfo] = useState([] as string[]);
  const [selectedPersonalityInfo, setSelectedPersonalityInfo] = useState([] as string[]);
  const toggleDays = (selectedDays: string[], selectedDaysIndex: number, day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDayList((selectedDayList) =>
        selectedDayList.map((selectedDay, selectedDayIndex) => {
          if (selectedDayIndex === selectedDaysIndex)
            return selectedDay.filter((selected) => selected !== day);
          return selectedDay;
        })
      );
      return;
    }
    setSelectedDayList((selectedDayList) =>
      selectedDayList.map((selectedDay, selectedDayIndex) => {
        if (selectedDayIndex === selectedDaysIndex) return [...selectedDay, day];
        return selectedDay;
      })
    );
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
                    <S.DropDown defaultValue="-1">
                      <option value="-1" disabled hidden>
                        시/도 선택
                      </option>
                      <option value="0">서울특별시</option>
                      <option value="1">경기도</option>
                    </S.DropDown>
                    <S.DropDown defaultValue="-1">
                      <option value="-1" disabled hidden>
                        구 선택
                      </option>
                      <option value="0">양천구</option>
                      <option value="1">강서구</option>
                    </S.DropDown>
                    <S.DropDown defaultValue="-1">
                      <option value="-1" disabled hidden>
                        동 선택
                      </option>
                      <option value="0">목1동</option>
                      <option value="1">목2동</option>
                    </S.DropDown>
                  </td>
                </tr>
                <tr>
                  <th>돌봄 시간</th>
                  <td style={{ padding: 0 }}>
                    {selectedDayList.map((selectedDays, selectedDaysIndex) => {
                      return (
                        <S.TimeSelectContainer
                          isLast={selectedDayList.length - 1 === selectedDaysIndex}
                          key={`timeselectcontainer-${selectedDaysIndex}`}
                        >
                          <S.TdFlexBox>
                            {dayList.map((day) => {
                              return (
                                <S.ToggleButton
                                  isSelected={selectedDays.includes(day)}
                                  className="square"
                                  onClick={() => toggleDays(selectedDays, selectedDaysIndex, day)}
                                  key={`dayListItem-${day}`}
                                >
                                  {day}
                                </S.ToggleButton>
                              );
                            })}
                          </S.TdFlexBox>
                          <S.TdFlexBox>
                            <S.ClockSelect>
                              00:00
                              <TimeInput />
                            </S.ClockSelect>
                            부터
                            <S.ClockSelect>
                              00:00
                              <TimeInput />
                            </S.ClockSelect>
                            까지
                          </S.TdFlexBox>
                          {selectedDayList.length - 1 === selectedDaysIndex ? (
                            <S.AddButton
                              onClick={() => {
                                setSelectedDayList([...selectedDayList, [] as string[]]);
                              }}
                            >
                              <PlusIconSVG />
                            </S.AddButton>
                          ) : (
                            <S.AddButton
                              onClick={() => {
                                setSelectedDayList((selectedDayList) =>
                                  selectedDayList.filter((item, i) => i !== selectedDaysIndex)
                                );
                              }}
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
                  <tr>
                    <td className="available">
                      석션
                      <S.CheckBox type="checkbox" id="checkbox1" />
                    </td>
                    <td className="available">
                      피딩
                      <S.CheckBox type="checkbox" />
                    </td>
                    <td className="available">
                      휠체어
                      <S.CheckBox type="checkbox" />
                    </td>
                    <td className="available">
                      기저귀
                      <S.CheckBox type="checkbox" />
                    </td>
                    <td className="available right">
                      재활
                      <S.CheckBox type="checkbox" />
                    </td>
                  </tr>
                  <tr>
                    <td className="available">
                      가사
                      <S.CheckBox type="checkbox" />
                    </td>
                    <td className="available">
                      남성
                      <S.CheckBox type="checkbox" />
                    </td>
                    <td className="available">
                      치매
                      <S.CheckBox type="checkbox" />
                    </td>
                    <td className="available">
                      입주
                      <S.CheckBox type="checkbox" />
                    </td>
                    <td className="available right">
                      간호조무사
                      <S.CheckBox type="checkbox" />
                    </td>
                  </tr>
                </tr>
              </tbody>
            </S.FilterTable>
            <S.ResetButtonContainer>
              <S.ResetButton>초기화</S.ResetButton>
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
                    <S.ProfileImage src="https://static.scientificamerican.com/sciam/cache/file/92E141F8-36E4-4331-BB2EE42AC8674DD3_source.jpg" />
                    <S.InfoContainer>
                      <S.BasicInfo>야옹이 (03/여)</S.BasicInfo>
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
              <S.Card></S.Card>
              <S.Card></S.Card>
              <S.Card></S.Card>
            </S.CardList>
          </S.InnerContent>
        </S.Section>
      </S.CgList>
    </>
  );
}
