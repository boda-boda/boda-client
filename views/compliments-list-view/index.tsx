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
import { useCallback, useEffect, useState } from 'react';
import DoubleArrowLeftSVG from '../../svgs/double-arrow-left';
import SingleArrowLeftSVG from '../../svgs/single-arrow-left-svg';
import { range } from '../../common/lib';
import SingleArrowRightSVG from '../../svgs/single-arrow-right-svg';
import DoubleArrowRightSVG from '../../svgs/double-arrow-right';
import { useRouter } from 'next/router';
import { useCareCenter } from '../../context/care-center';
import axios from 'axios';
import CareWorker from '../../model/care-worker';

export default function ComplimentsList() {
  const careCenter = useCareCenter();
  const router = useRouter();

  const [maxPage, setMaxPage] = useState(1);
  const [convertedCareWorkers, setConvertedCareWorkers] = useState([] as any[]);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPaginationGroup, setCurrentPaginationGroup] = useState(0);
  const [careWorkersPerPage, setCareWorkersPerPage] = useState(10);

  const getPaginationBarNumbers = () => {
    if (maxPage <= 5) return range(1, maxPage);
    if (currentPage <= 3) return range(1, 5);
    if (maxPage - currentPage < 2) {
      return range(maxPage - 4, maxPage);
    } else return range(currentPage - 2, currentPage + 2);
  };

  const maxPageNumber = Math.ceil(convertedCareWorkers.length / careWorkersPerPage);

  useEffect(() => {
    if (careCenter.isValidating || !careCenter.isLoggedIn) return;

    (async () => {
      try {
        const response = await axios.get(
          `/outer-care-worker/search?from=${0}&size=${careWorkersPerPage}`
        );
        setConvertedCareWorkers(response.data.data);
        setMaxPage(Math.ceil(response.data.total / careWorkersPerPage));
        setCurrentPage(1);
      } catch (e) {
        return;
      }
    })();
  }, [careCenter]);
  const onClickSearchOuterCareGiver = async () => {
    if (careCenter.isValidating || !careCenter.isLoggedIn) return;

    let params = '';

    try {
      const response = await axios.get(
        `/outer-care-worker/search?from=${
          (currentPage - 1) * careWorkersPerPage
        }&size=${careWorkersPerPage}${params}`
      );
      setConvertedCareWorkers(response.data.data);
      setMaxPage(Math.ceil(response.data.total / careWorkersPerPage));
    } catch (e) {
      alert('검색에 실패하였습니다. 관리자에게 문의 부탁드립니다.');
      return;
    }
  };
  useEffect(() => {
    onClickSearchOuterCareGiver();
  }, [currentPage]);

  return (
    <>
      <Head>
        <title>돌봄: 칭찬 관리</title>
      </Head>
      <Layout>
        <>
          <>
            <Banner
              bannerStyle={BannerStyleType.SECTION}
              sectionIndex={2}
              title="요양보호사 칭찬"
              subtitle="나의 요양보호사로 전환한 돌봄의 요양보호사에 대한 칭찬을 작성할 수 있습니다.#요양보호사 카드를 클릭하여 세부정보 페이지에서 칭찬을 작성해주세요"
            />
            <Category list={['홈', '나의 요양보호사 관리', '요양보호사 칭찬 ']} />
          </>
          <S.Section isBackgroundColored>
            <S.InnerContent>
              <S.SectionTitle>전환한 요양보호사 목록</S.SectionTitle>
              <S.CareWorkersPerPageContainer>
                <S.CareWorkersPerPageDropDown
                  value={careWorkersPerPage}
                  onChange={(e) => {
                    setCareWorkersPerPage(Number(e.target.value) as number);
                    setCurrentPage(1);
                  }}
                >
                  <option value="10">10명 씩 보기</option>
                  <option value="20">20명 씩 보기</option>
                </S.CareWorkersPerPageDropDown>
              </S.CareWorkersPerPageContainer>
              <S.CardList>
                {convertedCareWorkers.length === 0 ? (
                  <S.EmptyCardContainer>
                    <S.EmptyCard>해당 조건의 요양보호사가 없습니다.</S.EmptyCard>
                  </S.EmptyCardContainer>
                ) : (
                  <S.CardList>
                    {convertedCareWorkers.map((worker, idx) => (
                      <S.StyledLink>
                        <Link
                          key={`worker-${idx}`}
                          href={{
                            pathname: '/search/[id]',
                          }}
                          as={`/search/${worker.id}`}
                          passHref
                        >
                          <S.Card>
                            <S.ProfileImage src={worker.profile} />
                            <S.InfoContainer>
                              <S.BasicInfo>
                                {worker.name} ({worker.age}/{worker.gender[0]})
                              </S.BasicInfo>
                              {/* <S.Time>1시간 전</S.Time> TODO: 이거 구현해야함 백엔드에서 */}
                              <S.InfoRow>
                                <S.SVGIconBox>
                                  <PhoneNumberIconSVG />
                                </S.SVGIconBox>
                                <S.InfoType>휴대전화</S.InfoType>
                                <S.InfoValue>{worker.phoneNumber}</S.InfoValue>
                              </S.InfoRow>
                              <S.InfoRow>
                                <S.SVGIconBox>
                                  <CareInfoIconSVG />
                                </S.SVGIconBox>
                                <S.InfoType>가능 조건</S.InfoType>

                                <S.InfoItemList>
                                  {worker.careWorkerCapabilities.map((capability, index) => {
                                    return (
                                      <S.InfoItem key={`careInfoItem-${index}`}>
                                        {capability}
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
                        }}
                      >
                        <DoubleArrowLeftSVG />
                      </S.PaginationItem>
                      <S.PaginationItem
                        key={'previous-pageset-btn'}
                        onClick={() => {
                          if (currentPage === 1) return;
                          setCurrentPage(currentPage - 1);
                        }}
                      >
                        <SingleArrowLeftSVG />
                      </S.PaginationItem>
                      {getPaginationBarNumbers().map((pageNumber) => (
                        <S.PaginationItem
                          key={`page-${pageNumber}`}
                          onClick={() => {
                            setCurrentPage(pageNumber);
                          }}
                          isClicked={currentPage === pageNumber}
                        >
                          {pageNumber}
                        </S.PaginationItem>
                      ))}
                      <S.PaginationItem
                        key={'next-pageset-btn'}
                        onClick={() => {
                          if (currentPage === maxPage) return;
                          setCurrentPage(currentPage + 1);
                        }}
                      >
                        <SingleArrowRightSVG />
                      </S.PaginationItem>
                      <S.PaginationItem key={'last-page-btn'}>
                        <DoubleArrowRightSVG
                          key={'last-page-btn'}
                          onClick={() => {
                            setCurrentPage(maxPage);
                          }}
                        />
                      </S.PaginationItem>
                    </S.PaginationContainer>
                  </S.CardList>
                )}
              </S.CardList>
            </S.InnerContent>
          </S.Section>
        </>
      </Layout>
    </>
  );
}
