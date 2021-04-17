import * as S from './styles';
import Layout from '../../components/layout';
import Banner from '../../components/banner';
import { BannerStyleType } from '../../common/types';
import OuterCareGiverList from '../../components/outer-care-giver-list';
import Head from 'next/head';

function Search() {
  return (
    <>
      <Head>
        <title>돌봄</title>
      </Head>
      <Layout>
        <>
          <Banner bannerStyle={BannerStyleType.AD} />
          <S.Search>
            <OuterCareGiverList />
          </S.Search>
        </>
      </Layout>
    </>
  );
}

export default Search;
