import React, { useEffect, useRef, useState } from 'react';
import * as S from './styles';
import { CAPABILITY } from '../../constant';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCareCenter } from '../../context/care-center';
import axios from 'axios';
import MatchingProposalDetailRequest from './model/matching-proposal-detail-request';
import Recipient from '../../model/recipient';

interface MatchingProposalProps {
  isFilled?: boolean;
}

export default function MatchingProposalDetail({ isFilled }: MatchingProposalProps) {
  const router = useRouter();
  const careCenter = useCareCenter();

  const [careWorker, setCareWorker] = useState({} as any);
  const [recipient, setRecipient] = useState(new Recipient());

  const [memo, setMemo] = useState('');
  const memoRef = useRef<HTMLTextAreaElement>(null);
  const [matchingProposal, setMatchingProposal] = useState(
    MatchingProposalDetailRequest.noArgsConstructor()
  );

  useEffect(() => {
    if (!memoRef.current) return;
    memoRef.current!.style.height = 'auto';
    memoRef.current!.style.height = (memoRef.current!.scrollHeight + 10).toString() + 'px';
  }, [memo]);

  useEffect(() => {
    if (!router.query.ID || !careCenter || careCenter.isValidating || !careCenter.isLoggedIn) {
      return;
    }

    (async () => {
      const response = await axios.get(`/matching-proposal/${router.query.ID}`);
      setMatchingProposal(response.data);
    })();
  }, [router, careCenter]);

  useEffect(() => {
    if (!router.query.ID || !careCenter || careCenter.isValidating || !careCenter.isLoggedIn) {
      return;
    }
    matchingProposal.outerCareWorker.id
      ? (async () => {
          const response = matchingProposal.outerCareWorker
            ? await axios.get(`/outer-care-worker/${matchingProposal.outerCareWorker.id}`)
            : ({} as any);
          setCareWorker(response.data);
        })()
      : null;
  }, [router, careCenter, matchingProposal]);

  useEffect(() => {
    if (!router.query.ID || !careCenter || careCenter.isValidating || !careCenter.isLoggedIn) {
      return;
    }
    matchingProposal.recipient.id
      ? (async () => {
          const response = await axios.get(`/recipient/${matchingProposal.recipient.id}`);
          setRecipient(response.data);
        })()
      : null;
  }, [router, careCenter, matchingProposal]);

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
          <S.Section>
            <S.SectionTitleContainer>
              <S.SectionTitle>요양보호사 정보</S.SectionTitle>
            </S.SectionTitleContainer>
            <S.InfoTable>
              <tbody>
                <tr>
                  <td rowSpan={9} className="recipientProfile">
                    <S.ProfileImageContainer>
                      <S.ProfileImage src={careWorker.profile} />
                    </S.ProfileImageContainer>
                  </td>
                  <th>이름</th>
                  <td className="left">{careWorker.name}</td>
                  <th>성별</th>
                  <td className="right">{careWorker.gender}</td>
                </tr>
                <tr>
                  <th>생년월일</th>
                  <td className="select left">
                    {careWorker.birthDay} ({careWorker.age})세
                  </td>
                  <th>휴대전화</th>
                  <td className="right">{careWorker.phoneNumber}</td>
                </tr>
                <tr>
                  <th>돌봄 시간</th>
                  <td className="right">{careWorker.schedule}</td>
                  <th>종교</th>
                  <td colSpan={1} className="">
                    {careWorker.religion}
                  </td>
                </tr>
                <tr>
                  <th>자격증 취득일</th>
                  <td className="right">{careWorker.licenseDate}</td>
                </tr>
                <tr>
                  <th rowSpan={1}>활동 지역</th>
                  <td colSpan={3} className="overtd">
                    <S.TdFlexBox>
                      {careWorker.outerCareWorkerAreas
                        ? careWorker.outerCareWorkerAreas.map((area, index) => {
                            return (
                              <S.ToggleButton
                                className="overitems"
                                key={`careInfoListItem-${index}`}
                              >
                                {`${area.city} ${area.gu} ${area.dong}`}
                              </S.ToggleButton>
                            );
                          })
                        : ''}
                    </S.TdFlexBox>
                  </td>
                </tr>
                <tr>
                  <th>가능 조건</th>
                  <td colSpan={3} className="overtd">
                    <S.TdFlexBox>
                      {careWorker.outerCareWorkerMetas
                        ? careWorker.outerCareWorkerMetas.map((meta, index) => {
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
                  <th>메모</th>
                  <td colSpan={3} className="select wide">
                    {careWorker.description}
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
