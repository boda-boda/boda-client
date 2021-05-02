import React from 'react';
import { useSoftRefresh } from '../../common/hooks/auth';
import { useCareCenter } from '../../context/care-center';
import ArrowUpSVG from '../../svgs/arrow-up-svg';
import SpinnerCircleSVG from '../../svgs/spinner-circle-svg';
import Footer from '../footer';
import Header from '../header';
import * as S from './styles';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  useSoftRefresh();
  const careCenter = useCareCenter();

  const handleTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <S.Layout>
      <Header />
      <S.ContentWrapper>{children}</S.ContentWrapper>
      <S.TopButton onClick={handleTop}>
        <ArrowUpSVG />
      </S.TopButton>
      <Footer />
      {careCenter.isValidating && !careCenter.isLoggedIn && (
        <S.AttemptingLogin>
          <SpinnerCircleSVG />
        </S.AttemptingLogin>
      )}
    </S.Layout>
  );
}
