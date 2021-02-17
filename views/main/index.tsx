import * as S from './styles';
import Layout from '../../components/layout';
import Banner from '../../components/banner';
import { BannerStyleType } from '../../common/types';
import CareGiverList from '../../components/care-giver-list';
import MatchingProposal from '../../components/matching-proposal';

export default function Main() {
  return (
    <Layout>
      <>
        <Banner bannerStyle={BannerStyleType.SECTION} />
        <S.Main>
          <CareGiverList isMine={false} />
        </S.Main>
      </>
    </Layout>
  );
}
