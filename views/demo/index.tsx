import * as S from './styles';
import Banner from '../../components/banner';
import { BannerStyleType } from '../../common/types';
import Head from 'next/head';
import CareGiverListDemo from '../../components/care-giver-list-demo';
import Layout from '../../components/layout';

export default function Demo() {
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
