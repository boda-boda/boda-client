import React, { ReactChild, useState } from 'react';
import { BannerStyleType } from '../../common/types';
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

export default function MatchingProposal({ isFilled }: MatchingProposalProps) {
  const gender = ['여자', '남자'];
  const [selectedGender, setSelectedGender] = useState([false, false]);
  const dayList = ['월', '화', '수', '목', '금', '토', '일'];
  const [selectedDayList, setSelectedDayList] = useState([
    [false, false, false, false, false, false, false],
  ]);
  return (
    <>
      <S.MatchingProposalContent>
        <S.InnerContent>
          <S.Section>
            <S.SectionTitleContainer>
              <S.SectionTitle>기본 정보</S.SectionTitle>
              <DefaultButtonContainter
                content="기본 센터로 저장하기"
                type="Load"
                width="152px"
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
                  <td>김요양</td>
                  <th>위치</th>
                  <td>서대문구 통일로 123</td>
                </tr>
                <tr>
                  <th>전화</th>
                  <td>02-000-0000</td>
                  <th>홈페이지</th>
                  <td>www.bodaisthebest.com</td>
                </tr>
                <tr>
                  <th>팩스</th>
                  <td>02-000-0000</td>
                  <th>이메일</th>
                  <td>bodacenter@boda.kr</td>
                </tr>
              </tbody>
            </S.InfoTable>
          </S.Section>
          <S.Section>
            <S.SectionTitleContainer>
              <S.SectionTitle>기본 정보</S.SectionTitle>
              <DefaultButtonContainter
                content="불러오기"
                type="Load"
                width="100px"
                height="36px"
                active={false}
              ></DefaultButtonContainter>
            </S.SectionTitleContainer>
            <S.InfoTable>
              <tbody>
                <tr>
                  <td rowSpan={8} className="profile">
                    <S.ProfileImageContainer>
                      <S.ProfileImage src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-cat-wearing-sunglasses-while-sitting-royalty-free-image-1571755145.jpg" />
                    </S.ProfileImageContainer>
                  </td>
                  <th>이름</th>
                  <td className="input">
                    <S.InfoInput></S.InfoInput>
                  </td>
                  <th>성별</th>
                  <td className="select">
                    <S.TdFlexBox>
                      {gender.map((item, index) => {
                        return (
                          <S.ToggleButton
                            isSelected={selectedGender[index]}
                            onClick={() => {
                              setSelectedGender((selectedGender) =>
                                selectedGender.map((item, i) => {
                                  if (index === i) return !item;
                                  else return false;
                                })
                              );
                            }}
                            key={`GenderItem-${index}`}
                          >
                            {item}
                          </S.ToggleButton>
                        );
                      })}
                    </S.TdFlexBox>
                  </td>
                </tr>
                <tr>
                  <th>등급</th>
                  <td className="select">
                    <S.DropDown size="LONG" defaultValue="-1">
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
                  <th>나이</th>
                  <td className="input">
                    <S.InfoInput></S.InfoInput>
                  </td>
                </tr>
                <tr>
                  <th>돌봄 시간</th>
                  <td style={{ padding: 0 }} colSpan={3}>
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
                  <th>위치</th>
                  <td colSpan={3} className="select">
                    <S.DropDown size="SHORT" defaultValue="-1">
                      <option value="-1" disabled hidden>
                        시/도 선택
                      </option>
                      <option value="0">서울특별시</option>
                      <option value="1">경기도</option>
                    </S.DropDown>
                    <S.DropDown size="SHORT" defaultValue="-1">
                      <option value="-1" disabled hidden>
                        구 선택
                      </option>
                      <option value="0">양천구</option>
                      <option value="1">강서구</option>
                    </S.DropDown>
                    <S.DropDown size="SHORT" defaultValue="-1">
                      <option value="-1" disabled hidden>
                        동 선택
                      </option>
                      <option value="0">목1동</option>
                      <option value="1">목2동</option>
                    </S.DropDown>
                    <S.InfoInput size="LONG" placeholder="세부 주소"></S.InfoInput>
                  </td>
                </tr>
                <tr>
                  <th>거주 형태</th>
                  <td colSpan={3} className="select">
                    <S.InfoInput></S.InfoInput>
                  </td>
                </tr>
                <tr>
                  <th>요구 사항</th>
                  <td colSpan={3} className="select">
                    <S.InfoInput></S.InfoInput>
                  </td>
                </tr>
                <tr>
                  <th>요구 성격</th>
                  <td colSpan={3} className="select">
                    <S.InfoInput></S.InfoInput>
                  </td>
                </tr>
                <tr>
                  <th>세부 사항</th>
                  <td colSpan={3} className="select">
                    <S.InfoInput></S.InfoInput>
                  </td>
                </tr>
              </tbody>
            </S.InfoTable>
          </S.Section>
        </S.InnerContent>
      </S.MatchingProposalContent>
    </>
  );
}
