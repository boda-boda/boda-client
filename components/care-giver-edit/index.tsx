import React, { useState } from 'react';
import MinusIconSVG from '../../svgs/minus-icon-svg';
import PlusIconSVG from '../../svgs/plus-icon-svg';
import * as S from './styles';
import {
  DAY_LIST,
  CARE_INFO_LIST,
  SEOUL_GU_DONG,
  RELIGION_LIST,
  WORKING_STATE,
  OUTER_CARE_WORKER_SCHEDULE_TYPES,
} from '../../constant';
import ImageDefaultSVG from '../../svgs/image-default-svg';
import { useCareGiverUpsert } from './hooks';
import { CareWorkerSchedule } from '../../model/care-worker-schedule';
import BusinessArea from '../../model/business-area';
import Career from './model/career';

interface CareGiverEditProps {
  isNew: boolean;
}

const slicedCareInfoList = [];
for (let i = 0; i < CARE_INFO_LIST.length; i += 5)
  slicedCareInfoList.push(CARE_INFO_LIST.slice(i, i + 5));

const slicedReligionList = [];
for (let i = 0; i < RELIGION_LIST.length; i += 5)
  slicedReligionList.push(RELIGION_LIST.slice(i, i + 5));

export default function CareGiverEdit({ isNew }: CareGiverEditProps) {
  const [rerender, setRerender] = useState(false);
  const {
    isRequesting,
    careWorker,
    setCareWorker,
    memo,
    careWorkerCareers,
    memoRef,
    setMemo,
    setCareWorkerCareers,
    careWorkerSchedules,
    careWorkerCapabilities,
    careWorkerReligions,
    toggleCapability,
    toggleReligion,
    setCareWorkerSchedules,
    toggleDays,
    openAddressModal,
    careWorkerAreas,
    setCareWorkerAreas,
    onChangeImage,
    handleUpdateGender,
    handleUpdateWorkingState,
    handleUpdateTime,
    handleUpdateBirthday,
    handleUpdateCareGiver,
    handleClickUpdateButton,
    handleClickCreateButton,
    handleDeleteCurrentAddress,
  } = useCareGiverUpsert(isNew);

  return (
    <>
      <S.CareGiverEdit>
        <S.InnerContent>
          <S.Section>
            <S.SectionTitle>기본 정보</S.SectionTitle>
            <S.Table>
              <tbody>
                <tr>
                  <td rowSpan={6} className="profile">
                    <S.ProfileImageContainer>
                      <label htmlFor="profile">
                        <S.ProfileImage src={careWorker.profile}>
                          <S.ImageIconContainer isHover={careWorker.profile !== ''}>
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
                      value={careWorker.name || ''}
                      onChange={handleUpdateCareGiver('name')}
                      type="text"
                      placeholder="이름을 입력해주세요"
                      autoFocus
                    />
                  </td>
                  <th>생년월일</th>
                  <td className="infovalue">
                    <S.TextInput
                      value={careWorker.birthDay || ''}
                      onChange={handleUpdateBirthday}
                      type="text"
                      maxLength={8}
                      placeholder="예시) 19601231"
                    />
                  </td>
                </tr>
                <tr>
                  <th>성별</th>
                  <td className="infovalue">
                    <S.TdFlexBox>
                      <S.ToggleButton
                        isSelected={careWorker.isFemale}
                        onClick={handleUpdateGender(true)}
                      >
                        여
                      </S.ToggleButton>
                      <S.ToggleButton
                        isSelected={!careWorker.isFemale}
                        onClick={handleUpdateGender(false)}
                      >
                        남
                      </S.ToggleButton>
                    </S.TdFlexBox>
                  </td>
                  <th>휴대전화</th>
                  <td className="infovalue">
                    <S.TextInput
                      value={careWorker.phoneNumber || ''}
                      onChange={handleUpdateCareGiver('phoneNumber')}
                      type="text"
                      maxLength={11}
                      placeholder="예시) 01012345678"
                    />
                  </td>
                </tr>
                <tr>
                  <th>재직 구분</th>
                  <td className="infovalue">
                    <S.TdFlexBox>
                      {WORKING_STATE.map((workingState, workingStateIndex) => {
                        return (
                          <S.ToggleButtonWorkingState
                            isSelected={careWorker.workingState === workingState}
                            onClick={handleUpdateWorkingState(workingState)}
                            key={`workingStateListItem-${workingStateIndex}`}
                          >
                            {workingState}
                          </S.ToggleButtonWorkingState>
                        );
                      })}
                    </S.TdFlexBox>
                  </td>
                  <th>
                    자격증
                    <br />
                    취득일
                  </th>
                  <td className="infovalue">
                    <S.TextInput
                      value={careWorker.licenseDate || ''}
                      onChange={handleUpdateCareGiver('licenseDate')}
                      type="text"
                      maxLength={8}
                      placeholder="예시) 20210601"
                    />
                  </td>
                </tr>
                <tr>
                  <th>가능 시간</th>
                  <td className="time">
                    <S.TimeSelectContainer>
                      {OUTER_CARE_WORKER_SCHEDULE_TYPES.map((time, index) => {
                        return (
                          <S.ToggleButtonWorkingState
                            isSelected={careWorker.time === time}
                            onClick={handleUpdateTime(time)}
                            key={`timeListItem-${index}`}
                          >
                            {time}
                          </S.ToggleButtonWorkingState>
                        );
                      })}
                    </S.TimeSelectContainer>
                  </td>
                </tr>
                <tr>
                  <th rowSpan={2}>주소</th>
                  <td colSpan={3}>
                    <S.TextInput
                      type="text"
                      value={careWorker.zipCode || ''}
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
                    <S.TextInput type="text" value={careWorker.address} long readOnly disabled />
                  </td>
                  <td colSpan={3}>
                    <S.TextInput
                      type="text"
                      value={careWorker.detailAddress}
                      readOnly={careWorker.address === ''}
                      long
                      placeholder="상세주소 입력"
                      onChange={handleUpdateCareGiver('detailAddress')}
                    />
                  </td>
                </tr>
              </tbody>
            </S.Table>
          </S.Section>
          <S.Section>
            <S.SectionTitle>활동 지역</S.SectionTitle>
            <S.Table>
              <tbody>
                {careWorkerAreas.map((businessArea, businessAreaIndex) => (
                  <tr key={`businessArea-${businessAreaIndex}`}>
                    <td>
                      <S.DropDown
                        onChange={(e) => {
                          businessArea.city = e.target.value;
                          businessArea.gu = '';
                          businessArea.dong = '';
                          setRerender(!rerender);
                        }}
                        value={businessArea.city || ''}
                      >
                        <option value={null} hidden>
                          시/도 선택
                        </option>
                        <option value="서울특별시">서울특별시</option>
                      </S.DropDown>
                      <S.DropDown
                        onChange={(e) => {
                          businessArea.gu = e.target.value;
                          businessArea.dong = '';
                          setRerender(!rerender);
                        }}
                        value={businessArea.gu || ''}
                      >
                        <option value={null} hidden>
                          구 선택
                        </option>
                        {businessArea.city === '서울특별시' ? (
                          <option value={''}>전체</option>
                        ) : null}
                        {businessArea.city &&
                          SEOUL_GU_DONG.map((gudong, idx) => (
                            <option key={`${gudong.gu}-${idx}`} value={gudong.gu}>
                              {gudong.gu}
                            </option>
                          ))}
                      </S.DropDown>
                      <S.DropDown
                        onChange={(e) => {
                          businessArea.dong = e.target.value;
                          setRerender(!rerender);
                        }}
                        value={businessArea.dong || ''}
                      >
                        <option value={null}>동 선택</option>
                        {businessArea.dong ? <option value={''}>전체</option> : null}
                        {businessArea.gu &&
                          SEOUL_GU_DONG.find((gudong) => gudong.gu === businessArea.gu)?.dongs.map(
                            (dong, idx) => (
                              <option key={`${dong}-${idx}`} value={dong}>
                                {dong}
                              </option>
                            )
                          )}
                      </S.DropDown>
                    </td>
                    <td>
                      <S.PlusMinusButtonContainer>
                        <S.PlusMinusButton
                          hide={careWorkerAreas.length - 1 !== businessAreaIndex}
                          disabled={careWorkerAreas.length - 1 !== businessAreaIndex}
                          onClick={() => {
                            setCareWorkerAreas([
                              ...careWorkerAreas,
                              BusinessArea.noArgsConstructor(),
                            ]);
                          }}
                        >
                          <PlusIconSVG />
                        </S.PlusMinusButton>
                        <S.XGap />
                        <S.PlusMinusButton
                          onClick={() => {
                            if (careWorkerAreas.length === 1) {
                              setCareWorkerAreas([
                                ...careWorkerAreas,
                                BusinessArea.noArgsConstructor(),
                              ]);
                            }
                            setCareWorkerAreas((businessAreas) =>
                              businessAreas.filter((_, i) => i !== businessAreaIndex)
                            );
                          }}
                        >
                          <MinusIconSVG />
                        </S.PlusMinusButton>
                      </S.PlusMinusButtonContainer>
                    </td>
                  </tr>
                ))}
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
                      value={careWorker.description}
                      onChange={(e) => {
                        handleUpdateCareGiver('description')(e);
                      }}
                      placeholder="메모를 입력해주세요"
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
                {slicedCareInfoList.map((slicedCareInfo, row) => {
                  return (
                    <tr key={`CareInfo-${row}`}>
                      {slicedCareInfo.map((careInfo, index) => {
                        return (
                          <td
                            className={`available ${index === 4 && 'right'}`}
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
            </S.Table>
          </S.Section>
          <S.Section>
            <S.SectionTitle>종교</S.SectionTitle>
            <S.Table>
              <tbody>
                {slicedReligionList.map((slicedReligion, row) => {
                  return (
                    <tr key={`Religion-${row}`}>
                      {slicedReligion.map((religion, index) => {
                        return (
                          <td
                            className={`available ${index === 4 && 'right'}`}
                            key={`${index}`}
                            onClick={() => toggleReligion(religion)}
                          >
                            <div className="hoverDiv">
                              {religion}
                              <S.CheckBox
                                type="checkbox"
                                checked={careWorkerReligions.includes(religion)}
                                onChange={() => toggleReligion(religion)}
                              />
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </S.Table>
          </S.Section>

          <S.Section>
            <S.SectionTitle>경력</S.SectionTitle>
            <S.Table>
              <tbody>
                <tr>
                  <th className="career">근무지(수급자)</th>
                  <th className="career">기간</th>
                  <th className="career long">비고</th>
                  <th className="career short right">추가/제거</th>
                </tr>
                {careWorkerCareers.map((career, careerIndex) => {
                  return (
                    <tr key={`career-row-${careerIndex}`}>
                      <td className="career">
                        <S.TextInput
                          type="text"
                          value={career.workplace || ''}
                          onChange={(e) => {
                            setCareWorkerCareers((careers) =>
                              careers.map((c, i) => {
                                if (i !== careerIndex) return c;
                                return {
                                  ...careers[i],
                                  workplace: e.target.value,
                                };
                              })
                            );
                          }}
                        />
                      </td>
                      <td className="career">
                        <S.TextInput
                          type="text"
                          value={career.duration || ''}
                          onChange={(e) => {
                            setCareWorkerCareers((careers) =>
                              careers.map((c, i) => {
                                if (i !== careerIndex) return c;
                                return {
                                  ...careers[i],
                                  duration: e.target.value,
                                };
                              })
                            );
                          }}
                          long
                        />
                      </td>
                      <td className="career">
                        <S.TextInput
                          type="text"
                          value={career.memo || ''}
                          onChange={(e) => {
                            setCareWorkerCareers((careers) =>
                              careers.map((c, i) => {
                                if (i !== careerIndex) return c;
                                return {
                                  ...careers[i],
                                  memo: e.target.value,
                                };
                              })
                            );
                          }}
                          long
                        />
                      </td>
                      <td className="career right">
                        <S.PlusMinusButtonContainer>
                          <S.PlusMinusButton
                            hide={careWorkerCareers.length - 1 !== careerIndex}
                            disabled={careWorkerCareers.length - 1 !== careerIndex}
                            onClick={() => {
                              setCareWorkerCareers([
                                ...careWorkerCareers,
                                Career.noArgsConstructor(),
                              ]);
                            }}
                          >
                            <PlusIconSVG />
                          </S.PlusMinusButton>
                          <S.XGap />
                          <S.PlusMinusButton
                            onClick={() => {
                              if (careWorkerCareers.length === 1) {
                                setCareWorkerCareers([
                                  ...careWorkerCareers,
                                  Career.noArgsConstructor(),
                                ]);
                              }
                              setCareWorkerCareers((careers) =>
                                careers.filter((_item, i) => i !== careerIndex)
                              );
                            }}
                          >
                            <MinusIconSVG />
                          </S.PlusMinusButton>
                        </S.PlusMinusButtonContainer>
                      </td>
                    </tr>
                  );
                })}
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
      </S.CareGiverEdit>
    </>
  );
}
