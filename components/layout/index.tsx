import React, { ReactChild } from 'react';
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
          <Banner />
          <S.ContentContainer>{children}</S.ContentContainer>
        </S.ContentWrapper>
        <Footer />
      </S.Layout>
    </>
  );
}
