import React, { useCallback, useEffect, useRef, useState } from 'react';
import MinusIconSVG from '../../svgs/minus-icon-svg';
import PlusIconSVG from '../../svgs/plus-icon-svg';
import * as S from './styles';
import {
  CAPABILITY,
  CARE_INFO_LIST,
  DAY_LIST,
  FAMILY_TYPE,
  NURSING_GRADE,
  RELIGION_LIST,
  WORKER_MAN_SMALL_IMAGE_URL,
  WORKER_WOMAN_SMALL_IMAGE_URL,
} from '../../constant';
import axios from 'axios';
import CenterUpdateRequest from '../../views/my-center-edit-view/model/center-update-request';
import { useCareCenter } from '../../context/care-center';
import {
  CareWorkerSchedule,
  toggleDayOfCareWorkerSchedule,
} from '../../model/care-worker-schedule';
import { DayType } from '../../common/types/date';
import CloseIconSVG from '../../svgs/close-icon-svg';
import Recipient from '../../model/recipient';
import PhoneNumberIconSVG from '../../svgs/phone-number-icon-svg';
import CareInfoIconSVG from '../../svgs/care-info-icon-svg';
import { useRouter } from 'next/router';
import CreateRecipientRequest from '../recipients-edit/model/create-recipient-request';
import { RecipientTime, toggleDayOfRecipientTime } from '../../model/recipient-time';
import EtcSVG from '../../svgs/etc-svg';
import LocationIconSVG from '../../svgs/location-icom-svg';

interface MatchingProposalProps {
  isFilled: boolean;
}

