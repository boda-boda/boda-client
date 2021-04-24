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
import {
  CareWorkerSchedule,
  toggleDayOfCareWorkerSchedule,
} from '../../model/care-worker-schedule';
import { DayType } from '../../common/types/date';
import Link from 'next/link';

interface MatchingProposalProps {
  isFilled?: boolean;
}

export default function MatchingProposalDetail({ isFilled }: MatchingProposalProps) {
  const [isWoman, setIsWoman] = useState(true);
  const [selectedCareInfo, setSelectedCareInfo] = useState([] as string[]);
  const [selectedReligionInfo, setSelectedReligionInfo] = useState([] as string[]);
  const [selectedFamilyType, setSelectedFamilyType] = useState('');
  const [schedules, setSchedules] = useState([CareWorkerSchedule.noArgsConstructor()]);
  const [recipientName, setRecipientName] = useState('');
  const [rerender, setRerender] = useState(false);

  const [memo, setMemo] = useState('');
  const memoRef = useRef<HTMLTextAreaElement>(null);

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
              <S.SectionTitle>수급자 정보</S.SectionTitle>
              <Link href={`/proposal-list`} passHref>
                <S.EditButton>목록 보기</S.EditButton>
              </Link>
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
                  <td className="left">김돌봄</td>
                  <th>성별</th>
                  <td className="right">여자</td>
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
                  <td colSpan={1} className="wide">
                    <S.TdFlexBox>
                      <S.ToggleButton>독거</S.ToggleButton>
                    </S.TdFlexBox>
                  </td>
                  <th>종교</th>
                  <td colSpan={1} className="">
                    <S.TdFlexBox>
                      <S.ToggleButton>무교</S.ToggleButton>
                    </S.TdFlexBox>
                  </td>
                </tr>
                <tr>
                  <th>요구 사항</th>
                  <td colSpan={3} className="overtd">
                    <S.TdFlexBox>
                      {CARE_INFO_LIST.map((careInfo, index) => {
                        return (
                          <S.ToggleButton
                            className="overitems"
                            isSelected={selectedCareInfo.indexOf(careInfo) !== -1}
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
                  <td colSpan={3} className="select wide">
                    대화하는 것을 좋아하셔서 말동무를 많이 해주시면 좋을 것 같습니다. <br></br>
                    치매인지재활 교육은 매일 1시간 30분 씩 진행해주시면 됩니다.
                  </td>
                </tr>
              </tbody>
            </S.InfoTable>
          </S.Section>
          <S.Section>
            <S.SectionTitleContainer>
              <S.SectionTitle>근무 조건</S.SectionTitle>
            </S.SectionTitleContainer>
            <S.InfoTable>
              <tbody>
                <tr>
                  <th>시급</th>
                  <td>11500원</td>
                </tr>
                <tr>
                  <th>비고</th>
                  <td>잘 부탁드립니다.</td>
                </tr>
              </tbody>
            </S.InfoTable>
          </S.Section>
          <S.Section>
            <S.SectionTitleContainer>
              <S.SectionTitle>요양보호사 정보</S.SectionTitle>
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
                  <td className="left">김돌봄</td>
                  <th>성별</th>
                  <td className="right">여자</td>
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
                  <td colSpan={1} className="wide">
                    <S.TdFlexBox>
                      <S.ToggleButton>독거</S.ToggleButton>
                    </S.TdFlexBox>
                  </td>
                  <th>종교</th>
                  <td colSpan={1} className="">
                    <S.TdFlexBox>
                      <S.ToggleButton>무교</S.ToggleButton>
                    </S.TdFlexBox>
                  </td>
                </tr>
                <tr>
                  <th>요구 사항</th>
                  <td colSpan={3} className="overtd">
                    <S.TdFlexBox>
                      {CARE_INFO_LIST.map((careInfo, index) => {
                        return (
                          <S.ToggleButton
                            className="overitems"
                            isSelected={selectedCareInfo.indexOf(careInfo) !== -1}
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
                  <td colSpan={3} className="select wide">
                    대화하는 것을 좋아하셔서 말동무를 많이 해주시면 좋을 것 같습니다. <br></br>
                    치매인지재활 교육은 매일 1시간 30분 씩 진행해주시면 됩니다.
                  </td>
                </tr>
              </tbody>
            </S.InfoTable>
          </S.Section>
          <S.CompleteSection></S.CompleteSection>
        </S.InnerContent>
      </S.MatchingProposalContent>
    </>
  );
}
