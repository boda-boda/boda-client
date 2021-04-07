import React from 'react';
import { useSoftRefresh } from '../../common/hooks/auth';
import ArrowUpSVG from '../../svgs/arrow-up-svg';
import Footer from '../footer';
import HeaderDemo from '../header-demo';
import * as S from './styles';

interface LayoutDemoProps {
  children: React.ReactNode;
}

export default function LayoutDemo({ children }: LayoutDemoProps) {
  useSoftRefresh();

  const handleTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <S.Layout>
      <HeaderDemo />
      <S.ContentWrapper>{children}</S.ContentWrapper>
      <S.TopButton onClick={handleTop}>
        <ArrowUpSVG />
      </S.TopButton>
      <Footer />
    </S.Layout>
  );
}
