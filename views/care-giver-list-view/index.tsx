import * as S from './styles';
import Layout from '../../components/layout';
import Banner from '../../components/banner';
import CareGiverList from '../../components/care-giver-list';
import { BannerStyleType } from '../../common/types';
import Category from '../../components/category';
import Head from 'next/head';

interface CareGiverListViewProps {
  isMyCaregiver: boolean;
}

export default function CareGiverListView() {
  return (
    <>
      <Head>
        <title>돌봄: 요양보호사 목록</title>
      </Head>
      <Layout>
        <Banner
          bannerStyle={BannerStyleType.SECTION}
          sectionIndex={0}
          title="요양보호사 검색"
          subtitle="매칭에 필요한 조건을 선택하여 신규 요양보호사를 검색할 수 있습니다."
        />
        <Category list={['홈', '나의 요양보호사 관리', '요양보호사 목록']} />
        <S.CareGiverDetailPage>
          <CareGiverList />
        </S.CareGiverDetailPage>
      </Layout>
    </>
  );
}
