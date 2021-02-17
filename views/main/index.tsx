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
<<<<<<< HEAD
          <CareGiverList isMine={false} />
=======
          {/* <CareGiverList isMine={false} /> */}
          <MatchingProposal isFilled={true}></MatchingProposal>
>>>>>>> 7b172f573d593191b8fe0ef24f977d1bbb14eea6
        </S.Main>
      </>
    </Layout>
  );
}
