import React, { ReactChild } from 'react';
import { BannerStyleType } from '../../common/types';
import Banner from '../banner';
import Footer from '../footer';
import Header from '../header';
import * as S from './styles';

interface LayoutProps {
  children: ReactChild;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <S.Layout>
        <Header />
        <S.ContentWrapper>
          <Banner bannerStyle={BannerStyleType.AD} />
          <S.ContentContainer>{children}</S.ContentContainer>
        </S.ContentWrapper>
        <Footer />
      </S.Layout>
    </>
  );
}
