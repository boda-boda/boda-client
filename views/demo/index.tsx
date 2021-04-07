import * as S from './styles';
import Banner from '../../components/banner';
import { BannerStyleType } from '../../common/types';
import Head from 'next/head';
import CareGiverListDemo from '../../components/care-giver-list-demo';
import LayoutDemo from '../../components/layout-demo';

export default function Demo() {
  return (
    <>
      <Head>
        <title>돌봄</title>
      </Head>
      <LayoutDemo>
        <>
          <Banner bannerStyle={BannerStyleType.AD} />
          <S.Main>
            <CareGiverListDemo isMyCaregiver={false} />
          </S.Main>
        </>
      </LayoutDemo>
    </>
  );
}
