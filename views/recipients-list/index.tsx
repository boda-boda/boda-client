import * as S from './styles';
import Layout from '../../components/layout';
import Banner from '../../components/banner';
import { BannerStyleType } from '../../common/types';
import Category from '../../components/category';
import Head from 'next/head';
import PhoneNumberIconSVG from '../../svgs/phone-number-icon-svg';
import CareInfoIconSVG from '../../svgs/care-info-icon-svg';
import Link from 'next/link';
import Reciepient from '../../model/reciepient';
import { CAPABILITY, PAGINATION_LENGTH } from '../../constant';
import { useCallback, useState } from 'react';
import DoubleArrowLeftSVG from '../../svgs/double-arrow-left';
import SingleArrowLeftSVG from '../../svgs/single-arrow-left-svg';
import { range } from '../../common/lib';
import SingleArrowRightSVG from '../../svgs/single-arrow-right-svg';
import DoubleArrowRightSVG from '../../svgs/double-arrow-right';

const recipients = [
  {
    zipCode: '08018',
    address: '서울시 양천구 신정7동',
    detailAddress: '목동남로4길 81',
    age: 20,
    birthDay: '2000-08-21',

    careWorkerMetas: [{ type: CAPABILITY, key: '휠체어', value: '' }],

    description: '설명',
    grade: 3,
    gender: '여',
    id: 'asdf',
    name: '김슈급',
    phoneNumber: '010-7105-2344',
    profile: 'https://topclass.chosun.com/news_img/2008/2008_008_4.jpg',
  },
  {
    zipCode: '08018',
    address: '서울시 양천구 신정7동',
    detailAddress: '목동남로4길 81',
    age: 20,
    birthDay: '2000-08-21',

    careWorkerMetas: [{ type: CAPABILITY, key: '휠체어', value: '' }],

    description: '설명',
    grade: 3,
    gender: '여',
    id: 'asdf',
    name: '김슈급',
    phoneNumber: '010-7105-2344',
    profile: 'https://topclass.chosun.com/news_img/2008/2008_008_4.jpg',
  },
  {
    zipCode: '08018',
    address: '서울시 양천구 신정7동',
    detailAddress: '목동남로4길 81',
    age: 20,
    birthDay: '2000-08-21',

    careWorkerMetas: [{ type: CAPABILITY, key: '휠체어', value: '' }],

    description: '설명',
    grade: 3,
    gender: '여',
    id: 'asdf',
    name: '김슈급',
    phoneNumber: '010-7105-2344',
    profile: 'https://topclass.chosun.com/news_img/2008/2008_008_4.jpg',
  },
] as Reciepient[];

export default function ReciepientsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPaginationGroup, setCurrentPaginationGroup] = useState(0);
  const [recipientsPerPage, setRecipientsPerPage] = useState(10);
  const indexOfLastRecipient = currentPage * recipientsPerPage;
  const indexOfFirstRecipient = indexOfLastRecipient - recipientsPerPage;
  const currentPageRecipients = recipients.slice(indexOfFirstRecipient, indexOfLastRecipient);
  const maxPageNumber = Math.ceil(recipients.length / recipientsPerPage);

  const getPaginationBarNumbers = useCallback(() => {
    return range(
      currentPaginationGroup * PAGINATION_LENGTH + 1,
      Math.min((currentPaginationGroup + 1) * PAGINATION_LENGTH, maxPageNumber)
    );
  }, [currentPaginationGroup, maxPageNumber]);

  return (
    <>
      <Head>
        <title>돌봄: 수급자 관리</title>
      </Head>
      <Layout>
        <>
          <>
            <Banner
              bannerStyle={BannerStyleType.SECTION}
              sectionIndex={2}
              title="수급자 관리"
              subtitle="요양보호사 매칭이 필요한 수급자 정보를 등록하여 제안서 작성에 활용할 수 있습니다."
            />
            <Category list={['홈', '나의 센터 정보', '수급자 관리 ']} />
          </>
          <S.Section isBackgroundColored>
            <S.InnerContent>
              <S.SectionTitle>수급자 정보</S.SectionTitle>
              <S.ReciepientsList>
                <S.CardList>
                  {recipients.length === 0 ? (
                    <S.EmptyCardContainer>
                      <S.EmptyCard>현재 관리하고 있는 수급자가 없습니다.</S.EmptyCard>
                    </S.EmptyCardContainer>
                  ) : (
                    <S.CardList>
                      {recipients.map((recipient, idx) => (
                        <S.StyledLink>
                          <Link
                            key={`worker-${idx}`}
                            href={{
                              pathname: '/recipients/[id]',
                            }}
                            as={`/list/${recipient.id}`}
                            passHref
                          >
                            <S.Card>
                              <S.ProfileImage src={recipient.profile} />
                              <S.InfoContainer>
                                <S.BasicInfo>
                                  {recipient.name} ({recipient.age}/{recipient.gender[0]}/
                                  {recipient.grade}등급)
                                </S.BasicInfo>
                                <S.InfoRow>
                                  <S.SVGIconBox>
                                    <PhoneNumberIconSVG />
                                  </S.SVGIconBox>
                                  <S.InfoType>위치</S.InfoType>
                                  <S.InfoValue>{recipient.address}</S.InfoValue>
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
                                  <S.InfoType>가능 조건</S.InfoType>

                                  <S.InfoItemList>
                                    {recipient.careWorkerMetas
                                      ?.filter((meta) => meta.type === CAPABILITY)
                                      .map((meta, index) => {
                                        return (
                                          <S.InfoItem key={`careInfoItem-${index}`}>
                                            {meta.key}
                                          </S.InfoItem>
                                        );
                                      })}
                                  </S.InfoItemList>
                                </S.InfoRow>
                              </S.InfoContainer>
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
                </S.CardList>
              </S.ReciepientsList>
            </S.InnerContent>
          </S.Section>
        </>
      </Layout>
    </>
  );
}
