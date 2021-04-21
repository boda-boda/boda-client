import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ButtonSize, ButtonType } from '../../common/types';
import MinusIconSVG from '../../svgs/minus-icon-svg';
import PlusIconSVG from '../../svgs/plus-icon-svg';
import DefaultButtonContainter from '../default-button';
import * as S from './styles';
import {
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

interface MatchingProposalProps {
  isFilled: boolean;
}

export default function MatchingProposalRecieve({ isFilled }: MatchingProposalProps) {
  const [isWoman, setIsWoman] = useState(true);
  const [selectedCareInfo, setSelectedCareInfo] = useState([] as string[]);
  const [selectedReligionInfo, setSelectedReligionInfo] = useState([] as string[]);
  const [selectedFamilyType, setSelectedFamilyType] = useState('');
  const [schedules, setSchedules] = useState([CareWorkerSchedule.noArgsConstructor()]);
  const [recipientName, setRecipientName] = useState('');
  const [rerender, setRerender] = useState(false);

  const [memo, setMemo] = useState('');
  const memoRef = useRef<HTMLTextAreaElement>(null);
  const { careCenter } = useCareCenter();

  const [centerName, setCenterName] = useState('');
  const [centerPhonenumber, setCenterPhonenumber] = useState('');
  const [centerEmail, setCenterEmail] = useState('');
  const [centerHomepage, setCenterHomepage] = useState('');
  const [centerAddress, setCenterAddress] = useState('');
  const [centerMemo, setCenterMemo] = useState('');

  const toggleDays = (selectedDaysIndex: number, day: DayType) => {
    const newSchedules = [...schedules];
    toggleDayOfCareWorkerSchedule(newSchedules[selectedDaysIndex], day);
    setSchedules(newSchedules);
  };

  useEffect(() => {
    if (!memoRef.current) return;
    memoRef.current!.style.height = 'auto';
    memoRef.current!.style.height = (memoRef.current!.scrollHeight + 10).toString() + 'px';
  }, [memo]);

  return (
    <>
      <S.MatchingProposalContent>
        <S.InnerContent>
          <S.Section>
            <S.SectionTitleContainer>
              <S.SectionTitle>센터 정보</S.SectionTitle>
            </S.SectionTitleContainer>
            <S.InfoTable>
              <tbody>
                <tr>
                  <td rowSpan={5} className="profile">
                    <S.ProfileImageContainer>
                      <label htmlFor="profile">
                        <S.ProfileImage src={careCenter?.profile}></S.ProfileImage>
                      </label>
                    </S.ProfileImageContainer>
                  </td>
                  <th className="">이름</th>
                  <td className="infovalue">{careCenter?.username}</td>
                  <th>전화</th>
                  <td className="infovalue">{careCenter?.phoneNumber}</td>
                </tr>
                <tr>
                  <th>이메일</th>
                  <td className="infovalue">{careCenter?.email}</td>
                  <th>홈페이지</th>
                  <td className="infovalue">{careCenter?.homePage}</td>
                </tr>
                <tr>
                  <th rowSpan={1}>주소</th>
                  <td colSpan={3}>
                    {careCenter?.zipCode && `(${careCenter.zipCode})`} {careCenter?.address}{' '}
                    {careCenter?.detailAddress}
                  </td>
                </tr>
                <tr>
                  <th>센터 소개</th>
                  <td colSpan={3}>{careCenter?.description}</td>
                </tr>
              </tbody>
            </S.InfoTable>
          </S.Section>
          <S.Section>
            <S.SectionTitleContainer>
              <S.SectionTitle>수급자 정보</S.SectionTitle>
            </S.SectionTitleContainer>
            <S.InfoTable>
              <tbody>
                <tr>
                  <td rowSpan={9} className="recipientProfile">
                    <S.ProfileImageContainer>
                      <S.ProfileImage src="https://dolbom.s3.ap-northeast-2.amazonaws.com/newFiles/be66c11c-4065-4f67-b44d-9548b349384d_%EC%88%98%EA%B8%89%EC%9E%90%EC%9D%B4%EB%AF%B8%EC%A7%80.png" />
                    </S.ProfileImageContainer>
                  </td>
                  <th>이름</th>
                  <td className="left">칼 프레드릭슨</td>
                  <th>성별</th>
                  <td className="select right">남자</td>
                </tr>
                <tr>
                  <th>등급</th>
                  <td className="select left">5등급</td>
                  <th>나이</th>
                  <td className="right">99세</td>
                </tr>
                <tr>
                  <th>돌봄 시간</th>
                  <td colSpan={3}>월 화 수 목 금 9:00 - 12:00</td>
                </tr>
                <tr>
                  <th rowSpan={1}>주소</th>
                  <td colSpan={3}>(63275) 서울특별시 서대문구 통일로 000 000</td>
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
