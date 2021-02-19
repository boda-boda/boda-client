import React, { useState } from 'react';
import CareInfoIconSVG from '../../svgs/care-info-icon-svg';
import PersonalityInfoIconSVG from '../../svgs/personality-info-icon-svg';
import PhoneNumberIconSVG from '../../svgs/phone-number-icon-svg';
import TimeInput from '../../svgs/time-input-svg';
import PlusIconSVG from '../../svgs/plus-icon-svg';
import * as S from './styles';
import MinusIconSVG from '../../svgs/minus-icon-svg';
import Link from 'next/link';

interface CareGiverListProps {
  isMyCaregiver: boolean;
}

const dayList = ['월', '화', '수', '목', '금', '토', '일'];
const careInfoList = [
  '석션',
  '휠체어',
  '기저귀',
  '목욕',
  '재활',
  '청소',
  '음식',
  '남성 수급자',
  '치매교육 이수',
];
const personalityInfoList = ['조용함', '활발함', '긍정적임', '섬세함', '성실함'];

const careInfo = ['석션', '휠체어', '기저귀', '목욕', '재활']; //얘네는 임시
const personalityInfo = ['활발함', '긍정적임', '섬세함']; //얘네는 임시

export default function CareGiverList({ isMyCaregiver }: CareGiverListProps) {
  const [selectedDayList, setSelectedDayList] = useState([[]] as string[][]);
  const [selectedCareInfo, setSelectedCareInfo] = useState([] as string[]);
  const [selectedPersonalityInfo, setSelectedPersonalityInfo] = useState([] as string[]);
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
                        <>
                          <S.TimeSelectContainer
                            isLast={selectedDayList.length - 1 === selectedDaysIndex}
                          >
                            <S.TdFlexBox>
                              {dayList.map((day) => {
                                return (
                                  <S.ToggleButton
                                    isSelected={selectedDays.indexOf(day) !== -1}
                                    className="square"
                                    onClick={() => {
                                      if (selectedDays.indexOf(day) === -1) {
                                        setSelectedDayList((selectedDayList) =>
                                          selectedDayList.map((selectedDay, selectedDayIndex) => {
                                            if (selectedDayIndex === selectedDaysIndex)
                                              return [...selectedDay, day];
                                            return selectedDay;
                                          })
                                        );
                                      } else {
                                        setSelectedDayList((selectedDayList) =>
                                          selectedDayList.map((selectedDay, selectedDayIndex) => {
                                            if (selectedDayIndex === selectedDaysIndex)
                                              return selectedDay.filter(
                                                (selected) => selected !== day
                                              );
                                            return selectedDay;
                                          })
                                        );
                                      }
                                    }}
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
                        </>
                      );
                    })}
                  </td>
                </tr>
                <tr>
                  <th>요양 정보</th>
                  <td>
                    <S.TdFlexBox>
                      {careInfoList.map((careInfo, index) => {
                        return (
                          <S.ToggleButton
                            isSelected={selectedCareInfo.indexOf(careInfo) !== -1}
                            onClick={() => {
                              if (selectedCareInfo.indexOf(careInfo) === -1) {
                                setSelectedCareInfo([...selectedCareInfo, careInfo]);
                              } else {
                                setSelectedCareInfo((selectedCareInfo) =>
                                  selectedCareInfo.filter((careInfo) => careInfo !== careInfo)
                                );
                              }
                            }}
                            key={`careInfoListItem-${index}`}
                          >
                            {careInfo}
                          </S.ToggleButton>
                        );
                      })}
                    </S.TdFlexBox>
                  </td>
                </tr>
                <tr>
                  <th>성격 정보</th>
                  <td>
                    <S.TdFlexBox>
                      {personalityInfoList.map((personalityInfo, index) => {
                        return (
                          <S.ToggleButton
                            isSelected={selectedPersonalityInfo.indexOf(personalityInfo) !== -1}
                            onClick={() => {
                              if (selectedPersonalityInfo.indexOf(personalityInfo) === -1) {
                                setSelectedPersonalityInfo([
                                  ...selectedPersonalityInfo,
                                  personalityInfo,
                                ]);
                              } else {
                                setSelectedPersonalityInfo((selectedPersonalityInfo) =>
                                  selectedPersonalityInfo.filter(
                                    (personalityInfo) => personalityInfo !== personalityInfo
                                  )
                                );
                              }
                            }}
                            key={`personalityInfoListItem-${index}`}
                          >
                            {personalityInfo}
                          </S.ToggleButton>
                        );
                      })}
                    </S.TdFlexBox>
                  </td>
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
                            <th>요양 정보</th>
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
                          <tr>
                            <td>
                              <S.SVGIconBox>
                                <PersonalityInfoIconSVG />
                              </S.SVGIconBox>
                            </td>
                            <th>성격 정보</th>
                            <td>
                              <S.InfoItemList>
                                {personalityInfo.map((personalityInfo, index) => {
                                  return (
                                    <S.InfoItem key={`personalityInfoItem-${index}`}>
                                      {personalityInfo}
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
