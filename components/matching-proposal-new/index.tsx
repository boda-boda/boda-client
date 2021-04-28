import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ButtonSize, ButtonType } from '../../common/types';
import MinusIconSVG from '../../svgs/minus-icon-svg';
import PlusIconSVG from '../../svgs/plus-icon-svg';
import DefaultButtonContainter from '../default-button';
import * as S from './styles';
import {
  CAPABILITY,
  CARE_INFO_LIST,
  DAY_LIST,
  FAMILY_TYPE,
  NURSING_GRADE,
  RELIGION_LIST,
  WORKER_MAN_SMALL_IMAGE_URL,
} from '../../constant';
import ImageDefaultSVG from '../../svgs/image-default-svg';
import axios from 'axios';
import CenterUpdateRequest from '../../views/my-center-edit-view/model/center-update-request';
import { useCareCenter } from '../../context/care-center';
import { validateCareCenter } from '../../common/lib/validate';
import {
  CareWorkerSchedule,
  toggleDayOfCareWorkerSchedule,
} from '../../model/care-worker-schedule';
import { DayType } from '../../common/types/date';
import CloseIconSVG from '../../svgs/close-icon-svg';
import Recipient from '../../model/recipient';
import Link from 'next/link';
import PhoneNumberIconSVG from '../../svgs/phone-number-icon-svg';
import CareInfoIconSVG from '../../svgs/care-info-icon-svg';

interface MatchingProposalProps {
  isFilled: boolean;
}

const recipients = [
  {
    zipCode: '08018',
    address: '서울시 양천구 신정7동',
    detailAddress: '목동남로4길 81',
    age: 20,
    birthDay: '2000-08-21',

    recipientMetas: [{ type: CAPABILITY, key: '휠체어', value: '' }],

    description: '설명',
    grade: 3,
    gender: '여',
    id: 'asdf',
    name: '김슈급',
    phoneNumber: '010-7105-2344',
    profile: 'https://topclass.chosun.com/news_img/2008/2008_008_4.jpg',
    residenceType: '독거',
  },
  {
    zipCode: '08018',
    address: '서울시 양천구 신정7동 목동남로4길 81 105동 101호',
    detailAddress: '목동남로4길 81',
    age: 20,
    birthDay: '2000-08-21',

    recipientMetas: [
      { type: CAPABILITY, key: '휠체어', value: '' },
      { type: CAPABILITY, key: '휠체어', value: '' },
      { type: CAPABILITY, key: '간호조무사', value: '' },
      { type: CAPABILITY, key: '휠체어', value: '' },
      { type: CAPABILITY, key: '휠체어', value: '' },
      { type: CAPABILITY, key: '휠체어', value: '' },
      { type: CAPABILITY, key: '휠체어', value: '' },
    ],

    description: '설명',
    grade: 3,
    gender: '여',
    id: 'asdf',
    name: '김슈급2',
    phoneNumber: '010-7105-2344',
    profile: 'https://topclass.chosun.com/news_img/2008/2008_008_4.jpg',
    residenceType: '독거',
  },
  {
    zipCode: '08018',
    address: '서울시 양천구 신정7동',
    detailAddress: '목동남로4길 81',
    age: 20,
    birthDay: '2000-08-21',

    recipientMetas: [{ type: CAPABILITY, key: '휠체어', value: '' }],

    description: '설명',
    grade: 3,
    gender: '여',
    id: 'asdf',
    name: '김슈급',
    phoneNumber: '010-7105-2344',
    profile: 'https://topclass.chosun.com/news_img/2008/2008_008_4.jpg',
    residenceType: '독거',
  },
] as Recipient[];

