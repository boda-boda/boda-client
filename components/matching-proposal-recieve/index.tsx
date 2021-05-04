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
  MATCHING_PROPOSAL_STATUS,
  NURSING_GRADE,
  RELIGION,
  RELIGION_LIST,
  WORKER_MAN_SMALL_IMAGE_URL,
} from '../../constant';
import {
  CareWorkerSchedule,
  toggleDayOfCareWorkerSchedule,
} from '../../model/care-worker-schedule';
import { DayType } from '../../common/types/date';

interface MatchingProposalProps {
  isFilled: boolean;
}

const proposal = {
  id: '0',
  status: MATCHING_PROPOSAL_STATUS[0],
  pay: '11500',
  memo: 'RFID 태그 꼭 사용 부탁드립니다.',
  recipient: {
    zipCode: '08018',
    address: '서울시 양천구 신정7동 목동남로4길 81',
    detailAddress: '101호',
    age: 99,
    birthDay: '1922-08-21',
    schedule: '월 화 수 목 금 9:00 - 12:00',
    recipientMetas: [
      { type: CAPABILITY, key: '휠체어어', value: '' },
      { type: CAPABILITY, key: '휠체어어', value: '' },
      { type: CAPABILITY, key: '휠체어어', value: '' },
      { type: CAPABILITY, key: '휠체어어', value: '' },
      { type: CAPABILITY, key: '치매자격증', value: '' },
      { type: RELIGION, key: '무교', value: '' },
    ],
    familyType: '독거',
    description:
      '대화하는 것을 좋아하셔서 말동무를 많이 해주시면 좋을 것 같습니다. 치매인지재활 교육은 매일 1시간 30분 씩 진행해주시면 됩니다.',
    grade: 3,
    gender: '여',
    id: 'asdf',
    name: '김수급',
    profile:
      'https://dolbom.s3.amazonaws.com/newFiles/2ce24d59-59b8-4109-b5f3-6ad26ac55170_%E1%84%89%E1%85%AE%E1%84%80%E1%85%B3%E1%86%B8%E1%84%8C%E1%85%A1.png',
    residenceType: '독거',
  },
  caregiver: {
    zipCode: '08018',
    address: '서울시 양천구 신정7동',
    detailAddress: '목동남로4길 81',
    age: 60,
    birthDay: '1962-08-21',
    availableTime: '오전',
    schedule: '월 화 수 목 금 9:00 - 12:00',
    caregiverMetas: [
      { type: CAPABILITY, key: '휠체어', value: '' },
      { type: CAPABILITY, key: '휠체어', value: '' },
      { type: CAPABILITY, key: '휠체어', value: '' },
      { type: CAPABILITY, key: '휠체어', value: '' },
      { type: CAPABILITY, key: '휠체어', value: '' },
      { type: CAPABILITY, key: '휠체어', value: '' },
      { type: CAPABILITY, key: '휠체어', value: '' },
      { type: CAPABILITY, key: '휠체어', value: '' },
      { type: CAPABILITY, key: '휠체어', value: '' },
      { type: CAPABILITY, key: '휠체어', value: '' },
      { type: CAPABILITY, key: '휠체어', value: '' },
      { type: RELIGION, key: '무교', value: '' },
    ],
    workArea: ['서대문구'],
    description:
      '약속을 잘 지키시며, 꼼꼼한 성격이시다. 말씀하시는 것을 좋아하셔서 대화를 잘 하신다.',
    grade: 3,
    gender: '여',
    id: 'asdf',
    name: '요XX',
    phoneNumber: '010-7105-2344',
    profile:
      'https://dolbom.s3.ap-northeast-2.amazonaws.com/newFiles/15976dbd-3149-4331-a09d-58d9853668be_%E1%84%8B%E1%85%AD%E1%84%8B%E1%85%A3%E1%86%BC%E1%84%87%E1%85%A9%E1%84%92%E1%85%A9%E1%84%89%E1%85%A1_%E1%84%8B%E1%85%AD%E1%84%8B%E1%85%A3%E1%86%BC%E1%84%87%E1%85%A9%E1%84%92%E1%85%A9%E1%84%89%E1%85%A1.jpg',
    residenceType: '독거',
  },
};

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
                    {proposal.recipient.name ? proposal.recipient.name[0] : ''}
                    {proposal.recipient.name ? 'XX' : ''}
                  </td>
                  <th>성별</th>
                  <td className="right">{proposal.recipient.gender}자</td>
                </tr>
                <tr>
                  <th>등급</th>
                  <td className="select left">{proposal.recipient.grade}등급</td>
                  <th>나이</th>
                  <td className="right">{proposal.recipient.age}</td>
                </tr>
                <tr>
                  <th>돌봄 시간</th>
                  <td colSpan={3}>{proposal.recipient.schedule}</td>
                </tr>
                <tr>
                  <th rowSpan={1}>주소</th>
                  <td colSpan={3}>
                    ({proposal.recipient.zipCode}) {proposal.recipient.address}{' '}
                  </td>
                </tr>
                <tr>
                  <th>거주 형태</th>
                  <td colSpan={1} className="wide">
                    <S.TdFlexBox>
                      <S.ToggleButton>{proposal.recipient.familyType}</S.ToggleButton>
                    </S.TdFlexBox>
                  </td>
                  <th>종교</th>
                  <td colSpan={1} className="">
                    <S.TdFlexBox>
                      {proposal.recipient.recipientMetas
                        .filter((meta) => meta.type === RELIGION)
                        .map((religion, index) => {
                          return (
                            <S.ToggleButton key={`religion-${index}`}>
                              {religion.key}
                            </S.ToggleButton>
                          );
                        })}
                    </S.TdFlexBox>
                  </td>
                </tr>
                <tr>
                  <th>요구 사항</th>
                  <td colSpan={3} className="overtd">
                    <S.TdFlexBox>
                      {proposal.recipient.recipientMetas
                        .filter((meta) => meta.type === CAPABILITY)
                        .map((meta, index) => {
                          return (
                            <S.ToggleButton
                              className="overitems"
                              isSelected={selectedCareInfo.indexOf(meta.key) !== -1}
                              key={`careInfoListItem-${index}`}
                            >
                              {meta.key}
                            </S.ToggleButton>
                          );
                        })}
                    </S.TdFlexBox>
                  </td>
                </tr>
                <tr>
                  <th>세부 사항</th>
                  <td colSpan={3} className="select wide">
                    {proposal.recipient.description}
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
                  <td>{proposal.pay}원</td>
                </tr>
                <tr>
                  <th>비고</th>
                  <td>{proposal.memo}</td>
                </tr>
              </tbody>
            </S.InfoTable>
          </S.Section>
          <S.CompleteSection>
            <S.EditButton>수락 하기</S.EditButton>
            <S.DeleteButton>거절 하기</S.DeleteButton>
          </S.CompleteSection>
        </S.InnerContent>
      </S.MatchingProposalContent>
    </>
  );
}
