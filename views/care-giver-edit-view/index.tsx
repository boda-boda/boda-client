import * as S from './styles';
import Layout from '../../components/layout';
import Banner from '../../components/banner';
import CareGiverEdit from '../../components/care-giver-edit';
import { BannerStyleType } from '../../common/types';
import Category from '../../components/category';
import Head from 'next/head';

export default function CareGiverEditView() {
  return (
    <>
      <Head>
        <title>돌봄: 요양보호사 세부정보 수정</title>
      </Head>
      <Layout>
        <>
          <Banner
            bannerStyle={BannerStyleType.SECTION}
            sectionIndex={0}
            title="세부정보 수정"
            subtitle="요양보호사의 자세한 정보를 확인할 수 있습니다.#마음에 드신다면 매칭제안서를 작성해보세요."
          />
          <Category list={['홈', '신규 요양보호사 검색', '요양보호사 세부정보', '세부정보 수정']} />
          <S.CareGiverEditPage>
            <CareGiverEdit isNew={false} />
          </S.CareGiverEditPage>
        </>
      </Layout>
    </>
  );
}