export default function MatchingProposalNew({ isFilled }: MatchingProposalProps) {
  const careCenter = useCareCenter();
  const router = useRouter();

  const [selectedCareInfo, setSelectedCareInfo] = useState([] as string[]);
  const [selectedReligionInfo, setSelectedReligionInfo] = useState([] as string[]);
  const [selectedFamilyType, setSelectedFamilyType] = useState('');
  const [schedules, setSchedules] = useState([RecipientTime.noArgsConstructor()]);

  const [recipient, setRecipient] = useState(new Recipient());

  const [rerender, setRerender] = useState(false);
  const [isLoadModalOn, setIsLoadModalOn] = useState(false);

  const [memo, setMemo] = useState('');
  const memoRef = useRef<HTMLTextAreaElement>(null);

  const getInfoItemsEtc = (infoList: any[]) => {
    const wordLimit = 16;
    const itemLimit = 7;
    const LENGTH = infoList.reduce((sum, item) => sum + item.key.length, 0);
    if (LENGTH <= wordLimit)
      return infoList
        ?.filter((meta) => meta.type === CAPABILITY)
        .map((meta, index) => {
          return <S.InfoItem key={`careInfoItem-${index}`}>{meta.key}</S.InfoItem>;
        });
    else
      return (
        <>
          {infoList
            ?.slice(0, itemLimit)
            .filter((meta) => meta.type === CAPABILITY)
            .map((meta, index) => {
              return <S.InfoItem key={`careInfoItem-${index}`}>{meta.key}</S.InfoItem>;
            })}
          <EtcSVG />
        </>
      );
  };

  const handleUpdateRecipient = useCallback(
    (key: keyof CreateRecipientRequest) => (e: any) => {
      setRecipient({
        ...recipient,
        [key]: e.target.value,
      });
    },
    [recipient]
  );

  const handleUpdateGender = useCallback(
    (isFemale: boolean) => () => {
      if (
        recipient.profile !== WORKER_MAN_SMALL_IMAGE_URL &&
        recipient.profile !== WORKER_WOMAN_SMALL_IMAGE_URL
      ) {
        setRecipient({ ...recipient, isFemale });
        return;
      }

      setRecipient({
        ...recipient,
        isFemale,
        profile: isFemale ? WORKER_WOMAN_SMALL_IMAGE_URL : WORKER_MAN_SMALL_IMAGE_URL,
      });
    },
    [recipient]
  );

  const handleUpdateAge = useCallback(
    (e: any) => {
      setRecipient({ ...recipient, age: parseInt(e.target.value) });
    },
    [recipient]
  );

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
    toggleDayOfRecipientTime(newSchedules[selectedDaysIndex], day);
    setSchedules(newSchedules);
  };

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
        setRecipient({
          ...recipient,
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
      setRecipient({
        ...recipient,
        profile: response.data.Location,
      });
    } catch {
      alert('이미지 업로드에 실패하였습니다. 잠시후 다시 시도해주세요.');
    }
  };

  const [recipients, setRecipients] = useState([] as Recipient[]);

  useEffect(() => {
    if (careCenter.isValidating || !careCenter.isLoggedIn) return;

    (async () => {
      try {
        const response = await axios.get('/recipient');
        setRecipients(response.data);
      } catch (e) {}
    })();
  }, [careCenter]);

  const onClickRecipient = useCallback(
    (recipient: Recipient) => () => {
      setRecipient(recipient);
      setIsLoadModalOn(false);
    },
    [recipients]
  );

  return (
    <>
      <S.MatchingProposalContent>
        <S.InnerContent>
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
                    <S.InfoInput value={recipient.name} onChange={handleUpdateRecipient('name')} />
                  </td>
                  <th>성별</th>
                  <td className="select right">
                    <S.TdFlexBox>
                      <S.ToggleButton
                        isSelected={!recipient.isFemale}
                        onClick={handleUpdateGender(false)}
                        key={`GenderItem-man`}
                      >
                        남
                      </S.ToggleButton>
                      <S.ToggleButton
                        isSelected={recipient.isFemale}
                        onClick={handleUpdateGender(true)}
                        key={`GenderItem-female`}
                      >
                        여
                      </S.ToggleButton>
                    </S.TdFlexBox>
                  </td>
                </tr>
                <tr>
                  <th>등급</th>
                  <td className="select left">
                    <S.DropDown
                      onChange={(e) =>
                        setRecipient({ ...recipient, grade: parseInt(e.target.value) })
                      }
                      value={recipient.grade}
                    >
                      <option value={''}>요양등급 선택</option>
                      {NURSING_GRADE.map((grade, idx) => (
                        <option key={`${grade}-${idx}`} value={idx + 1}>
                          {grade}
                        </option>
                      ))}
                    </S.DropDown>
                  </td>
                  <th>나이</th>
                  <td className="right">
                    <S.InfoInput value={recipient.age} />
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
                                setSchedules([...schedules, RecipientTime.noArgsConstructor()]);
                              }}
                            >
                              <PlusIconSVG />
                            </S.PlusMinusButton>
                            <S.PlusMinusButton
                              onClick={() => {
                                if (schedules.length === 1) {
                                  setSchedules([...schedules, RecipientTime.noArgsConstructor()]);
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
                      onChange={handleUpdateRecipient('detailAddress')}
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
                    <S.InfoInput
                      value={recipient.hourlyWage}
                      onChange={handleUpdateRecipient('hourlyWage')}
                      className="money"
                    ></S.InfoInput>
                    원
                  </td>
                </tr>
                <tr>
                  <th>비고</th>
                  <td>
                    <S.TextArea
                      value={recipient.note}
                      onChange={handleUpdateRecipient('note')}
                      placeholder=""
                    />
                  </td>
                </tr>
              </tbody>
            </S.InfoTable>
          </S.Section>
          <S.CompleteSection>
            <S.FinishButton>매칭 제안서 보내기</S.FinishButton>
          </S.CompleteSection>
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
                        <S.StyledLink
                          key={`recipient-${idx}`}
                          onClick={onClickRecipient(recipient)}
                        >
                          <S.Card>
                            <S.ProfileImageLoad src={recipient.profile} />
                            <S.InfoContainer>
                              <S.BasicInfo>
                                {recipient.name} ({recipient.age}/{recipient.isFemale ? '여' : '남'}
                                /{recipient.grade}등급)
                              </S.BasicInfo>
                              <S.InfoRow>
                                <S.SVGIconBox>
                                  <LocationIconSVG />
                                </S.SVGIconBox>
                                <S.InfoType>위치</S.InfoType>
                                <S.LocationValue>{recipient.address}</S.LocationValue>
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
                                <S.InfoType>요구 사항</S.InfoType>
                                <S.InfoItemList>
                                  {getInfoItemsEtc(
                                    recipient.recipientMetas?.filter(
                                      (meta) => meta.type === CAPABILITY
                                    )
                                  )}
                                </S.InfoItemList>
                              </S.InfoRow>
                            </S.InfoContainer>
                          </S.Card>
                        </S.StyledLink>
                      ))}
                    </S.CardList>
                  )}
                </S.LoginModalInnerContent>
              </S.LoginModal>
            </S.LoginModalLayout>
          )}
        </S.InnerContent>
      </S.MatchingProposalContent>
    </>
  );
}
