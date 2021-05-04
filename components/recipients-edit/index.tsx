import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as S from './styles';
import { CAPABILITY, CARE_INFO_LIST, DAY_LIST, FAMILY_TYPE } from '../../constant';
import { useRecipientsUpsert } from './hooks';
import ImageDefaultSVG from '../../svgs/image-default-svg';
import { RecipientTime } from '../../model/recipient-time';
import MinusIconSVG from '../../svgs/minus-icon-svg';
import PlusIconSVG from '../../svgs/plus-icon-svg';

const slicedCareInfoList = [];
for (let i = 0; i < CARE_INFO_LIST.length; i += 5)
  slicedCareInfoList.push(CARE_INFO_LIST.slice(i, i + 5));

interface RecipientsEditProps {
  isNew: boolean;
}

export default function RecipientsUpsert({ isNew }: RecipientsEditProps) {
  const {
    recipient,
    setRecipient,
    rerender,
    setRerender,
    memo,
    memo2,
    memoRef,
    memoRef2,
    setMemo,
    setMemo2,
    schedules,
    setSchedules,
    recipientCapabilities,
    toggleCapability,
    toggleDaysOfRecipientTime,
    openAddressModal,
    onChangeImage,
    handleUpdateGender,
    handleUpdateAge,
    handleUpdateRecipient,
    handleClickUpdateButton,
    handleClickCreateButton,
    isRequesting,
    handleDeleteCurrentAddress,
  } = useRecipientsUpsert(isNew);

  return (
    <>
      <S.RecipientEdit>
        <S.InnerContent>
          <S.Section>
            <S.SectionTitle>수급자 정보</S.SectionTitle>
            <S.Table>
              <tbody>
                <tr>
                  <td rowSpan={8} className="profile">
                    <S.ProfileImageContainer>
                      <label htmlFor="profile">
                        <S.ProfileImage src={recipient.profile}>
                          <S.ImageIconContainer isHover={recipient.profile !== ''}>
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
                  <th>이름</th>
                  <td className="infovalue">
                    <S.TextInput
                      value={recipient.name || ''}
                      onChange={handleUpdateRecipient('name')}
                      type="text"
                      placeholder="이름을 입력해주세요"
                    />
                  </td>
                  <th>나이</th>
                  <td className="infovalue">
                    <S.TextInput
                      value={recipient.age || ''}
                      onChange={handleUpdateAge}
                      type="number"
                      placeholder="예시) 12"
                    />
                  </td>
                </tr>
                <tr>
                  <th>성별</th>
                  <td className="infovalue">
                    <S.TdFlexBox>
                      <S.ToggleButton
                        isSelected={!recipient.isFemale}
                        onClick={handleUpdateGender(false)}
                      >
                        남
                      </S.ToggleButton>
                      <S.ToggleButton
                        isSelected={recipient.isFemale}
                        onClick={handleUpdateGender(true)}
                      >
                        여
                      </S.ToggleButton>
                    </S.TdFlexBox>
                  </td>
                  <th>휴대전화</th>
                  <td className="infovalue">
                    <S.TextInput
                      value={recipient.phoneNumber || ''}
                      onChange={handleUpdateRecipient('phoneNumber')}
                      type="text"
                      maxLength={11}
                      placeholder="예시) 01012345678"
                    />
                  </td>
                </tr>
                <tr>
                  <th>등급</th>
                  <td className="infovalue">
                    <S.DropDown value={recipient.grade} onChange={handleUpdateRecipient('grade')}>
                      <option value={1}>1등급</option>
                      <option value={2}>2등급</option>
                      <option value={3}>3등급</option>
                      <option value={4}>4등급</option>
                      <option value={5}>5등급</option>
                    </S.DropDown>
                  </td>
                  <th>거주 형태</th>
                  <td className="infovalue">
                    <S.DropDown
                      value={recipient.familyType}
                      onChange={handleUpdateRecipient('familyType')}
                    >
                      {FAMILY_TYPE.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </S.DropDown>
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
                                  onClick={() => toggleDaysOfRecipientTime(scheduleIndex, day)}
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
                      value={recipient.zipCode || ''}
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
                    <S.TextInput type="text" value={recipient.address} long readOnly disabled />
                  </td>
                  <td colSpan={3}>
                    <S.TextInput
                      type="text"
                      value={recipient.detailAddress}
                      readOnly={recipient.address === ''}
                      long
                      placeholder="상세주소 입력"
                      onChange={handleUpdateRecipient('detailAddress')}
                    />
                  </td>
                </tr>
                <tr>
                  <th>요구 사항</th>
                  <td colSpan={3} className="personality">
                    <S.InnerTable>
                      <tbody>
                        {slicedCareInfoList.map((slicedCareInfo, row) => {
                          return (
                            <tr key={`CareInfo-${row}`}>
                              {slicedCareInfo.map((careInfo, index) => {
                                return (
                                  <td
                                    className={`available ${index === 4 && 'right'} ${
                                      row === 1 && 'bottom'
                                    }`}
                                    key={`${index}`}
                                    onClick={() => toggleCapability(careInfo)}
                                  >
                                    <div className="hoverDiv">
                                      {careInfo}
                                      <S.CheckBox
                                        type="checkbox"
                                        checked={recipientCapabilities.includes(careInfo)}
                                        onChange={() => toggleCapability(careInfo)}
                                      />
                                    </div>
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </S.InnerTable>
                  </td>
                </tr>
                <tr>
                  <th>세부 사항</th>
                  <td colSpan={3}>
                    <S.TextArea
                      ref={memoRef}
                      value={memo}
                      onChange={(e) => {
                        setMemo(e.target.value);
                        handleUpdateRecipient('description')(e);
                      }}
                      placeholder="세부 사항을 입력해주세요"
                    />
                  </td>
                </tr>
              </tbody>
            </S.Table>
          </S.Section>
          <S.FinishButtonContainer>
            {isNew ? (
              <S.FinishButton disabled={isRequesting} onClick={handleClickCreateButton}>
                작성 완료
              </S.FinishButton>
            ) : (
              <S.FinishButton disabled={isRequesting} onClick={handleClickUpdateButton}>
                수정 완료
              </S.FinishButton>
            )}
          </S.FinishButtonContainer>
        </S.InnerContent>
      </S.RecipientEdit>
    </>
  );
}
