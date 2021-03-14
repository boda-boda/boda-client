import * as S from './styles';
import Layout from '../../components/layout';
import Banner from '../../components/banner';
import CareGiverList from '../../components/care-giver-list';
import { BannerStyleType } from '../../common/types';
import Category from '../../components/category';

interface CareGiverListViewProps {
  isMyCaregiver: boolean;
}

export default function CareGiverListView({ isMyCaregiver }: CareGiverListViewProps) {
  return (
    <Layout>
      <>
        {isMyCaregiver ? (
          <>
            <Banner
              bannerStyle={BannerStyleType.SECTION}
              sectionIndex={1}
              title="요양보호사 목록"
              subtitle="우리 센터가 보유한 요양보호사 정보를 간편하게 찾아볼 수 있습니다."
            />
            <Category list={['홈', '나의 요양보호사 관리', '요양보호사 목록']} />
          </>
        ) : (
          <>
            <Banner
              bannerStyle={BannerStyleType.SECTION}
              sectionIndex={0}
              title="요양보호사 검색"
              subtitle="매칭에 필요한 조건을 선택하여 신규 요양보호사를 검색할 수 있습니다."
            />
            <Category list={['홈', '신규 요양보호사 검색']} />
          </>
        )}
        <S.CareGiverDetailPage>
          <CareGiverList isMyCaregiver={isMyCaregiver} />
        </S.CareGiverDetailPage>
      </>
    </Layout>
  );
}
