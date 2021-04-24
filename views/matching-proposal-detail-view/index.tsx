import * as S from './styles';
import Layout from '../../components/layout';
import Banner from '../../components/banner';
import { BannerStyleType } from '../../common/types';
import MatchingProposalDetail from '../../components/matching-proposal-detail';

export default function MatchingProposalDetailView() {
  return (
    <Layout>
      <>
        <Banner
          bannerStyle={BannerStyleType.SECTION}
          sectionIndex={1}
          title="매칭 제안서 세부 정보"
          subtitle="내가 작성했던 매칭 제안서의 세부 정보를 확인할 수 있습니다."
        />
        <S.MatchingProposalPage>
          <MatchingProposalDetail isFilled={false} />
        </S.MatchingProposalPage>
      </>
    </Layout>
  );
}
