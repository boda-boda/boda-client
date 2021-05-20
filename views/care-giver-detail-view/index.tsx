import * as S from './styles';
import Layout from '../../components/layout';
import Banner from '../../components/banner';
import CareGiverDetail from '../../components/care-giver-detail';
import { BannerStyleType } from '../../common/types';
import Category from '../../components/category';
import Head from 'next/head';

export default function CareGiverDetailView() {
  return (
    <>
      <Head>
        <title>돌봄: 내 요양보호사 세부정보</title>
      </Head>
      <Layout>
        <>
          <Banner
            bannerStyle={BannerStyleType.SECTION}
            sectionIndex={0}
            title="내 요양보호사 세부정보"
            subtitle="요양보호사의 자세한 정보를 확인할 수 있습니다.#마음에 드신다면 매칭제안서를 작성해보세요."
          />
          <Category list={['홈', '신규 요양보호사 검색', '요양보호사 세부정보']} />
          <S.CareGiverDetailPage>
            <CareGiverDetail />
          </S.CareGiverDetailPage>
        </>
      </Layout>
    </>
  );
}
