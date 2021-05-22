import React from 'react';
import ArrowDown from '../../svgs/arrow-down-svg';
import ArrowUp from '../../svgs/arrow-up-svg';
import Link from 'next/link';
import * as S from './styles';
import { useHeader } from './hooks';

export default function Header() {
  const { careCenter, handleLogout, isMenuModalOn, handleMenuClick } = useHeader();

  return (
    <>
      <S.Header>
        <S.InnerContent>
          {/* <Link href={careCenter.isLoggedIn ? '/search' : '/'} passHref> */}
          <Link href="/" passHref>
            <S.StyledLink>
              <S.Logo>
                <S.LogoImg src="/logo.png" />
              </S.Logo>
            </S.StyledLink>
          </Link>
          <S.MenuList>
            {/* <Link href="/search" passHref>
              <S.MenuItem onClick={() => handleMenuClick(0)}>신규 요양보호사 검색</S.MenuItem>
            </Link> */}
            <S.MenuItem
              onClick={() => {
                if (!careCenter.isValidating && !careCenter.isLoggedIn) {
                  handleMenuClick(-1);
                  return;
                }
              }}
              onMouseEnter={() => {
                if (!careCenter.isValidating && !careCenter.isLoggedIn) {
                  return;
                }
                handleMenuClick(1);
              }}
              onMouseLeave={() => {
                if (!careCenter.isValidating && !careCenter.isLoggedIn) {
                  return;
                }
                handleMenuClick(1);
              }}
            >
              나의 요양보호사 관리
              {!careCenter.isValidating && careCenter.isLoggedIn && isMenuModalOn[1] ? (
                <>
                  <ArrowUp />
                  <S.MenuModal isMenuModalOn={isMenuModalOn[1]}>
                    <Link href="/list" passHref>
                      <S.StyledLink>요양보호사 목록</S.StyledLink>
                    </Link>
                    <S.MenuBar />
                    <Link href="/new" passHref>
                      <S.StyledLink>요양보호사 추가</S.StyledLink>
                    </Link>
                  </S.MenuModal>
                </>
              ) : (
                <ArrowDown />
              )}
            </S.MenuItem>
            {careCenter.isLoggedIn ? (
              <S.MenuItem
                onMouseEnter={() => {
                  if (!careCenter.isValidating && !careCenter.isLoggedIn) {
                    return;
                  }
                  handleMenuClick(2);
                }}
                onMouseLeave={() => {
                  if (!careCenter.isValidating && !careCenter.isLoggedIn) {
                    return;
                  }
                  handleMenuClick(2);
                }}
              >
                나의 센터 정보
                {isMenuModalOn[2] ? (
                  <>
                    <ArrowUp />
                    <S.MenuModal isMenuModalOn={isMenuModalOn[2]}>
                      <Link href="/mycenter" passHref>
                        <S.StyledLink>나의 센터 정보</S.StyledLink>
                      </Link>
                      <S.MenuBar />
                      <Link href="/recipients" passHref>
                        <S.StyledLink>수급자 관리</S.StyledLink>
                      </Link>
                      <S.MenuBar />
                      <Link href="/credits" passHref>
                        <S.StyledLink>돌봄코인 관리</S.StyledLink>
                      </Link>
                      <S.MenuBar />
                      <S.LogoutButton onClick={handleLogout}>로그아웃</S.LogoutButton>
                    </S.MenuModal>
                  </>
                ) : (
                  <ArrowDown />
                )}
              </S.MenuItem>
            ) : (
              <Link href="/login">
                <S.MenuItem>로그인 / 이용 신청</S.MenuItem>
              </Link>
            )}
          </S.MenuList>
        </S.InnerContent>
      </S.Header>
    </>
  );
}
