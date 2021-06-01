import * as S from './styles';
import Layout from '../../components/layout';
import Banner from '../../components/banner';
import { BannerStyleType } from '../../common/types';
import Category from '../../components/category';
import Head from 'next/head';
import Link from 'next/link';
import { MATCHING_PROPOSAL_STATUS, PAGINATION_LENGTH, RELIGION } from '../../constant';
import { useCallback, useEffect, useState } from 'react';
import DoubleArrowLeftSVG from '../../svgs/double-arrow-left';
import SingleArrowLeftSVG from '../../svgs/single-arrow-left-svg';
import { range } from '../../common/lib';
import SingleArrowRightSVG from '../../svgs/single-arrow-right-svg';
import DoubleArrowRightSVG from '../../svgs/double-arrow-right';
import axios from 'axios';
import { useCareCenter } from '../../context/care-center';
import MatchingProposal from '../../model/matching-proposal';
import LocationIconSVG from '../../svgs/location-icon-svg';
import PersonalityInfoIconSVG from '../../svgs/personality-info-icon-svg';
import WorkTimeIconSVG from '../../svgs/work-time-icon-svg';
import CareInfoIconSVG from '../../svgs/care-info-icon-svg';
import PhoneNumberIconSVG from '../../svgs/phone-number-icon-svg';

export default function ProposalList() {
  const careCenter = useCareCenter();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPaginationGroup, setCurrentPaginationGroup] = useState(0);
  const [proposalsPerPage, setProposalsPerPage] = useState(5);
  const [proposals, setProposals] = useState([] as MatchingProposal[]);
  const indexOfLastProposal = currentPage * proposalsPerPage;
  const indexOfFirstProposal = indexOfLastProposal - proposalsPerPage;
  const currentPageProposals = proposals.slice(indexOfFirstProposal, indexOfLastProposal);
  const maxPageNumber = Math.ceil(proposals.length / proposalsPerPage);

  useEffect(() => {
    if (careCenter.isValidating || !careCenter.isLoggedIn) return;
    (async () => {
      try {
        const response = await axios.get('/matching-proposal');
        setProposals(response.data);
      } catch (e) {}
    })();
  }, [careCenter]);

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
              <S.RecipientsList>
                {currentPageProposals.length === 0 ? (
                  <S.CardList>
                    <S.EmptyCardContainer>
                      <S.EmptyCard>현재 발송한 매칭 제안서가 없습니다.</S.EmptyCard>
                    </S.EmptyCardContainer>
                  </S.CardList>
                ) : (
                  <S.CardList>
                    {currentPageProposals.map((proposal, idx) => (
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
                            {/* <S.CheckBox
                              type="checkbox"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            /> */}
                            {proposal.status === MATCHING_PROPOSAL_STATUS[2] ? (
                              <S.StatusDivWait
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                {proposal.status}
                              </S.StatusDivWait>
                            ) : (
                              <S.StatusDiv
                                isAccepted={proposal.status === MATCHING_PROPOSAL_STATUS[0]}
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                {proposal.status}
                              </S.StatusDiv>
                            )}
                            <S.CardInnerContent>
                              <S.CardSection>
                                <S.ProfileImage src={proposal.recipient.profile} />
                                <S.InfoContainer>
                                  <S.BasicInfo>
                                    {proposal.recipient.name} ({proposal.recipient.age}/
                                    {proposal.recipient.isFemale ? '여' : '남'}/
                                    {proposal.recipient.grade}등급)
                                  </S.BasicInfo>
                                  <S.InfoRow>
                                    <S.SVGIconBox>
                                      <LocationIconSVG />
                                    </S.SVGIconBox>
                                    <S.InfoType>위치</S.InfoType>
                                    <S.InfoValue>{proposal.recipient.address}</S.InfoValue>
                                  </S.InfoRow>

                                  <S.InfoRow>
                                    <S.SVGIconBox>
                                      <CareInfoIconSVG />
                                    </S.SVGIconBox>
                                    <S.InfoType>거주 형태</S.InfoType>
                                    <S.InfoValue>{proposal.recipient.familyType}</S.InfoValue>
                                  </S.InfoRow>
                                  <S.InfoRow>
                                    <S.SVGIconBox>
                                      <WorkTimeIconSVG />
                                    </S.SVGIconBox>
                                    <S.InfoType>돌봄 시간</S.InfoType>
                                    <S.InfoValue>{proposal.recipient.schedule}</S.InfoValue>
                                  </S.InfoRow>
                                  <S.InfoRow>
                                    <S.SVGIconBox>
                                      <PersonalityInfoIconSVG />
                                    </S.SVGIconBox>
                                    <S.InfoType>세부 사항</S.InfoType>
                                    <S.MemoValue>{proposal.recipient.description}</S.MemoValue>
                                  </S.InfoRow>
                                </S.InfoContainer>
                              </S.CardSection>
                              <S.CardSectionRight>
                                <S.ProfileImage src={proposal.outerCareWorker.profile} />
                                <S.InfoContainerRight>
                                  <S.BasicInfo>
                                    {proposal.outerCareWorker.name} ({proposal.outerCareWorker.age}/
                                    {proposal.outerCareWorker.gender === '여성' ? '여' : '남'})
                                  </S.BasicInfo>
                                  <S.InfoRow>
                                    <S.SVGIconBox>
                                      <PhoneNumberIconSVG />
                                    </S.SVGIconBox>
                                    <S.InfoType>휴대전화</S.InfoType>
                                    <S.InfoValue>
                                      {proposal.outerCareWorker.phoneNumber}
                                    </S.InfoValue>
                                  </S.InfoRow>
                                  <S.InfoRow>
                                    <S.SVGIconBox>
                                      <WorkTimeIconSVG />
                                    </S.SVGIconBox>
                                    <S.InfoType>돌봄 시간</S.InfoType>
                                    <S.InfoValue>{proposal.outerCareWorker.schedule}</S.InfoValue>
                                  </S.InfoRow>
                                  <S.InfoRow>
                                    <S.SVGIconBox>
                                      <PersonalityInfoIconSVG />
                                    </S.SVGIconBox>
                                    <S.InfoType>메모</S.InfoType>
                                    <S.MemoValueRight>
                                      {proposal.outerCareWorker.description}
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
