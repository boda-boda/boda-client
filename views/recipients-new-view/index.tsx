import * as S from './styles';
import Layout from '../../components/layout';
import Banner from '../../components/banner';
import RecipientsEdit from '../../components/recipients-edit';
import { BannerStyleType } from '../../common/types';
import Category from '../../components/category';
import Head from 'next/head';

export default function CareGiverEditView() {
  return (
    <>
      <Head>
        <title>돌봄: 수급자 추가</title>
      </Head>
      <Layout>
        <>
          <Banner
            bannerStyle={BannerStyleType.SECTION}
            sectionIndex={0}
            title="수급자 추가"
            subtitle="수급자를 추가할 수 있습니다."
          />
          <Category list={['홈', '나의 수급자 관리', '수급자 관리', '수급자 추가']} />
          <S.CareGiverEditPage>
            <RecipientsEdit isNew={true} />
          </S.CareGiverEditPage>
        </>
      </Layout>
    </>
  );
}