export default function MatchingProposalNew({ isFilled }: MatchingProposalProps) {
  const [isWoman, setIsWoman] = useState(true);
  const [selectedCareInfo, setSelectedCareInfo] = useState([] as string[]);
  const [selectedReligionInfo, setSelectedReligionInfo] = useState([] as string[]);
  const [selectedFamilyType, setSelectedFamilyType] = useState('');
  const [schedules, setSchedules] = useState([CareWorkerSchedule.noArgsConstructor()]);
  const [recipientName, setRecipientName] = useState('');

  const [recipient, setRecipient] = useState(new Recipient());

  const careCenter = useCareCenter();
  const [rerender, setRerender] = useState(false);
  const [isLoadModalOn, setIsLoadModalOn] = useState(false);

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

  const handleDeleteCurrentAddressRecipient = async () => {
    if (!window.confirm('현재 입력된 주소를 삭제하시겠습니까?')) return;

    setRecipient({
      ...recipient,
      zipCode: '',
      address: '',
      detailAddress: '',
    });
  };

  const toggleDays = (selectedDaysIndex: number, day: DayType) => {
    const newSchedules = [...schedules];
    toggleDayOfCareWorkerSchedule(newSchedules[selectedDaysIndex], day);
    setSchedules(newSchedules);
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

  const openAddressModalRecipient = () => {
    if (!window.daum) {
      alert('주소 검색 서비스 연결이 원활하지 않습니다.');
      return;
    }
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        setRecipient({
          ...recipient,
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
          {isLoadModalOn && (
            <S.LoginModalLayout>
              <S.LoginModal>
                <S.LoginModalTitle>수급자 선택</S.LoginModalTitle>
                <CloseIconSVG
                  style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }}
                  onClick={() => {
                    setIsLoadModalOn(false);
                  }}
                />
                <S.LoginModalInnerContent>
                  {recipients.length === 0 ? (
                    <S.EmptyCardContainer>
                      <S.EmptyCard>현재 관리하고 있는 수급자가 없습니다.</S.EmptyCard>
                    </S.EmptyCardContainer>
                  ) : (
                    <S.CardList>
                      {recipients.map((recipient, idx) => (
                        <S.StyledLink>
                          <Link
                            key={`worker-${idx}`}
                            href={{
                              pathname: '/recipients/[id]',
                            }}
                            as={`/recipients/${recipient.id}`}
                            passHref
                          >
                            <S.Card>
                              <S.ProfileImageLoad src={recipient.profile} />
                              <S.InfoContainer>
                                <S.BasicInfo>
                                  {recipient.name} ({recipient.age}/{recipient.gender[0]}/
                                  {recipient.grade}등급)
                                </S.BasicInfo>
                                <S.InfoRow>
                                  <S.SVGIconBox>
                                    <PhoneNumberIconSVG />
                                  </S.SVGIconBox>
                                  <S.InfoType>위치</S.InfoType>
                                  <S.InfoValue>{recipient.address}</S.InfoValue>
                                </S.InfoRow>
                                <S.InfoRow>
                                  <S.SVGIconBox>
                                    <PhoneNumberIconSVG />
                                  </S.SVGIconBox>
                                  <S.InfoType>휴대전화</S.InfoType>
                                  <S.InfoValue>{recipient.phoneNumber}</S.InfoValue>
                                </S.InfoRow>
                                <S.InfoRow>
                                  <S.SVGIconBox>
                                    <CareInfoIconSVG />
                                  </S.SVGIconBox>
                                  <S.InfoType>요구 조건</S.InfoType>

                                  <S.InfoItemList>
                                    {recipient.recipientMetas
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
                    </S.CardList>
                  )}
                </S.LoginModalInnerContent>
              </S.LoginModal>
            </S.LoginModalLayout>
          )}
          <S.Section>
            <S.SectionTitleContainer>
              <S.SectionTitle>수급자 정보</S.SectionTitle>
              <S.CenterInfoUpdateButton
                onClick={() => {
                  setIsLoadModalOn(true);
                }}
              >
                불러오기
              </S.CenterInfoUpdateButton>
            </S.SectionTitleContainer>
            <S.InfoTable>
              <tbody>
                <tr>
                  <td rowSpan={9} className="recipientProfile">
                    <S.ProfileImageContainer>
                      <S.ProfileImage src="https://dolbom.s3.amazonaws.com/newFiles/2ce24d59-59b8-4109-b5f3-6ad26ac55170_%E1%84%89%E1%85%AE%E1%84%80%E1%85%B3%E1%86%B8%E1%84%8C%E1%85%A1.png" />
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
                    <S.DropDown>
                      <option value={''}>요양등급 선택</option>
                      {NURSING_GRADE.map((grade, idx) => (
                        <option key={`${grade}-${idx}`} value={grade}>
                          {grade}
                        </option>
                      ))}
                    </S.DropDown>
                  </td>
                  <th>나이</th>
                  <td className="right">
                    <S.InfoInput></S.InfoInput>
                  </td>
                </tr>
                <tr>
                  <th>돌봄 시간</th>
                  <td style={{ padding: 0 }} colSpan={3}>
                    {schedules.map((schedule, scheduleIndex) => {
                      return (
                        <S.TimeSelectContainer
                          isLast={schedules.length - 1 === scheduleIndex}
                          key={`timeselectcontainer-${scheduleIndex}`}
                        >
                          <S.TdFlexBox>
                            {DAY_LIST.map((day) => {
                              return (
                                <S.ToggleButton
                                  isSelected={schedule.days.includes(day)}
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
                                value={schedule.startHour ? schedule.startHour : 0}
                                onChange={(e) => {
                                  const currentHour = e.target.value.replace(/[^0-9]/g, '');
                                  schedule.startHour = parseInt(currentHour);
                                  if (schedule.startHour >= 100)
                                    schedule.startHour = Math.floor(schedule.startHour / 10);
                                  if (schedule.startHour >= 24 && schedule.startHour < 100)
                                    schedule.startHour = 23;
                                  setRerender(!rerender);
                                }}
                              />
                              시
                              <S.ClockInput
                                type="text"
                                value={schedule.startMinute ? schedule.startMinute : 0}
                                onChange={(e) => {
                                  const currentMinute = e.target.value.replace(/[^0-9]/g, '');
                                  schedule.startMinute = parseInt(currentMinute);
                                  if (schedule.startMinute >= 100)
                                    schedule.startMinute = Math.floor(schedule.startMinute / 10);
                                  if (schedule.startMinute >= 60 && schedule.startMinute < 100)
                                    schedule.startMinute = 59;
                                  setRerender(!rerender);
                                }}
                              />
                              분
                            </S.ClockSelectContainer>
                            부터
                            <S.ClockSelectContainer>
                              <S.ClockInput
                                type="text"
                                value={schedule.endHour ? schedule.endHour : 0}
                                onChange={(e) => {
                                  const currentHour = e.target.value.replace(/[^0-9]/g, '');
                                  schedule.endHour = parseInt(currentHour);
                                  if (schedule.endHour >= 100)
                                    schedule.endHour = Math.floor(schedule.endHour / 10);
                                  if (schedule.endHour >= 24 && schedule.endHour < 100)
                                    schedule.endHour = 23;
                                  setRerender(!rerender);
                                }}
                              />
                              시
                              <S.ClockInput
                                type="text"
                                value={schedule.endMinute ? schedule.endMinute : 0}
                                onChange={(e) => {
                                  const currentMinute = e.target.value.replace(/[^0-9]/g, '');
                                  schedule.endMinute = parseInt(currentMinute);
                                  if (schedule.endMinute >= 100)
                                    schedule.endMinute = Math.floor(schedule.endMinute / 10);
                                  if (schedule.endMinute >= 60 && schedule.endMinute < 100)
                                    schedule.endMinute = 59;
                                  setRerender(!rerender);
                                }}
                              />
                              분
                            </S.ClockSelectContainer>
                            까지
                          </S.TdFlexBox>
                          <S.PlusMinusButtonContainer>
                            <S.PlusMinusButton
                              hide={schedules.length - 1 !== scheduleIndex}
                              disabled={schedules.length - 1 !== scheduleIndex}
                              onClick={() => {
                                setSchedules([
                                  ...schedules,
                                  CareWorkerSchedule.noArgsConstructor(),
                                ]);
                              }}
                            >
                              <PlusIconSVG />
                            </S.PlusMinusButton>
                            <S.PlusMinusButton
                              onClick={() => {
                                if (schedules.length === 1) {
                                  setSchedules([
                                    ...schedules,
                                    CareWorkerSchedule.noArgsConstructor(),
                                  ]);
                                }
                                setSchedules((schedules) =>
                                  schedules.filter((_, i) => i !== scheduleIndex)
                                );
                              }}
                            >
                              <MinusIconSVG />
                            </S.PlusMinusButton>
                          </S.PlusMinusButtonContainer>
                        </S.TimeSelectContainer>
                      );
                    })}
                  </td>
                </tr>
                <tr>
                  <th rowSpan={2}>주소</th>
                  <td colSpan={3}>
                    <S.TextInput
                      type="text"
                      readOnly
                      value={recipient.zipCode}
                      onClick={openAddressModalRecipient}
                      withButton
                    />
                    <S.AddressButton onClick={openAddressModalRecipient}>주소 검색</S.AddressButton>
                    <S.AddressDeleteButton onClick={handleDeleteCurrentAddressRecipient}>
                      주소 초기화
                    </S.AddressDeleteButton>
                  </td>
                </tr>
                <tr>
                  <td>
                    <S.TextInput type="text" value={recipient.address} long readOnly disabled />
                  </td>
                  <td colSpan={3}>
                    <S.TextInput
                      type="text"
                      value={recipient.detailAddress}
                      readOnly={recipient.address === ''}
                      long
                      placeholder="상세주소 입력"
                    />
                  </td>
                </tr>
                <tr>
                  <th>거주 형태</th>
                  <td colSpan={3} className="wide">
                    <S.TdFlexBox>
                      {FAMILY_TYPE.map((familyType, index) => {
                        return (
                          <S.ToggleButton
                            isSelected={selectedFamilyType.indexOf(familyType) !== -1}
                            onClick={() => {
                              if (selectedFamilyType !== familyType) {
                                setSelectedFamilyType(familyType);
                              } else {
                                setSelectedFamilyType('');
                              }
                            }}
                            key={`familyTypeItem-${index}`}
                          >
                            {familyType}
                          </S.ToggleButton>
                        );
                      })}
                    </S.TdFlexBox>
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
                                  selectedCareInfo.filter(
                                    (targetCareInfo) => careInfo !== targetCareInfo
                                  )
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
                            isSelected={selectedReligionInfo.indexOf(religion) !== -1}
                            onClick={() => {
                              if (selectedReligionInfo.indexOf(religion) === -1) {
                                setSelectedReligionInfo([...selectedReligionInfo, religion]);
                              } else {
                                setSelectedReligionInfo((selectedReligionInfo) =>
                                  selectedReligionInfo.filter(
                                    (targetReligionInfo) => religion !== targetReligionInfo
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
                    <S.TextArea placeholder="수급자의 세부 요구사항을 작성해주세요." />
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
                    <S.TextArea placeholder="" />
                  </td>
                </tr>
              </tbody>
            </S.InfoTable>
          </S.Section>
          <S.CompleteSection>
            <S.FinishButton>매칭 제안서 보내기</S.FinishButton>
          </S.CompleteSection>
        </S.InnerContent>
      </S.MatchingProposalContent>
    </>
  );
}