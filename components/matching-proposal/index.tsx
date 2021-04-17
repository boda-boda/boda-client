import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import { CARE_INFO_LIST, RELIGION_LIST, WORKER_MAN_SMALL_IMAGE_URL } from '../../constant';
import ImageDefaultSVG from '../../svgs/image-default-svg';
import axios from 'axios';
import CenterUpdateRequest from '../../views/my-center-edit-view/model/center-update-request';
import { useCareCenter } from '../../context/care-center';
import { validateCareCenter } from '../../common/lib/validate';

interface MatchingProposalProps {
  isFilled: boolean;
}

const dayList = ['월', '화', '수', '목', '금', '토', '일'];

export default function MatchingProposal({ isFilled }: MatchingProposalProps) {
  const [isWoman, setIsWoman] = useState(true);
  const [selectedDayList, setSelectedDayList] = useState([[]] as string[][]);
  const [selectedCareInfo, setSelectedCareInfo] = useState([] as string[]);
  const [selectedPersonalityInfo, setSelectedPersonalityInfo] = useState([] as string[]);

  const careCenter = useCareCenter();

  const [memo, setMemo] = useState('');
  const memoRef = useRef<HTMLTextAreaElement>(null);

  const [centerUpdateRequest, setCenterUpdateRequest] = useState(
    new CenterUpdateRequest(careCenter.careCenter)
  );

  const handleInputChange = useCallback(
    (key: keyof CenterUpdateRequest) => (e: any) => {
      setCenterUpdateRequest({
        ...centerUpdateRequest,
        [key]: e.target.value,
      });
    },
    [centerUpdateRequest]
  );

  const handleDeleteCurrentAddress = async () => {
    if (!window.confirm('현재 입력된 주소를 삭제하시겠습니까?')) return;

    setCenterUpdateRequest({
      ...centerUpdateRequest,
      zipCode: '',
      address: '',
      detailAddress: '',
    });
  };

  useEffect(() => {
    if (!careCenter.careCenter) return;

    setCenterUpdateRequest(new CenterUpdateRequest(careCenter.careCenter));
  }, [careCenter]);

  useEffect(() => {
    if (!memoRef.current) return;
    memoRef.current!.style.height = 'auto';
    memoRef.current!.style.height = (memoRef.current!.scrollHeight + 10).toString() + 'px';
  }, [memo]);

  const openAddressModal = () => {
    if (!window.daum) {
      alert('주소 검색 서비스 연결이 원활하지 않습니다.');
      return;
    }
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        setCenterUpdateRequest({
          ...centerUpdateRequest,
          zipCode: data.zonecode,
          address: data.roadAddress,
        });
      },
    }).open();
  };

  const onChangeImage = async (e: any) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      const axiosInstance = axios.create({
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const response = await axiosInstance.post('/care-worker/profile', formData);
      setCenterUpdateRequest({
        ...centerUpdateRequest,
        profile: response.data.Location,
      });
    } catch {
      alert('이미지 업로드에 실패하였습니다. 잠시후 다시 시도해주세요.');
    }
  };

  const handleUpdateCareCenterInfo = async () => {
    if (!window.confirm('기본 센터 정보로 저장 하시겠습니까?')) return;
    if (!validateCareCenter(centerUpdateRequest)) return;

    try {
      await axios.put('/care-center/', centerUpdateRequest);
      alert('수정이 완료되었습니다.');
      window.location.replace('');
    } catch (e) {
      alert('사용자 정보 업데이트에 실패했습니다.');
    }
  };

  return (
    <>
      <S.MatchingProposalContent>
        <S.InnerContent>
          <S.Section>
            <S.SectionTitleContainer>
              <S.SectionTitle>기본 정보</S.SectionTitle>
              <S.CenterInfoUpdateButton onClick={handleUpdateCareCenterInfo}>
                기본 센터 정보로 저장하기
              </S.CenterInfoUpdateButton>
            </S.SectionTitleContainer>
            <S.InfoTable>
              <tbody>
                <tr>
                  <td rowSpan={5} className="profile">
                    <S.ProfileImageContainer>
                      <label htmlFor="profile">
                        <S.ProfileImage src={centerUpdateRequest.profile}>
                          <S.ImageIconContainer isHover={centerUpdateRequest.profile !== ''}>
                            <ImageDefaultSVG />
                          </S.ImageIconContainer>
                        </S.ProfileImage>
                      </label>
                      <input
                        id="profile"
                        type="file"
                        accept="image/*"
                        multiple={false}
                        style={{ display: 'none' }}
                        onChange={onChangeImage}
                      />
                    </S.ProfileImageContainer>
                  </td>
                  <th className="">이름</th>
                  <td className="infovalue">
                    <S.TextInput
                      value={centerUpdateRequest.username}
                      onChange={handleInputChange('username')}
                      type="text"
                      placeholder="센터의 이름을 입력해주세요"
                    />
                  </td>
                  <th>전화</th>
                  <td className="infovalue">
                    <S.TextInput
                      value={centerUpdateRequest.phoneNumber}
                      onChange={handleInputChange('phoneNumber')}
                      type="text"
                      placeholder="전화번호를 입력해주세요"
                    />
                  </td>
                </tr>
                <tr>
                  <th>이메일</th>
                  <td className="infovalue">
                    <S.TextInput
                      value={centerUpdateRequest.email}
                      onChange={handleInputChange('email')}
                      type="text"
                      placeholder="이메일 주소를 입력해주세요"
                    />
                  </td>
                  <th>홈페이지</th>
                  <td className="infovalue">
                    <S.TextInput
                      value={centerUpdateRequest.homePage}
                      onChange={handleInputChange('homePage')}
                      type="text"
                      placeholder="홈페이지 주소를 입력해주세요"
                    />
                  </td>
                </tr>
                <tr>
                  <th rowSpan={2}>주소</th>
                  <td colSpan={3}>
                    <S.TextInput
                      type="text"
                      value={centerUpdateRequest.zipCode}
                      readOnly
                      onClick={openAddressModal}
                      withButton
                    />
                    <S.AddressButton onClick={openAddressModal}>주소 검색</S.AddressButton>
                    <S.AddressDeleteButton onClick={handleDeleteCurrentAddress}>
                      주소 초기화
                    </S.AddressDeleteButton>
                  </td>
                </tr>
                <tr>
                  <td>
                    <S.TextInput
                      type="text"
                      value={centerUpdateRequest.address}
                      long
                      readOnly
                      disabled
                    />
                  </td>
                  <td colSpan={2}>
                    <S.TextInput
                      type="text"
                      value={centerUpdateRequest.detailAddress}
                      readOnly={centerUpdateRequest.address === ''}
                      long
                      placeholder="상세주소 입력"
                      onChange={handleInputChange('detailAddress')}
                    />
                  </td>
                </tr>
                <tr>
                  <th>센터 소개</th>
                  <td colSpan={3}>
                    <S.TextArea
                      ref={memoRef}
                      value={centerUpdateRequest.description}
                      onChange={(e) => {
                        handleInputChange('description')(e), setMemo(e.target.value);
                      }}
                      placeholder="센터의 소개글을 작성해주세요"
                    />
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
                      <S.ProfileImage src="https://i.pinimg.com/originals/e1/83/18/e183187a03eee04333591dfcbe467f7f.png" />
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
                  <th>나이</th>
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
                                12:00
                                <TimeInput />
                              </S.ClockSelect>
                              부터
                              <S.ClockSelect className="clock-right">
                                15:00
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
                  <th>주소</th>
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
                      <option value="2">서대문구</option>
                    </S.DropDown>
                    <S.DropDown Size={ButtonSize.SHORT} defaultValue="-1">
                      <option value="-1" disabled hidden>
                        동 선택
                      </option>
                      <option value="0">목1동</option>
                      <option value="1">목2동</option>
                      <option value="2">홍은동</option>
                      <option value="3">홍제동</option>
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
                      {CARE_INFO_LIST.map((careInfo, index) => {
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
                  <th>종교</th>
                  <td colSpan={3} className="wide">
                    <S.TdFlexBox>
                      {RELIGION_LIST.map((religion, index) => {
                        return (
                          <S.ToggleButton
                            isSelected={selectedPersonalityInfo.indexOf(religion) !== -1}
                            onClick={() => {
                              if (selectedPersonalityInfo.indexOf(religion) === -1) {
                                setSelectedPersonalityInfo([...selectedPersonalityInfo, religion]);
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
                            {religion}
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
