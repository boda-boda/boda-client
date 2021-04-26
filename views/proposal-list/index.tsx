import * as S from './styles';
import Layout from '../../components/layout';
import Banner from '../../components/banner';
import { BannerStyleType } from '../../common/types';
import Category from '../../components/category';
import Head from 'next/head';
import PhoneNumberIconSVG from '../../svgs/phone-number-icon-svg';
import CareInfoIconSVG from '../../svgs/care-info-icon-svg';
import Link from 'next/link';
import Recipient from '../../model/recipient';
import { CAPABILITY, PAGINATION_LENGTH } from '../../constant';
import { useCallback, useState } from 'react';
import DoubleArrowLeftSVG from '../../svgs/double-arrow-left';
import SingleArrowLeftSVG from '../../svgs/single-arrow-left-svg';
import { range } from '../../common/lib';
import SingleArrowRightSVG from '../../svgs/single-arrow-right-svg';
import DoubleArrowRightSVG from '../../svgs/double-arrow-right';
import EtcSVG from '../../svgs/etc-svg';

const proposals = [
  {
    id: '0',
    recipient: {
      zipCode: '08018',
      address: '서울시 양천구 신정7동 목동남로4길 81',
      detailAddress: '101호',
      age: 99,
      birthDay: '1922-08-21',

      recipientMetas: [
        { type: CAPABILITY, key: '휠체어', value: '' },
        { type: CAPABILITY, key: '휠체어', value: '' },
        { type: CAPABILITY, key: '휠체어', value: '' },
        { type: CAPABILITY, key: '휠체어', value: '' },
        { type: CAPABILITY, key: '치매자격증', value: '' },
      ],
      familyType: '독거',
      description:
        '설명이 이렇게 길면 어쩌지, 설명이 이렇게 길면 어쩌지, 설명이 이렇게 길면 어쩌지, 설명이 이렇게 길면 어쩌지, 설명이 이렇게 길면 어쩌지, 설명이 이렇게 길면 어쩌지, 설명이 이렇게 길면 어쩌지, 설명이 이렇게 길면 어쩌지, 설명이 이렇게 길면 어쩌지, 설명이 이렇게 길면 어쩌지',
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

      recipientMetas: [
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
      ],

      description:
        '설명이 이렇게 길면 어쩌지, 설명이 이렇게 길면 어쩌지, 설명이 이렇게 길면 어쩌지, 설명이 이렇게 길면 어쩌지, 설명이 이렇게 길면 어쩌지, 설명이 이렇게 길면 어쩌지, 설명이 이렇게 길면 어쩌지, 설명이 이렇게 길면 어쩌지, 설명이 이렇게 길면 어쩌지, 설명이 이렇게 길면 어쩌지',
      grade: 3,
      gender: '여',
      id: 'asdf',
      name: '요XX',
      phoneNumber: '010-7105-2344',
      profile:
        'https://dolbom.s3.ap-northeast-2.amazonaws.com/newFiles/15976dbd-3149-4331-a09d-58d9853668be_%E1%84%8B%E1%85%AD%E1%84%8B%E1%85%A3%E1%86%BC%E1%84%87%E1%85%A9%E1%84%92%E1%85%A9%E1%84%89%E1%85%A1_%E1%84%8B%E1%85%AD%E1%84%8B%E1%85%A3%E1%86%BC%E1%84%87%E1%85%A9%E1%84%92%E1%85%A9%E1%84%89%E1%85%A1.jpg',
      residenceType: '독거',
    },
  },
] as any[];

