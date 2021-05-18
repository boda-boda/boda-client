import * as S from './styles';
import Link from 'next/link';
import CreditSVG from '../../svgs/credit-svg';

export default function CreditDetail() {
  return (
    <>
      <S.MatchingProposalContent>
        <S.InnerContent>
          <S.Section>
            <S.SectionTitleContainer>
              <S.SectionTitle>내 돌봄코인 정보</S.SectionTitle>
              <Link href={`/proposal-list`} passHref>
                <S.CreditPurchaseButton>
                  <S.CreditSVGWrapper>
                    <CreditSVG />
                  </S.CreditSVGWrapper>
                  돌봄코인 구매
                </S.CreditPurchaseButton>
              </Link>
            </S.SectionTitleContainer>
            <S.CreditInfoContainer>
              <S.CreditInfoRow>
                <S.CreditInfoDiv>보유 돌봄코인</S.CreditInfoDiv>
                <S.CreditInfoDiv>250 돌봄코인</S.CreditInfoDiv>
              </S.CreditInfoRow>
            </S.CreditInfoContainer>
            <S.CreditInfoContainer>
              <S.CreditInfoRow>
                <S.CreditInfoDiv>유상 돌봄코인</S.CreditInfoDiv>
                <S.CreditInfoDiv>200 돌봄코인</S.CreditInfoDiv>
              </S.CreditInfoRow>
              <S.CreditInfoRow>
                <S.CreditInfoDiv>무상 돌봄코인</S.CreditInfoDiv>
                <S.CreditInfoDiv>50 돌봄코인</S.CreditInfoDiv>
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
                  <th className={'detail'}>내역</th>
                  <th className={'credit'}>돌봄코인</th>
                  <th className={'sort'}>구분</th>
                  <th className={'time'}>일시</th>
                </tr>
                <tr>
                  <td>돌봄 코인 50개(칭찬 5회 작성)</td>
                  <td>50</td>
                  <td>지급</td>
                  <td>2020.04.02 14:00</td>
                </tr>
                <tr>
                  <td>돌봄 코인 200개</td>
                  <td>200</td>
                  <td>충천</td>
                  <td>2020.01.02 14:00</td>
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
