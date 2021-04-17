import * as S from './styles';
import Layout from '../../components/layout';
import Banner from '../../components/banner';
import { BannerStyleType } from '../../common/types';
import CareGiverList from '../../components/care-giver-list';
import Head from 'next/head';

function Main() {
  return (
    <>
      <Head>
        <title>돌봄</title>
      </Head>
      <Layout>
        <>
          <Banner bannerStyle={BannerStyleType.AD} />
          <S.Main>
            <CareGiverList isMyCaregiver={false} />
          </S.Main>
        </>
      </Layout>
    </>
  );
}

export default Main;
