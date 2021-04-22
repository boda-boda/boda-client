import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as S from './styles';
import { CAPABILITY, CARE_INFO_LIST } from '../../constant';
import { useRecipientsUpsert } from './hooks';
import ImageDefaultSVG from '../../svgs/image-default-svg';

const slicedCareInfoList = [];
for (let i = 0; i < CARE_INFO_LIST.length; i += 5)
  slicedCareInfoList.push(CARE_INFO_LIST.slice(i, i + 5));

interface RecipientsEditProps {
  isNew: boolean;
}

export default function RecipientsEdit({ isNew }: RecipientsEditProps) {
  const {
    isRequesting,
    recipient,
    setRecipient,
    memo,
    memoRef,
    setMemo,
    careWorkerCapabilities,
    toggleCapability,
    openAddressModal,
    onChangeImage,
    handleUpdateGender,
    handleUpdateBirthday,
    handleUpdateRecipient,
    handleClickUpdateButton,
    handleClickCreateButton,
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
                  <td rowSpan={6} className="profile">
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
                        isSelected={recipient.isFemale}
                        onClick={handleUpdateGender(true)}
                      >
                        여
                      </S.ToggleButton>
                      <S.ToggleButton
                        isSelected={!recipient.isFemale}
                        onClick={handleUpdateGender(false)}
                      >
                        남
                      </S.ToggleButton>
                    </S.TdFlexBox>
                  </td>
                </tr>
                <tr>
                  <th>등급</th>
                  <td className="infovalue">
                    <S.DropDown></S.DropDown>
                  </td>
                  <th>생년월일</th>
                  <td className="infovalue">
                    <S.TextInput
                      value={recipient.birthDay || ''}
                      onChange={handleUpdateBirthday}
                      type="text"
                      maxLength={8}
                      placeholder="예시) 19601231"
                    />
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
                  <th>가능 조건</th>
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
                                        checked={careWorkerCapabilities.includes(careInfo)}
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
          <S.Section>
            <S.SectionTitle>기타</S.SectionTitle>
            <S.Table>
              <tr>
                <th>시급</th>
                <td>11,000원</td>
              </tr>
              <tr>
                <th>비고</th>
                <td>
                  매번 요리 하실 필요는 없고, 있는 반찬으로 밥 차려드려서 식사만 도와드리면 됩니다.
                  산책하는 것을 좋아하셔서 날이 좋으면 자주 산책 해주시면 됩니다. 주로 혼자
                  생활하시며 자녀분께서 일주일에 두 번 정도 방문하십니다.
                </td>
              </tr>
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
