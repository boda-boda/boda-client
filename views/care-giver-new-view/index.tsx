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
        <title>돌봄: 요양보호사 추가</title>
      </Head>
      <Layout>
        <>
          <Banner
            bannerStyle={BannerStyleType.SECTION}
            sectionIndex={0}
            title="요양보호사 추가"
            subtitle="요양보호사를 추가할 수 있습니다."
          />
          <Category list={['홈', '나의 요양보호사 관리', '요양보호사 추가']} />
          <S.CareGiverEditPage>
            <CareGiverEdit isNew={true} />
          </S.CareGiverEditPage>
        </>
      </Layout>
    </>
  );
}
