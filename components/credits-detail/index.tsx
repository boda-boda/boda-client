import * as S from './styles';
import CreditSVG from '../../svgs/credit-svg';
import { useCareCenter } from '../../context/care-center';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Credit from '../../model/credit';
import CreditHistory from '../../model/credit-history';
import { range } from '../../common/lib';
import { PAGINATION_LENGTH } from '../../constant';
import DoubleArrowLeftSVG from '../../svgs/double-arrow-left';
import SingleArrowLeftSVG from '../../svgs/single-arrow-left-svg';
import SingleArrowRightSVG from '../../svgs/single-arrow-right-svg';
import DoubleArrowRightSVG from '../../svgs/double-arrow-right';

export default function CreditDetail() {
  const router = useRouter();
  const careCenter = useCareCenter();
  const [credit, setCredit] = useState({} as Credit);
  const [creditHistorys, setCreditHistorys] = useState([] as CreditHistory[]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPaginationGroup, setCurrentPaginationGroup] = useState(0);
  const [creditHistorysPerPage, setCreditHistorysPerPage] = useState(10);
  const indexOfLastCreditHistory = currentPage * creditHistorysPerPage;
  const indexOfFirstCreditHistory = indexOfLastCreditHistory - creditHistorysPerPage;
  const currentPageCreditHistorys = creditHistorys.slice(
    indexOfFirstCreditHistory,
    indexOfLastCreditHistory
  );
  const maxPageNumber = Math.ceil(creditHistorys.length / creditHistorysPerPage);

  const getPaginationBarNumbers = useCallback(() => {
    return range(
      currentPaginationGroup * PAGINATION_LENGTH + 1,
      Math.min((currentPaginationGroup + 1) * PAGINATION_LENGTH, maxPageNumber)
    );
  }, [currentPaginationGroup, maxPageNumber]);

  const handleClickPurchase = () => {
    alert('돌봄 포인트 구매는 010-5618-9508 또는 help@dol-bom.com으로 문의주세요.');
  };

  useEffect(() => {
    if (!careCenter || careCenter.isValidating || !careCenter.isLoggedIn) {
      return;
    }

    (async () => {
      try {
        const response = await axios.get(`/credit`);
        setCredit(response.data);
      } catch (e) {
        router.push('/list');
      }
    })();
  }, [careCenter]);

  useEffect(() => {
    if (!careCenter || careCenter.isValidating || !careCenter.isLoggedIn) {
      return;
    }

    (async () => {
      try {
        const response = await axios.get(`/credit/history`);
        setCreditHistorys(response.data);
      } catch (e) {
        router.push('/list');
      }
    })();
  }, [careCenter]);

  return (
    <>
      <S.MatchingProposalContent>
        <S.InnerContent>
          <S.Section>
            <S.SectionTitleContainer>
              <S.SectionTitle>내 돌봄 포인트 정보</S.SectionTitle>
              <S.CreditPurchaseButton onClick={handleClickPurchase}>
                <S.CreditSVGWrapper>
                  <CreditSVG />
                </S.CreditSVGWrapper>
                돌봄 포인트 구매
              </S.CreditPurchaseButton>
            </S.SectionTitleContainer>
            <S.CreditInfoContainer>
              <S.CreditInfoRow>
                <S.CreditInfoDiv>보유 돌봄 포인트</S.CreditInfoDiv>
                <S.CreditInfoDiv>
                  {credit.paidCredit || credit.freeCredit
                    ? credit.paidCredit + credit.freeCredit
                    : 0}
                  돌봄 포인트
                </S.CreditInfoDiv>
              </S.CreditInfoRow>
            </S.CreditInfoContainer>
            <S.CreditInfoContainer>
              <S.CreditInfoRow>
                <S.CreditInfoDiv>유상 돌봄 포인트</S.CreditInfoDiv>
                <S.CreditInfoDiv>{credit.paidCredit} 돌봄 포인트</S.CreditInfoDiv>
              </S.CreditInfoRow>
              <S.CreditInfoRow>
                <S.CreditInfoDiv>무상 돌봄 포인트</S.CreditInfoDiv>
                <S.CreditInfoDiv>{credit.freeCredit} 돌봄 포인트</S.CreditInfoDiv>
              </S.CreditInfoRow>
            </S.CreditInfoContainer>
          </S.Section>
          <S.Section>
            <S.SectionTitleContainer>
              <S.SectionTitle>상세 내역</S.SectionTitle>
            </S.SectionTitleContainer>
            <S.InfoTable>
              <tbody>
                <tr>
                  <th className={'content'}>내역</th>
                  <th className={'credit'}>돌봄 포인트</th>
                  <th className={'type'}>구분</th>
                  <th className={'time'}>일시</th>
                </tr>
                {currentPageCreditHistorys.map((creditHistory, idx) => {
                  return (
                    <tr>
                      <td>{creditHistory.content}</td>
                      <td className={'credit'}>{creditHistory.credits}</td>
                      <td className={'type'}>{creditHistory.type}</td>
                      <td>{creditHistory.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </S.InfoTable>
          </S.Section>
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
                  setCurrentPaginationGroup(Math.floor(maxPageNumber / PAGINATION_LENGTH));
                }}
              />
            </S.PaginationItem>
          </S.PaginationContainer>
          <S.CompleteSection></S.CompleteSection>
        </S.InnerContent>
      </S.MatchingProposalContent>
    </>
  );
}
