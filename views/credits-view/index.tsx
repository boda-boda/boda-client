import * as S from './styles';
import Layout from '../../components/layout';
import Banner from '../../components/banner';
import { BannerStyleType } from '../../common/types';
import CreditDetail from '../../components/credits-detail';

export default function MatchingProposalDetailView() {
  return (
    <Layout>
      <>
        <Banner
          bannerStyle={BannerStyleType.SECTION}
          sectionIndex={1}
          title="돌봄 포인트 내역"
          subtitle="돌봄 포인트의 잔액, 충전 내역과 사용 내역을 확인할 수 있습니다."
        />
        <S.CreditDetailPage>
          <CreditDetail />
        </S.CreditDetailPage>
      </>
    </Layout>
  );
}
