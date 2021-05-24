import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as S from './styles';
import { CAPABILITY, CARE_INFO_LIST, FAMILY_TYPE } from '../../constant';
import { useRecipientsUpsert } from './hooks';
import ImageDefaultSVG from '../../svgs/image-default-svg';

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
    memo,
    memo2,
    memoRef,
    memoRef2,
    setMemo,
    setMemo2,
    recipientCapabilities,
    toggleCapability,
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
                      autoFocus
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
                  <th>거주형태</th>
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
          <S.Section>
            <S.SectionTitle>기타</S.SectionTitle>
            <S.Table>
              <tr>
                <th>시급</th>
                <td>
                  <S.TextInput
                    value={recipient.hourlyWage}
                    onChange={handleUpdateRecipient('hourlyWage')}
                    type="text"
                    placeholder="시급을 입력해주세요"
                  />
                </td>
              </tr>
              <tr>
                <th>비고</th>
                <td>
                  <S.TextArea
                    ref={memoRef2}
                    value={memo2}
                    onChange={(e) => {
                      setMemo2(e.target.value);
                      handleUpdateRecipient('note')(e);
                    }}
                    placeholder="비고란을 입력해주세요"
                  />
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
