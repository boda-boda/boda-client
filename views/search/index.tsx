import * as S from './styles';
import Layout from '../../components/layout';
import Banner from '../../components/banner';
import { BannerStyleType } from '../../common/types';
import OuterCareGiverList from '../../components/outer-care-giver-list';
import Head from 'next/head';
import Category from '../../components/category';

import { useCareCenter } from '../../context/care-center';
import { usePrivatePage } from '../../common/hooks/private-page';

function Search() {
  usePrivatePage(useCareCenter());

  return (
    <>
      <Head>
        <title>돌봄</title>
      </Head>
      <Layout>
        <>
          <Banner bannerStyle={BannerStyleType.AD} />
          <Category list={['홈', '돌봄 요양보호사 매칭', '돌봄 요양보호사 검색']} />
          <S.Search>
            <OuterCareGiverList />
          </S.Search>
        </>
      </Layout>
    </>
  );
}

export default Search;
