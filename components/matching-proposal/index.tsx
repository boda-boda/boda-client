import React, { useState } from 'react';
import { BannerStyleType, ButtonSize, ButtonType } from '../../common/types';
import MinusIconSVG from '../../svgs/minus-icon-svg';
import PlusIconSVG from '../../svgs/plus-icon-svg';
import Banner from '../banner';
import Category from '../category';
import TimeInput from '../../svgs/time-input-svg';
import DefaultButtonContainter from '../default-button';
import { DefaultButton } from '../default-button/styles';
import Footer from '../footer';
import Header from '../header';
import * as S from './styles';

interface MatchingProposalProps {
  isFilled: boolean;
}

const gender = ['여자', '남자'];
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

export default function MatchingProposal({ isFilled }: MatchingProposalProps) {
  const [isWoman, setIsWoman] = useState(true);
  const [selectedDayList, setSelectedDayList] = useState([[]] as string[][]);
  const [selectedCareInfo, setSelectedCareInfo] = useState([] as string[]);
  const [selectedPersonalityInfo, setSelectedPersonalityInfo] = useState([] as string[]);
  return (
    <>
      <S.MatchingProposalContent>
        <S.InnerContent>
          <S.Section>
            <S.SectionTitleContainer>
              <S.SectionTitle>기본 정보</S.SectionTitle>
              <DefaultButtonContainter
                content="기본 센터 정보로 저장하기"
                type={ButtonType.LOAD}
                width="178px"
                height="36px"
                active={false}
              ></DefaultButtonContainter>
            </S.SectionTitleContainer>
            <S.InfoTable>
              <tbody>
                <tr>
                  <td rowSpan={3} className="profile">
                    <S.ProfileImageContainer>
                      <S.ProfileImage src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-cat-wearing-sunglasses-while-sitting-royalty-free-image-1571755145.jpg" />
                    </S.ProfileImageContainer>
                  </td>
                  <th>이름</th>
                  <td className="left">
                    <S.InfoInput></S.InfoInput>
                  </td>
                  <th>위치</th>
                  <td className="right">
                    <S.InfoInput></S.InfoInput>
                  </td>
                </tr>
                <tr>
                  <th>전화</th>
                  <td className="left">
                    <S.InfoInput></S.InfoInput>
                  </td>
                  <th>홈페이지</th>
                  <td className="right">
                    <S.InfoInput></S.InfoInput>
                  </td>
                </tr>
                <tr>
                  <th>팩스</th>
                  <td className="left">
                    <S.InfoInput></S.InfoInput>
                  </td>
                  <th>이메일</th>
                  <td className="right">
                    <S.InfoInput></S.InfoInput>
                  </td>
                </tr>
              </tbody>
            </S.InfoTable>
          </S.Section>
          <S.Section>
            <S.SectionTitleContainer>
              <S.SectionTitle>수급자 정보</S.SectionTitle>
              <DefaultButtonContainter
                content="불러오기"
                type={ButtonType.LOAD}
                width="100px"
                height="36px"
                active={false}
              ></DefaultButtonContainter>
            </S.SectionTitleContainer>
            <S.InfoTable>
              <tbody>
                <tr>
                  <td rowSpan={8} className="recipientProfile">
                    <S.ProfileImageContainer>
                      <S.ProfileImage src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-cat-wearing-sunglasses-while-sitting-royalty-free-image-1571755145.jpg" />
                    </S.ProfileImageContainer>
                  </td>
                  <th>이름</th>
                  <td className="left">
                    <S.InfoInput></S.InfoInput>
                  </td>
                  <th>성별</th>
                  <td className="select right">
                    <S.TdFlexBox>
                      <S.ToggleButton
                        isSelected={isWoman}
                        onClick={() => {
                          setIsWoman(true);
                        }}
                        key={`GenderItem-woman`}
                      >
                        여자
                      </S.ToggleButton>
                      <S.ToggleButton
                        isSelected={!isWoman}
                        onClick={() => {
                          setIsWoman(false);
                        }}
                        key={`GenderItem-man`}
                      >
                        남자
                      </S.ToggleButton>
                    </S.TdFlexBox>
                  </td>
                </tr>
                <tr>
                  <th>등급</th>
                  <td className="select left">
                    <S.DropDown Size={ButtonSize.LONG} defaultValue="-1">
                      <option value="-1" disabled hidden>
                        등급 선택
                      </option>
                      <option value="1">1등급</option>
                      <option value="2">2등급</option>
                      <option value="3">3등급</option>
                      <option value="4">4등급</option>
                      <option value="5">5등급</option>
                    </S.DropDown>
                  </td>
                  <th>생년월일</th>
                  <td className="right">
                    <S.InfoInput></S.InfoInput>
                  </td>
                </tr>
                <tr>
                  <th>돌봄 시간</th>
                  <td style={{ padding: 0 }} colSpan={3} className="wide">
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
                                    className="square"
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
                              <S.ClockSelect className="clock-right">
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
                  <th>위치</th>
                  <td colSpan={3} className="select wide">
                    <S.DropDown Size={ButtonSize.SHORT} defaultValue="-1">
                      <option value="-1" disabled hidden>
                        시/도 선택
                      </option>
                      <option value="0">서울특별시</option>
                      <option value="1">경기도</option>
                    </S.DropDown>
                    <S.DropDown Size={ButtonSize.SHORT} defaultValue="-1">
                      <option value="-1" disabled hidden>
                        구 선택
                      </option>
                      <option value="0">양천구</option>
                      <option value="1">강서구</option>
                    </S.DropDown>
                    <S.DropDown Size={ButtonSize.SHORT} defaultValue="-1">
                      <option value="-1" disabled hidden>
                        동 선택
                      </option>
                      <option value="0">목1동</option>
                      <option value="1">목2동</option>
                    </S.DropDown>
                    <S.InfoInput Size={ButtonSize.LONG} placeholder="세부 주소"></S.InfoInput>
                  </td>
                </tr>
                <tr>
                  <th>거주 형태</th>
                  <td colSpan={3} className="select wide">
                    <S.InfoInput></S.InfoInput>
                  </td>
                </tr>
                <tr>
                  <th>요구 사항</th>
                  <td colSpan={3} className="wide overtd">
                    <S.TdFlexBox>
                      {careInfoList.map((careInfo, index) => {
                        return (
                          <S.ToggleButton
                            className="overitems"
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
                  <th>요구 성격</th>
                  <td colSpan={3} className="wide">
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
                <tr>
                  <th>세부 사항</th>
                  <td colSpan={3} className="select wide">
                    <S.InfoInputDetail></S.InfoInputDetail>
                  </td>
                </tr>
              </tbody>
            </S.InfoTable>
          </S.Section>
          <S.Section>
            <S.SectionTitleContainer>
              <S.SectionTitle>기타</S.SectionTitle>
            </S.SectionTitleContainer>
            <S.InfoTable>
              <tbody>
                <tr>
                  <th>시급</th>
                  <td>
                    <S.InfoInput className="money"></S.InfoInput>원
                  </td>
                </tr>
                <tr>
                  <th>비고</th>
                  <td>
                    <S.InfoInputDetail Size={ButtonSize.LONG}></S.InfoInputDetail>
                  </td>
                </tr>
              </tbody>
            </S.InfoTable>
          </S.Section>
          <S.CompleteSection>
            <DefaultButtonContainter
              content="매칭 제안서 보내기"
              type={ButtonType.COMPLETE}
              width="306px"
              height="48px"
              active={true}
            ></DefaultButtonContainter>
          </S.CompleteSection>
        </S.InnerContent>
      </S.MatchingProposalContent>
    </>
  );
}
