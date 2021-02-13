import * as S from './styles';
import Layout from '../../components/layout';
import Banner from '../../components/banner';
import { BannerStyleType } from '../../common/types';
import CgList from '../../components/cg-list';

export default function Main() {
  return (
    <Layout>
      <>
        <Banner bannerStyle={BannerStyleType.AD} />
        <S.Main>
          <CgList isAll={false} />
        </S.Main>
      </>
    </Layout>
  );
}
