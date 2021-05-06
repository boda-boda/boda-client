import React, { useCallback, useEffect, useState } from 'react';
import * as S from './styles';
import { CAPABILITY } from '../../constant';
import axios from 'axios';
import { useCareCenter } from '../../context/care-center';
import CloseIconSVG from '../../svgs/close-icon-svg';
import Recipient from '../../model/recipient';
import PhoneNumberIconSVG from '../../svgs/phone-number-icon-svg';
import CareInfoIconSVG from '../../svgs/care-info-icon-svg';
import { useRouter } from 'next/router';
import EtcSVG from '../../svgs/etc-svg';
import LocationIconSVG from '../../svgs/location-icom-svg';
import CreateMatchingProposalReqeust from './model/create-matching-proposal-request';
import { validateMatchingProposal } from '../../common/lib/validate';
import { route } from 'next/dist/next-server/server/router';

interface MatchingProposalProps {
  isFilled: boolean;
}

const getInfoItemsEtc = (infoList: any[]) => {
  const wordLimit = 16;
  const itemLimit = 7;
  const LENGTH = infoList.reduce((sum, item) => sum + item.key.length, 0);
  if (LENGTH <= wordLimit)
    return infoList
      ?.filter((meta) => meta.type === CAPABILITY)
      .map((meta, index) => {
        return <S.InfoItem key={`careInfoItem-${index}`}>{meta.key}</S.InfoItem>;
      });
  else
    return (
      <>
        {infoList
          ?.slice(0, itemLimit)
          .filter((meta) => meta.type === CAPABILITY)
          .map((meta, index) => {
            return <S.InfoItem key={`careInfoItem-${index}`}>{meta.key}</S.InfoItem>;
          })}
        <EtcSVG />
      </>
    );
};

