import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as S from './styles';
import { CAPABILITY, CARE_INFO_LIST, DAY_LIST, FAMILY_TYPE, RELIGION_LIST } from '../../constant';
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
                  <td rowSpan={9} className="profile">
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
                </tr>
                <tr>
                  <th>나이</th>
                  <td className="infovalue">
                    <S.TextInput
                      value={recipient.age || ''}
                      onChange={handleUpdateAge}
                      type="text"
                      placeholder="예시) 70"
                    />
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
                      <option value={''}>등급 선택</option>
                      <option value={1}>1등급</option>
                      <option value={2}>2등급</option>
                      <option value={3}>3등급</option>
                      <option value={4}>4등급</option>
                      <option value={5}>5등급</option>
                    </S.DropDown>
                  </td>
                  <th>종교</th>
                  <td className="infovalue">
                    <S.DropDown
                      value={recipient.religion}
                      onChange={handleUpdateRecipient('religion')}
                    >
                      <option value={''}>종교 선택</option>
                      {RELIGION_LIST.map((religion) => (
                        <option key={religion} value={religion}>
                          {religion}
                        </option>
                      ))}
                    </S.DropDown>
                  </td>
                </tr>
                <tr>
                  <th>거주 형태</th>
                  <td className="infovalue">
                    <S.DropDown
                      value={recipient.familyType}
                      onChange={handleUpdateRecipient('familyType')}
                    >
                      <option value={''}>거주 형태 선택</option>
                      {FAMILY_TYPE.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </S.DropDown>
                  </td>
                  <th>돌봄 시간</th>
                  <td className="infovalue">
                    <S.TextInput
                      value={recipient.serviceTime || ''}
                      onChange={handleUpdateRecipient('serviceTime')}
                      type="text"
                      placeholder="예시) 월~금 9-12"
                    />
                  </td>
                </tr>
                <tr></tr>
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
                  <td colSpan={3} className="wide overtd">
                    <S.TdFlexBox>
                      {CARE_INFO_LIST.map((careInfo, index) => {
                        return (
                          <S.ToggleButton
                            className="overitems"
                            isSelected={recipientCapabilities.includes(careInfo)}
                            onClick={() => toggleCapability(careInfo)}
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
