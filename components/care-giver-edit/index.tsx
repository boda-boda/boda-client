import React, { useEffect, useRef, useState } from 'react';
import MinusIconSVG from '../../svgs/minus-icon-svg';
import PlusIconSVG from '../../svgs/plus-icon-svg';
import * as S from './styles';
import { dayList, careInfoList, seoulGuDong } from '../../constant';
import ImageDefaultSVG from '../../svgs/image-default-svg';
import { useCareGiverUpsert } from './hooks';
import CareWorkerSchedule from '../../model/care-worker-schedule';
import BusinessArea from '../../model/business-area';
import Career from './model/career';

interface CareGiverEditProps {
  isNew: boolean;
}

const slicedCareInfoList = [];
for (let i = 0; i < careInfoList.length; i += 5)
  slicedCareInfoList.push(careInfoList.slice(i, i + 5));

export default function CareGiveEdit({ isNew }: CareGiverEditProps) {
  const [rerender, setRerender] = useState(false);
  const {
    isRequesting,
    careWorker,
    memo,
    careWorkerCareers,
    memoRef,
    setMemo,
    setCareWorkerCareers,
    careWorkerSchedules,
    careWorkerCapabilities,
    toggleCapability,
    setCareWorkerSchedules,
    toggleDays,
    openAddressModal,
    careWorkerAreas,
    setCareWorkerAreas,
    onChangeImage,
    handleUpdateGender,
    handleUpdateAge,
    handleUpdateCareGiver,
    handleClickUpdateButton,
    handleClickCreateButton,
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
                  <td rowSpan={3} className="profile">
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
                      value={careWorker.name}
                      onChange={handleUpdateCareGiver('name')}
                      type="text"
                    />
                  </td>
                  <th>나이</th>
                  <td className="infovalue">
                    <S.TextInput value={careWorker.age} onChange={handleUpdateAge} type="text" />
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
                  <th>연락처</th>
                  <td className="infovalue">
                    <S.TextInput
                      value={careWorker.phoneNumber}
                      onChange={handleUpdateCareGiver('phoneNumber')}
                      type="text"
                    />
                  </td>
                </tr>
                <tr>
                  <th>지역</th>
                  <td colSpan={3}>
                    <S.TextInput
                      type="text"
                      value={careWorker.address}
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
                        <option value={''}>시/도 선택</option>
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
                        <option value={''} hidden>
                          구 선택
                        </option>
                        {businessArea.city === '서울특별시'
                          ? seoulGuDong.map((gudong, idx) => (
                              <option key={`${gudong.gu}-${idx}`} value={gudong.gu}>
                                {gudong.gu}
                              </option>
                            ))
                          : null}
                      </S.DropDown>
                      <S.DropDown
                        onChange={(e) => {
                          businessArea.dong = e.target.value;
                          setRerender(!rerender);
                        }}
                        value={businessArea.dong || ''}
                      >
                        <option value={''}>동 선택</option>
                        {!businessArea.gu
                          ? null
                          : seoulGuDong
                              .find((gudong) => gudong.gu === businessArea.gu)
                              ?.dongs.map((dong, idx) => (
                                <option key={`${dong}-${idx}`} value={dong}>
                                  {dong}
                                </option>
                              ))}
                      </S.DropDown>
                    </td>
                    <td>
                      {careWorkerAreas.length - 1 === businessAreaIndex ? (
                        <S.AddButton
                          onClick={() => {
                            setCareWorkerAreas([
                              ...careWorkerAreas,
                              BusinessArea.noArgsConstructor(),
                            ]);
                          }}
                        >
                          <PlusIconSVG />
                        </S.AddButton>
                      ) : (
                        <S.AddButton
                          onClick={() =>
                            setCareWorkerAreas((businessAreas) =>
                              businessAreas.filter((_, i) => i !== businessAreaIndex)
                            )
                          }
                        >
                          <MinusIconSVG />
                        </S.AddButton>
                      )}
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
                      ref={memoRef}
                      value={memo}
                      onChange={(e) => {
                        setMemo(e.target.value);
                        handleUpdateCareGiver('description')(e);
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
                {slicedCareInfoList.map((slicedCareInfo, row) => {
                  return (
                    <tr key={`${row}`}>
                      {slicedCareInfo.map((careInfo, index) => {
                        return (
                          <td className={`available ${index === 4 && 'right'}`} key={`${index}`}>
                            {careInfo}
                            <S.CheckBox
                              type="checkbox"
                              checked={careWorkerCapabilities.includes(careInfo)}
                              onChange={() => toggleCapability(careInfo)}
                            />
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
            <S.SectionTitle>요양보호사 스케줄</S.SectionTitle>
            <S.Table>
              <tbody>
                <tr>
                  <td style={{ padding: 0 }}>
                    {careWorkerSchedules.map((schedule, scheduleIndex) => {
                      return (
                        <S.TimeSelectContainer
                          isLast={careWorkerSchedules.length - 1 === scheduleIndex}
                          key={`timeselectcontainer-${scheduleIndex}`}
                        >
                          <S.TdFlexBox>
                            {dayList.map((day) => {
                              return (
                                <S.ToggleButton
                                  isSelected={schedule.isDayIncluded(day)}
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
                                maxLength={2}
                                value={schedule.startHour ? schedule.startHour : 0}
                                onChange={(e) => {
                                  const currentHour = e.target.value.replace(/[^0-9]/g, '');
                                  schedule.startHour = parseInt(currentHour);
                                  if (schedule.startHour >= 24) schedule.startHour = 23;
                                  setRerender(!rerender);
                                }}
                              />
                              시
                              <S.ClockInput
                                type="text"
                                maxLength={2}
                                value={schedule.startMinute ? schedule.startMinute : 0}
                                onChange={(e) => {
                                  const currentMinute = e.target.value.replace(/[^0-9]/g, '');
                                  schedule.startMinute = parseInt(currentMinute);
                                  if (schedule.startMinute >= 60) schedule.startMinute = 59;
                                  setRerender(!rerender);
                                }}
                              />
                              분
                            </S.ClockSelectContainer>
                            부터
                            <S.ClockSelectContainer>
                              <S.ClockInput
                                type="text"
                                maxLength={2}
                                value={schedule.endHour ? schedule.endHour : 0}
                                onChange={(e) => {
                                  const currentHour = e.target.value.replace(/[^0-9]/g, '');
                                  schedule.endHour = parseInt(currentHour);
                                  if (schedule.endHour >= 24) schedule.endHour = 23;
                                  setRerender(!rerender);
                                }}
                              />
                              시
                              <S.ClockInput
                                type="text"
                                maxLength={2}
                                value={schedule.endMinute ? schedule.endMinute : 0}
                                onChange={(e) => {
                                  const currentMinute = e.target.value.replace(/[^0-9]/g, '');
                                  schedule.endMinute = parseInt(currentMinute);
                                  if (schedule.endMinute >= 60) schedule.endMinute = 59;
                                  setRerender(!rerender);
                                }}
                              />
                              분
                            </S.ClockSelectContainer>
                            까지
                          </S.TdFlexBox>

                          {careWorkerSchedules.length - 1 === scheduleIndex ? (
                            <S.AddButton
                              onClick={() => {
                                setCareWorkerSchedules([
                                  ...careWorkerSchedules,
                                  CareWorkerSchedule.noArgsConstructor(),
                                ]);
                              }}
                            >
                              <PlusIconSVG />
                            </S.AddButton>
                          ) : (
                            <S.AddButton
                              onClick={() => {
                                setCareWorkerSchedules((schedules) =>
                                  schedules.filter((_, i) => i !== scheduleIndex)
                                );
                                setRerender(!rerender);
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
              </tbody>
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
                {careWorkerCareers.map((career, careerIndex) => {
                  return (
                    <tr key={`career-row-${careerIndex}`}>
                      <td className="career long">
                        <S.TextInput
                          type="text"
                          value={career.workplace}
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
                          long
                        />
                      </td>
                      <td className="career">
                        <S.TextInput
                          type="text"
                          value={career.recipient}
                          onChange={(e) => {
                            setCareWorkerCareers((careers) =>
                              careers.map((c, i) => {
                                if (i !== careerIndex) return c;
                                return {
                                  ...careers[i],
                                  recipient: e.target.value,
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
                          value={career.duration}
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
                      <td className="career right">
                        {careWorkerCareers.length - 1 === careerIndex ? (
                          <S.AddButton
                            onClick={() => {
                              setCareWorkerCareers([
                                ...careWorkerCareers,
                                Career.noArgsConstructor(),
                              ]);
                            }}
                          >
                            <PlusIconSVG />
                          </S.AddButton>
                        ) : (
                          <S.AddButton
                            onClick={() => {
                              setCareWorkerCareers((careers) =>
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
