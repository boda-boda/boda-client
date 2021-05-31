import * as S from './styles';
import Layout from '../../components/layout';
import Banner from '../../components/banner';
import CareGiverDetailDemo from '../../components/care-giver-detail-demo';
import { BannerStyleType } from '../../common/types';
import Category from '../../components/category';
import Head from 'next/head';

export default function CareGiverDetailViewDemo() {
  return (
    <>
      <Head>
        <title>돌봄: 요양보호사 세부정보</title>
      </Head>
      <Layout>
        <>
          <Banner
            bannerStyle={BannerStyleType.SECTION}
            sectionIndex={0}
            title="요양보호사 세부정보 데모 페이지 입니다"
            subtitle="요양보호사의 자세한 정보를 확인할 수 있습니다.#마음에 드신다면 매칭제안서를 작성해보세요."
          />
          <Category list={['홈', '돌봄 요양보호사 매칭', '요양보호사 세부정보']} />
          <S.CareGiverDetailPage>
            <CareGiverDetailDemo />
          </S.CareGiverDetailPage>
        </>
      </Layout>
    </>
  );
}
