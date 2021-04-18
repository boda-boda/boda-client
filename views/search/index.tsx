import * as S from './styles';
import Layout from '../../components/layout';
import Banner from '../../components/banner';
import { BannerStyleType } from '../../common/types';
import OuterCareGiverList from '../../components/outer-care-giver-list';
import Head from 'next/head';
import Category from '../../components/category';

function Search() {
  return (
    <>
      <Head>
        <title>돌봄</title>
      </Head>
      <Layout>
        <>
          <Banner bannerStyle={BannerStyleType.AD} />
          <Category list={['홈', '요양보호사 검색']} />
          <S.Search>
            <OuterCareGiverList />
          </S.Search>
        </>
      </Layout>
    </>
  );
}

export default Search;
