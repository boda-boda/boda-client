import * as S from './styles';
import Layout from '../../components/layout';
import Banner from '../../components/banner';
import { BannerStyleType } from '../../common/types';
import CareGiverList from '../../components/care-giver-list';

export default function Main() {
  return (
    <Layout>
      <>
        <Banner bannerStyle={BannerStyleType.AD} />
        <S.Main>
          <CareGiverList isMyCaregiver={false} />
        </S.Main>
      </>
    </Layout>
  );
}
