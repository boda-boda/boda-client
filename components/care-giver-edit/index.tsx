import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import MinusIconSVG from '../../svgs/minus-icon-svg';
import PlusIconSVG from '../../svgs/plus-icon-svg';
import TimeInput from '../../svgs/time-input-svg';
import * as S from './styles';
import { dayList } from '../../constant';
import ImageDefaultSVG from '../../svgs/image-default-svg';

interface CareGiverEditProps {
  isNew: boolean;
}

export default function CareGiveEdit({ isNew }: CareGiverEditProps) {
  const [address, setAddress] = useState('');
  const [memo, setMemo] = useState('');
  const [careers, setCareers] = useState([['', '', '']]);
  const [profileImage, setProfileImage] = useState((null as unknown) as string);
  const memoRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (!memoRef.current) return;
    memoRef.current!.style.height = 'auto';
    memoRef.current!.style.height = (memoRef.current!.scrollHeight + 10).toString() + 'px';
  }, [memo]);
  const [selectedDayList, setSelectedDayList] = useState([[]] as string[][]);
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
  const openAddressModal = () => {
    if (!window.daum) {
      alert('주소 검색 서비스 연결이 원활하지 않습니다.');
      return;
    }
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        let fullAddress = data.address;
        setAddress(fullAddress);
      },
    }).open();
  };
  return (
    <>
      <S.CareGiverEdit>
        <S.InnerContent>
          <S.Section>
            <S.SectionTitle>기본 정보</S.SectionTitle>
            <S.Table>
              <tbody>
                <tr>
                  <td rowSpan={3} className="profile">
                    <S.ProfileImageContainer>
                      <S.ProfileImage src={profileImage}>
                        <S.ImageIconContainer isHover={profileImage !== null}>
                          <ImageDefaultSVG />
                        </S.ImageIconContainer>
                      </S.ProfileImage>
                    </S.ProfileImageContainer>
                  </td>
                  <th>이름</th>
                  <td className="infovalue">
                    <S.TextInput type="text" />
                  </td>
                  <th>나이</th>
                  <td className="infovalue">
                    <S.TextInput type="text" />
                  </td>
                </tr>
                <tr>
                  <th>성별</th>
                  <td className="infovalue">
                    <S.TextInput type="text" />
                  </td>
                  <th>연락처</th>
                  <td className="infovalue">
                    <S.TextInput type="text" />
                  </td>
                </tr>
                <tr>
                  <th>지역</th>
                  <td colSpan={3}>
                    <S.TextInput
                      type="text"
                      value={address}
                      readOnly
                      withButton
                      onClick={openAddressModal}
                    />
                    <S.AddressButton onClick={openAddressModal}>주소 검색</S.AddressButton>
                  </td>
                </tr>
              </tbody>
            </S.Table>
          </S.Section>
          <S.Section>
            <S.SectionTitle>메모</S.SectionTitle>
            <S.Table>
              <tbody>
                <tr>
                  <td className="memo">
                    <S.TextArea
                      ref={memoRef}
                      value={memo}
                      onChange={(e) => {
                        setMemo(e.target.value);
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </S.Table>
          </S.Section>
          <S.Section>
            <S.SectionTitle>가능 조건</S.SectionTitle>
            <S.Table>
              <tbody>
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
              </tbody>
            </S.Table>
          </S.Section>
          <S.Section>
            <S.SectionTitle>돌봄 스케줄</S.SectionTitle>
            <S.Table>
              <tr>
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
            </S.Table>
          </S.Section>
          <S.Section>
            <S.SectionTitle>경력</S.SectionTitle>
            <S.Table>
              <tbody>
                <tr>
                  <th className="career long">근무지</th>
                  <th className="career">수급자</th>
                  <th className="career">기간</th>
                  <th className="career right"></th>
                </tr>
                {careers.map((career, careerIndex) => {
                  return (
                    <tr key={`career-row-${careerIndex}`}>
                      <td className="career long">
                        <S.TextInput
                          type="text"
                          value={career[0]}
                          onChange={(e) => {
                            setCareers((careers) =>
                              careers.map((c, i) => {
                                if (i !== careerIndex) return c;
                                return [e.target.value, c[1], c[2]];
                              })
                            );
                          }}
                          long
                        />
                      </td>
                      <td className="career">
                        <S.TextInput
                          type="text"
                          value={career[1]}
                          onChange={(e) => {
                            setCareers((careers) =>
                              careers.map((c, i) => {
                                if (i !== careerIndex) return c;
                                return [c[0], e.target.value, c[2]];
                              })
                            );
                          }}
                          long
                        />
                      </td>
                      <td className="career">
                        <S.TextInput
                          type="text"
                          value={career[2]}
                          onChange={(e) => {
                            setCareers((careers) =>
                              careers.map((c, i) => {
                                if (i !== careerIndex) return c;
                                return [c[0], c[1], e.target.value];
                              })
                            );
                          }}
                          long
                        />
                      </td>
                      <td className="career right">
                        {careers.length - 1 === careerIndex ? (
                          <S.AddButton
                            onClick={() => {
                              setCareers([...careers, ['', '', '']]);
                            }}
                          >
                            <PlusIconSVG />
                          </S.AddButton>
                        ) : (
                          <S.AddButton
                            onClick={() => {
                              setCareers((careers) =>
                                careers.filter((_item, i) => i !== careerIndex)
                              );
                            }}
                          >
                            <MinusIconSVG />
                          </S.AddButton>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </S.Table>
          </S.Section>
          <S.FinishButtonContainer>
            {isNew ? (
              <S.FinishButton>작성 완료</S.FinishButton>
            ) : (
              <S.FinishButton>수정 완료</S.FinishButton>
            )}
          </S.FinishButtonContainer>
        </S.InnerContent>
      </S.CareGiverEdit>
    </>
  );
}
