import * as S from './styles';
import Layout from '../../components/layout';
import Banner from '../../components/banner';
import { BannerStyleType } from '../../common/types';
import Head from 'next/head';
import CareGiverListDemo from '../../components/care-giver-list-demo';

export default function Main() {
  return (
    <>
      <Head>
        <title>돌봄</title>
      </Head>
      <Layout>
        <>
          <Banner bannerStyle={BannerStyleType.AD} />
          <S.Main>
            <CareGiverListDemo isMyCaregiver={false} />
          </S.Main>
        </>
      </Layout>
    </>
  );
}