export default function MatchingProposalNew({ isFilled }: MatchingProposalProps) {
  const careCenter = useCareCenter();

  const router = useRouter();

  const [recipient, setRecipient] = useState(new Recipient());
  const [recipients, setRecipients] = useState([] as Recipient[]);
  const [matchingProposal, setMatchingProposal] = useState(new CreateMatchingProposalReqeust());

  const updateMatchingProposal = useCallback(
    (meta: keyof CreateMatchingProposalReqeust) => (e: any) => {
      setMatchingProposal({
        ...matchingProposal,
        [meta]: e.target.value,
      });
    },
    [matchingProposal]
  );

  const updateHourlyWage = useCallback(
    (e: any) => {
      setMatchingProposal({
        ...matchingProposal,
        hourlyWage: parseInt(e.target.value),
      });
    },
    [matchingProposal]
  );

  const [isLoadModalOn, setIsLoadModalOn] = useState(false);

  useEffect(() => {
    if (careCenter.isValidating || !careCenter.isLoggedIn) return;

    (async () => {
      try {
        const response = await axios.get('/recipient');
        setRecipients(response.data);
      } catch (e) {}
    })();
  }, [careCenter]);

  useEffect(() => {
    if (careCenter.isValidating || !careCenter.isLoggedIn) return;

    if (!router.query.ID) {
      router.push('/search');
      return;
    }

    setMatchingProposal({
      ...matchingProposal,
      outerCareWorkerId: router.query.ID.toString(),
    });
  }, [careCenter, router]);

  const onClickRecipient = useCallback(
    (recipient: Recipient) => () => {
      setRecipient(recipient);
      setMatchingProposal({
        ...matchingProposal,
        recipientId: recipient.id,
      }),
        setIsLoadModalOn(false);
    },
    [recipients, matchingProposal]
  );

  const handleCreateMatchingProposal = useCallback(async () => {
    if (!validateMatchingProposal(matchingProposal)) return;

    try {
      const response = await axios.post('/matching-proposal', matchingProposal);
    } catch (e) {
      return;
    }

    alert('매칭 제안서가 발송되었습니다.');
    router.push('/proposal-list');
    return;
  }, [matchingProposal]);

  return (
    <>
      <S.MatchingProposalContent>
        <S.InnerContent>
          <S.Section>
            <S.SectionTitleContainer>
              <S.SectionTitle>수급자 정보</S.SectionTitle>
              <S.CenterInfoUpdateButton
                onClick={() => {
                  setIsLoadModalOn(true);
                }}
              >
                불러오기
              </S.CenterInfoUpdateButton>
            </S.SectionTitleContainer>
            {!recipient.name && (
              <S.NeedLoad
                onClick={() => {
                  setIsLoadModalOn(true);
                }}
              >
                <S.NeedLoadModal>수급자 정보는 불러오기를 통해 입력할 수 있습니다.</S.NeedLoadModal>
              </S.NeedLoad>
            )}
            <S.Table>
              <tbody>
                <tr>
                  <td rowSpan={8} className="profile">
                    <S.ProfileImageContainer>
                      <S.ProfileImage src={recipient.profile} />
                    </S.ProfileImageContainer>
                  </td>
                  <th>이름</th>
                  <td className="infovalue">{recipient.name}</td>
                  <th>성별</th>
                  <td className="infovalue">
                    {recipient.isFemale ? '여' : ''}
                    {recipient.isFemale === false ? '남' : ''}
                  </td>
                </tr>
                <tr>
                  <th>나이</th>
                  <td className="infovalue">
                    {recipient.age}
                    {recipient.age && '세'}
                  </td>
                  <th>등급</th>
                  <td className="infovalue">
                    {recipient.grade}
                    {recipient.grade && '등급'}
                  </td>
                </tr>
                <tr>
                  <th>거주 형태</th>
                  <td>{recipient.familyType}</td>
                  <th>종교</th>
                  <td>{recipient.religion}</td>
                </tr>
                <tr>
                  <th>돌봄 시간</th>
                  <td colSpan={3}>{recipient.serviceTime}</td>
                </tr>
                <tr>
                  <th>주소</th>
                  <td colSpan={3}>
                    {recipient.address} {recipient.detailAddress}
                  </td>
                </tr>
                <tr>
                  <th>요구 사항</th>
                  <td colSpan={3} className="personality">
                    <S.AvailabilityInfoList>
                      {recipient.recipientMetas &&
                        recipient.recipientMetas
                          .filter((meta) => meta.type === CAPABILITY)
                          .map((meta, i) => (
                            <S.AvailabilityInfoItem key={`${CAPABILITY}-${i}`}>
                              {meta.key}
                            </S.AvailabilityInfoItem>
                          ))}
                    </S.AvailabilityInfoList>
                  </td>
                </tr>
                <tr>
                  <th>세부 사항</th>
                  <td colSpan={3}>{recipient.description}</td>
                </tr>
              </tbody>
            </S.Table>
          </S.Section>
          <S.Section>
            <S.SectionTitleContainer>
              <S.SectionTitle>기타</S.SectionTitle>
            </S.SectionTitleContainer>
            <S.Table>
              <tbody>
                <tr>
                  <th>시급</th>
                  <td>
                    <S.InfoInput
                      type="number"
                      min={0}
                      value={matchingProposal.hourlyWage}
                      onChange={updateHourlyWage}
                      className="money"
                      placeholder="예시) 11500"
                    ></S.InfoInput>
                    원
                  </td>
                </tr>
                <tr>
                  <th>비고</th>
                  <td>
                    <S.TextArea
                      value={matchingProposal.description}
                      onChange={updateMatchingProposal('description')}
                      placeholder="예시) RFID 태그 꼭 찍어주세요."
                    />
                  </td>
                </tr>
              </tbody>
            </S.Table>
          </S.Section>
          <S.CompleteSection>
            <S.FinishButton onClick={handleCreateMatchingProposal}>
              매칭 제안서 보내기
            </S.FinishButton>
          </S.CompleteSection>
          {isLoadModalOn && (
            <S.LoginModalLayout>
              <S.LoginModal>
                <S.LoginModalTitle>수급자 선택</S.LoginModalTitle>
                <CloseIconSVG
                  style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }}
                  onClick={() => {
                    setIsLoadModalOn(false);
                  }}
                />
                <S.LoginModalInnerContent>
                  {recipients.length === 0 ? (
                    <S.EmptyCardContainer>
                      <S.EmptyCard>현재 관리하고 있는 수급자가 없습니다.</S.EmptyCard>
                    </S.EmptyCardContainer>
                  ) : (
                    <S.CardList>
                      {recipients.map((recipient, idx) => (
                        <S.StyledLink
                          key={`recipient-${idx}`}
                          onClick={onClickRecipient(recipient)}
                        >
                          <S.Card>
                            <S.ProfileImageLoad src={recipient.profile} />
                            <S.InfoContainer>
                              <S.BasicInfo>
                                {recipient.name} ({recipient.age}/{recipient.isFemale ? '여' : '남'}
                                /{recipient.grade}등급)
                              </S.BasicInfo>
                              <S.InfoRow>
                                <S.SVGIconBox>
                                  <LocationIconSVG />
                                </S.SVGIconBox>
                                <S.InfoType>위치</S.InfoType>
                                <S.LocationValue>{recipient.address}</S.LocationValue>
                              </S.InfoRow>
                              <S.InfoRow>
                                <S.SVGIconBox>
                                  <PhoneNumberIconSVG />
                                </S.SVGIconBox>
                                <S.InfoType>휴대전화</S.InfoType>
                                <S.InfoValue>{recipient.phoneNumber}</S.InfoValue>
                              </S.InfoRow>
                              <S.InfoRow>
                                <S.SVGIconBox>
                                  <CareInfoIconSVG />
                                </S.SVGIconBox>
                                <S.InfoType>요구 사항</S.InfoType>
                                <S.InfoItemList>
                                  {getInfoItemsEtc(
                                    recipient.recipientMetas?.filter(
                                      (meta) => meta.type === CAPABILITY
                                    )
                                  )}
                                </S.InfoItemList>
                              </S.InfoRow>
                            </S.InfoContainer>
                          </S.Card>
                        </S.StyledLink>
                      ))}
                    </S.CardList>
                  )}
                </S.LoginModalInnerContent>
              </S.LoginModal>
            </S.LoginModalLayout>
          )}
        </S.InnerContent>
      </S.MatchingProposalContent>
    </>
  );
}
