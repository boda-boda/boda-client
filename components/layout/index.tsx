import React, { ReactChild } from 'react';
import { useSoftRefresh } from '../../common/hooks/auth';
import Footer from '../footer';
import Header from '../header';
import * as S from './styles';

interface LayoutProps {
  children: ReactChild;
}

export default function Layout({ children }: LayoutProps) {
  useSoftRefresh();

  return (
    <>
      <S.Layout>
        <Header />
        <S.ContentWrapper>{children}</S.ContentWrapper>
        <Footer />
      </S.Layout>
    </>
  );
}
