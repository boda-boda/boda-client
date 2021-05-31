import React, { useEffect, useRef, useState } from 'react';
import * as S from './styles';
import { CAPABILITY, MATCHING_PROPOSAL_STATUS, RELIGION } from '../../constant';
import MatchingProposalDetailRequest from './model/matching-proposal-detail-request';
import axios from 'axios';
import { useRouter } from 'next/router';
import Recipient from '../../model/recipient';

interface MatchingProposalProps {
  isFilled: boolean;
}

export default function MatchingProposalRecieve({ isFilled }: MatchingProposalProps) {
  const router = useRouter();
  const [selectedCareInfo, setSelectedCareInfo] = useState([] as string[]);
  const [matchingProposal, setMatchingProposal] = useState(
    MatchingProposalDetailRequest.noArgsConstructor()
  );
  const [recipient, setRecipient] = useState(new Recipient());
  const [memo, setMemo] = useState('');
  const memoRef = useRef<HTMLTextAreaElement>(null);

  const handleClickAcceptButton = async () => {
    if (!window.confirm('수락 하시겠습니까?')) return;

    try {
      await axios.put(`/matching-proposal/${router.query.ID}`, {
        id: router.query.ID,
        status: 'ACCEPTED',
      });
    } catch (e) {
      alert('수락 실패 하였습니다. 문자로 [수락] 또는 [거절]을 입력하여 회신 부탁드립니다.');
      return;
    }

    alert('수락하였습니다.');
  };

  const handleClickDeclineButton = async () => {
    if (!window.confirm('거절 하시겠습니까?')) return;

    try {
      await axios.put(`/matching-proposal/${router.query.ID}`, {
        id: router.query.ID,
        status: 'DECLINED',
      });
    } catch (e) {
      alert('거절 실패 하였습니다. 문자로 [수락] 또는 [거절]을 입력하여 회신 부탁드립니다.');
      return;
    }
    alert('거절하였습니다.');
  };

  useEffect(() => {
    if (!memoRef.current) return;
    memoRef.current!.style.height = 'auto';
    memoRef.current!.style.height = (memoRef.current!.scrollHeight + 10).toString() + 'px';
  }, [memo]);

  useEffect(() => {
    if (!router.query.ID) {
      return;
    }
    try {
      (async () => {
        const response = await axios.get(`/matching-proposal/recieve/${router.query.ID}`);
        setMatchingProposal(response.data);
      })();
    } catch (e) {
      throw e;
    }
  }, [router]);

  useEffect(() => {
    if (!router.query.ID) {
      return;
    }
    matchingProposal.recipient.id
      ? (async () => {
          const response = await axios.get(
            `/recipient/matching-proposal-recieve/${matchingProposal.recipient.id}`
          );
          setRecipient(response.data);
        })()
      : null;
  }, [router, matchingProposal]);

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
                      <S.ProfileImage src={recipient.profile} />
                    </S.ProfileImageContainer>
                  </td>
                  <th>이름</th>
                  <td className="left">{recipient.name}</td>
                  <th>성별</th>
                  <td className="right">{recipient.isFemale ? '여자' : '남자'}</td>
                </tr>
                <tr>
                  <th>나이</th>
                  <td className="right">{recipient.age}세</td>
                  <th>등급</th>
                  <td className="select left">{recipient.grade}등급</td>
                </tr>
                <tr>
                  <th>돌봄 시간</th>
                  <td colSpan={1} className="wide">
                    {recipient.schedule}
                  </td>
                  <th>종교</th>
                  <td colSpan={1} className="">
                    {recipient.religion}
                  </td>
                </tr>
                <tr>
                  <th>거주 형태</th>
                  <td colSpan={1} className="wide">
                    {recipient.familyType}
                  </td>
                  <th>휴대전화</th>
                  <td colSpan={1} className="wide">
                    {recipient.phoneNumber}
                  </td>
                </tr>
                <tr>
                  <th rowSpan={1}>주소</th>
                  <td colSpan={3}>
                    ({recipient.zipCode}) {recipient.address} {recipient.detailAddress}
                  </td>
                </tr>
                <tr>
                  <th>요구 사항</th>
                  <td colSpan={3} className="overtd">
                    <S.TdFlexBox>
                      {recipient.recipientMetas
                        ? recipient.recipientMetas
                            .filter((meta) => meta.type === CAPABILITY)
                            .map((meta, index) => {
                              return (
                                <S.ToggleButton
                                  className="overitems"
                                  key={`careInfoListItem-${index}`}
                                >
                                  {meta.key}
                                </S.ToggleButton>
                              );
                            })
                        : ''}
                    </S.TdFlexBox>
                  </td>
                </tr>
                <tr>
                  <th>세부 사항</th>
                  <td colSpan={3} className="select wide">
                    {recipient.description}
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
                  <td>{matchingProposal.hourlyWage}원</td>
                </tr>
                <tr>
                  <th>비고</th>
                  <td>{matchingProposal.description}</td>
                </tr>
              </tbody>
            </S.InfoTable>
          </S.Section>
          <S.CompleteSection>
            <S.EditButton onClick={handleClickAcceptButton}>수락 하기</S.EditButton>
            <S.DeleteButton onClick={handleClickDeclineButton}>거절 하기</S.DeleteButton>
          </S.CompleteSection>
        </S.InnerContent>
      </S.MatchingProposalContent>
    </>
  );
}
