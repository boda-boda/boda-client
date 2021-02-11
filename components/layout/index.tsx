import React, { ReactChild } from 'react';
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
        <S.ContentContainer>{children}</S.ContentContainer>
        <Footer />
      </S.Layout>
    </>
  );
}