export default function ProposalList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPaginationGroup, setCurrentPaginationGroup] = useState(0);
  const [proposalsPerPage, setProposalsPerPage] = useState(10);
  const indexOfLastProposal = currentPage * proposalsPerPage;
  const indexOfFirstProposal = indexOfLastProposal - proposalsPerPage;
  const currentPageProposals = proposals.slice(indexOfFirstProposal, indexOfLastProposal);
  const maxPageNumber = Math.ceil(proposals.length / proposalsPerPage);

  const getInfoItemsEtc = (infoList: any[]) => {
    if (infoList.length <= 5)
      return infoList
        ?.filter((meta) => meta.type === CAPABILITY)
        .map((meta, index) => {
          return <S.InfoItem key={`careInfoItem-${index}`}>{meta.key}</S.InfoItem>;
        });
    else
      return (
        <>
          {infoList
            ?.slice(0, 5)
            .filter((meta) => meta.type === CAPABILITY)
            .map((meta, index) => {
              return <S.InfoItem key={`careInfoItem-${index}`}>{meta.key}</S.InfoItem>;
            })}
          <EtcSVG />
        </>
      );
  };

  const getPaginationBarNumbers = useCallback(() => {
    return range(
      currentPaginationGroup * PAGINATION_LENGTH + 1,
      Math.min((currentPaginationGroup + 1) * PAGINATION_LENGTH, maxPageNumber)
    );
  }, [currentPaginationGroup, maxPageNumber]);

  return (
    <>
      <Head>
        <title>돌봄: 매칭 제안서 목록</title>
      </Head>
      <Layout>
        <>
          <>
            <Banner
              bannerStyle={BannerStyleType.SECTION}
              sectionIndex={2}
              title="매칭 제안서 목록"
              subtitle="내가 발송한 제안서 목록을 확인할 수 있습니다."
            />
            <Category list={['홈', '나의 센터 정보', '매칭 제안서 목록 ']} />
          </>
          <S.Section isBackgroundColored>
            <S.InnerContent>
              <S.SectionTitle>매칭 제안서 목록</S.SectionTitle>
              <S.EditButton>삭제하기</S.EditButton>
              <S.RecipientsList>
                {proposals.length === 0 ? (
                  <S.CardList>
                    <S.EmptyCardContainer>
                      <S.EmptyCard>현재 관리하고 있는 수급자가 없습니다.</S.EmptyCard>
                    </S.EmptyCardContainer>
                  </S.CardList>
                ) : (
                  <S.CardList>
                    {proposals.map((proposal, idx) => (
                      <S.StyledLink>
                        <Link
                          key={`worker-${idx}`}
                          href={{
                            pathname: '/proposal-list/[id]',
                          }}
                          as={`/proposal-list/${proposal.id}`}
                          passHref
                        >
                          <S.Card>
                            <S.CheckBox
                              type="checkbox"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            />
                            <S.CardInnerContent>
                              <S.CardSection>
                                <S.ProfileImage src={proposal.recipient.profile} />
                                <S.InfoContainer>
                                  <S.BasicInfo>
                                    {proposal.recipient.name} ({proposal.recipient.age}/
                                    {proposal.recipient.gender[0]}/{proposal.recipient.grade}등급)
                                  </S.BasicInfo>
                                  <S.InfoRow>
                                    <S.SVGIconBox>
                                      <PhoneNumberIconSVG />
                                    </S.SVGIconBox>
                                    <S.InfoType>위치</S.InfoType>
                                    <S.InfoValue>{proposal.recipient.address}</S.InfoValue>
                                  </S.InfoRow>

                                  <S.InfoRow>
                                    <S.SVGIconBox>
                                      <PhoneNumberIconSVG />
                                    </S.SVGIconBox>
                                    <S.InfoType>거주 형태</S.InfoType>
                                    <S.InfoValue>{proposal.recipient.familyType}</S.InfoValue>
                                  </S.InfoRow>
                                  <S.InfoRow>
                                    <S.SVGIconBox>
                                      <CareInfoIconSVG />
                                    </S.SVGIconBox>
                                    <S.InfoType>요구 사항</S.InfoType>
                                    <S.InfoItemList>
                                      {getInfoItemsEtc(proposal.recipient.recipientMetas)}
                                    </S.InfoItemList>
                                  </S.InfoRow>
                                  <S.InfoRow>
                                    <S.SVGIconBox>
                                      <PhoneNumberIconSVG />
                                    </S.SVGIconBox>
                                    <S.InfoType>세부 사항</S.InfoType>
                                    <S.MemoValue>{proposal.recipient.description}</S.MemoValue>
                                  </S.InfoRow>
                                </S.InfoContainer>
                              </S.CardSection>
                              <S.CardSectionRight>
                                <S.ProfileImage src={proposal.caregiver.profile} />
                                <S.InfoContainerRight>
                                  <S.BasicInfo>
                                    {proposal.caregiver.name} ({proposal.caregiver.age}/
                                    {proposal.caregiver.gender[0]}/{proposal.caregiver.grade}등급)
                                  </S.BasicInfo>
                                  <S.InfoRow>
                                    <S.SVGIconBox>
                                      <PhoneNumberIconSVG />
                                    </S.SVGIconBox>
                                    <S.InfoType>위치</S.InfoType>
                                    <S.InfoValue>{proposal.caregiver.address}</S.InfoValue>
                                  </S.InfoRow>
                                  <S.InfoRow>
                                    <S.SVGIconBox>
                                      <CareInfoIconSVG />
                                    </S.SVGIconBox>
                                    <S.InfoType>가능 조건</S.InfoType>
                                    <S.InfoItemList>
                                      {getInfoItemsEtc(proposal.caregiver.recipientMetas)}
                                    </S.InfoItemList>
                                  </S.InfoRow>
                                  <S.InfoRow>
                                    <S.SVGIconBox>
                                      <PhoneNumberIconSVG />
                                    </S.SVGIconBox>
                                    <S.InfoType>메모</S.InfoType>
                                    <S.MemoValueRight>
                                      {proposal.caregiver.description}
                                    </S.MemoValueRight>
                                  </S.InfoRow>
                                </S.InfoContainerRight>
                              </S.CardSectionRight>
                            </S.CardInnerContent>
                          </S.Card>
                        </Link>
                      </S.StyledLink>
                    ))}
                    <S.PaginationContainer>
                      <S.PaginationItem
                        isLeft
                        key={'first-page-btn'}
                        onClick={() => {
                          setCurrentPage(1);
                          setCurrentPaginationGroup(0);
                        }}
                      >
                        <DoubleArrowLeftSVG />
                      </S.PaginationItem>
                      <S.PaginationItem
                        key={'previous-pageset-btn'}
                        onClick={() => {
                          const paginationGroup = Math.max(0, currentPaginationGroup - 1);

                          setCurrentPage(Math.max(currentPaginationGroup * PAGINATION_LENGTH, 1));
                          setCurrentPaginationGroup(paginationGroup);
                        }}
                      >
                        <SingleArrowLeftSVG />
                      </S.PaginationItem>
                      {getPaginationBarNumbers().map((pageNumber) => (
                        <S.PaginationItem
                          key={`page-${pageNumber}`}
                          onClick={() => {
                            setCurrentPage(pageNumber as number);
                          }}
                          isClicked={currentPage === pageNumber}
                        >
                          {pageNumber}
                        </S.PaginationItem>
                      ))}
                      <S.PaginationItem
                        key={'next-pageset-btn'}
                        onClick={() => {
                          const paginationGroup = Math.min(
                            Math.floor(maxPageNumber / PAGINATION_LENGTH),
                            currentPaginationGroup + 1
                          );
                          setCurrentPage(
                            Math.max(
                              paginationGroup * PAGINATION_LENGTH + 1,
                              getPaginationBarNumbers().slice(-1)[0]
                            )
                          );
                          setCurrentPaginationGroup(paginationGroup);
                        }}
                      >
                        <SingleArrowRightSVG />
                      </S.PaginationItem>
                      <S.PaginationItem key={'last-page-btn'}>
                        <DoubleArrowRightSVG
                          key={'last-page-btn'}
                          onClick={() => {
                            setCurrentPage(maxPageNumber);
                            setCurrentPaginationGroup(
                              Math.floor(maxPageNumber / PAGINATION_LENGTH)
                            );
                          }}
                        />
                      </S.PaginationItem>
                    </S.PaginationContainer>
                  </S.CardList>
                )}
              </S.RecipientsList>
            </S.InnerContent>
          </S.Section>
        </>
      </Layout>
    </>
  );
}
