import * as S from './styles';
import Layout from '../../components/layout';
import Banner from '../../components/banner';
import { BannerStyleType } from '../../common/types';
import Category from '../../components/category';
import MatchingProposal from '../../components/matching-proposal';

export default function MatchingProposalView() {
  return (
    <Layout>
      <>
        <>
          <Banner
            bannerStyle={BannerStyleType.SECTION}
            sectionIndex={0}
            title="매칭 제안서 작성"
            subtitle="조건에 맞는 요양보호사를 찾으셨나요?\n센터정보와 수급자 정보를 담아 요양보호사에게 보낼 매칭제안서를 작성해보세요."
          />
          <Category list={['홈', '신규 요양보호사 추가', '요양보호사 검색', '매칭 제안서 작성']} />
        </>

        <S.MatchingProposalPage>
          <MatchingProposal isFilled={false} />
        </S.MatchingProposalPage>
      </>
    </Layout>
  );
}
