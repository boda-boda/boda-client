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
  isMine: boolean;
}

export default function CareGiverList({ isMine }: CareGiverListProps) {
  const dayList = ['월', '화', '수', '목', '금', '토', '일'];
  const [selectedDayList, setSelectedDayList] = useState([
    [false, false, false, false, false, false, false],
  ]);
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
  const [selectedCareInfo, setSelectedCareInfo] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const personalityInfoList = ['조용함', '활발함', '긍정적임', '섬세함', '성실함'];
  const [selectedPersonalityInfo, setSelectedPersonalityInfo] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const careInfo = ['석션', '휠체어', '기저귀', '목욕', '재활'];
  const personalityInfo = ['활발함', '긍정적임', '섬세함'];
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
                    {selectedDayList.map((list, index) => {
                      return (
                        <>
                          <S.TimeSelectContainer isLast={selectedDayList.length - 1 === index}>
                            <S.TdFlexBox>
                              {dayList.map((item, day) => {
                                return (
                                  <S.ToggleButton
                                    isSelected={selectedDayList[index][day]}
                                    onClick={() => {
                                      setSelectedDayList((selectedDayList) =>
                                        selectedDayList.map((list, listIndex) => {
                                          if (index !== listIndex) return list;
                                          return list.map((item, i) => {
                                            if (day === i) return !item;
                                            return item;
                                          });
                                        })
                                      );
                                    }}
                                    key={`dayListItem-${day}`}
                                    style={{ width: '36px', padding: 0 }}
                                  >
                                    {item}
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
                            {selectedDayList.length - 1 === index ? (
                              <S.AddButton
                                onClick={() => {
                                  setSelectedDayList([
                                    ...selectedDayList,
                                    [false, false, false, false, false, false, false],
                                  ]);
                                }}
                              >
                                <PlusIconSVG />
                              </S.AddButton>
                            ) : (
                              <S.AddButton
                                onClick={() => {
                                  setSelectedDayList((list) =>
                                    list.filter((item, i) => i !== index)
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
                      {careInfoList.map((item, index) => {
                        return (
                          <S.ToggleButton
                            isSelected={selectedCareInfo[index]}
                            onClick={() => {
                              setSelectedCareInfo((selectedCareInfo) =>
                                selectedCareInfo.map((item, i) => {
                                  if (index === i) return !item;
                                  return item;
                                })
                              );
                            }}
                            key={`careInfoListItem-${index}`}
                          >
                            {item}
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
                      {personalityInfoList.map((item, index) => {
                        return (
                          <S.ToggleButton
                            isSelected={selectedPersonalityInfo[index]}
                            onClick={() => {
                              setSelectedPersonalityInfo((selectedPersonalityInfo) =>
                                selectedPersonalityInfo.map((item, i) => {
                                  if (index === i) return !item;
                                  return item;
                                })
                              );
                            }}
                            key={`personalityInfoListItem-${index}`}
                          >
                            {item}
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
                                {careInfo.map((item, index) => {
                                  return (
                                    <S.InfoItem key={`careInfoItem-${index}`}>{item}</S.InfoItem>
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
                                {personalityInfo.map((item, index) => {
                                  return (
                                    <S.InfoItem key={`personalityInfoItem-${index}`}>
                                      {item}
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
