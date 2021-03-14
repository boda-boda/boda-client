import React from 'react';
import ArrowDown from '../../svgs/arrow-down-svg';
import ArrowUp from '../../svgs/arrow-up-svg';
import CloseIconSVG from '../../svgs/close-icon-svg';
import Link from 'next/link';
import * as S from './styles';
import { useConsultRequest, useHeader } from './hooks';

export default function Header() {
  const {
    name,
    password,
    careCenter,
    handleLogin,
    handlePressEnter,
    isRequestingLogin,
    handleLogout,
    updateUsername,
    updatePassword,
    isMenuModalOn,
    isLoginModalOn,
    setIsLoginModalOn,
    handleMenuClick,
  } = useHeader();

  const { contact, handleContactUpdate, handleConsultRequest } = useConsultRequest();

  return (
    <>
      <S.Header>
        <S.InnerContent>
          <Link href="/" passHref>
            <S.StyledLink>
              <S.Logo>
                <S.LogoImg src="https://user-images.githubusercontent.com/52532871/110198039-f07d4a80-7e92-11eb-9501-241d562b71b1.png" />
              </S.Logo>
            </S.StyledLink>
          </Link>
          <S.MenuList>
            <Link href="/search" passHref>
              <S.MenuItem onClick={() => handleMenuClick(0)}>
                신규 요양보호사 검색
                {/* {isMenuModalOn[0] ? (
                <>
                  <ArrowUp />
                  <S.MenuModal>
                    <Link href="/search" passHref>
                      <S.StyledLink>요양보호사 검색</S.StyledLink>
                    </Link>
                    <S.MenuBar />
                    <Link href="/" passHref>
                      <S.StyledLink>보낸 제안서 목록</S.StyledLink>
                    </Link>
                  </S.MenuModal>
                </>
              ) : (
                <ArrowDown />
              )} */}
              </S.MenuItem>
            </Link>
            <S.MenuItem
              onClick={() => {
                if (!careCenter.isValidating && !careCenter.isLoggedIn) {
                  setIsLoginModalOn(true);
                  handleMenuClick(-1);
                  return;
                }
                handleMenuClick(1);
              }}
            >
              나의 요양보호사 관리
              {!careCenter.isValidating && careCenter.isLoggedIn && isMenuModalOn[1] ? (
                <>
                  <ArrowUp />
                  <S.MenuModal>
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
              <S.MenuItem onClick={() => handleMenuClick(2)}>
                나의 센터 정보
                {isMenuModalOn[2] ? (
                  <>
                    <ArrowUp />
                    <S.MenuModal>
                      <Link href="/mycenter" passHref>
                        <S.StyledLink>나의 센터 정보</S.StyledLink>
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
              <S.MenuItem
                onClick={() => {
                  setIsLoginModalOn(true);
                  handleMenuClick(-1);
                }}
              >
                로그인 / 이용 신청
              </S.MenuItem>
            )}
          </S.MenuList>
        </S.InnerContent>
        {isLoginModalOn && (
          <S.LoginModalLayout>
            <S.LoginModal>
              <CloseIconSVG
                style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }}
                onClick={() => setIsLoginModalOn(false)}
              />
              <S.LoginModalInnerContent>
                <S.LoginModalTitle>로그인 및 이용 신청</S.LoginModalTitle>
                <S.LoginModalSubtitle>
                  <span>보다</span>의 회원이신가요?
                </S.LoginModalSubtitle>
                <S.StringInput
                  value={name}
                  onKeyDown={handlePressEnter}
                  onChange={updateUsername}
                  placeholder="아이디 입력"
                />
                <S.StringInput
                  value={password}
                  onChange={updatePassword}
                  onKeyDown={handlePressEnter}
                  type="password"
                  placeholder="비밀번호 입력"
                />
                <div style={{ marginBottom: '21px' }}>
                  <input type="checkbox" id="login-save" />
                  <S.LoginSaveLabel htmlFor="login-save">자동 로그인</S.LoginSaveLabel>
                </div>
                <S.LoginModalButton disabled={isRequestingLogin} onClick={handleLogin}>
                  로그인
                </S.LoginModalButton>
                <S.LoginModalBar />
                <S.LoginModalSubtitle>
                  <span>보다</span>가 처음이신가요?
                </S.LoginModalSubtitle>
                <S.LoginModalText>
                  아래에 연락처를 남겨 주시면 상담 연락 드리겠습니다.
                </S.LoginModalText>
                <S.StringInput
                  value={contact}
                  onChange={handleContactUpdate}
                  type="string"
                  placeholder="연락처 입력"
                />
                <S.LoginModalButton onClick={handleConsultRequest}>
                  이용 신청하기
                </S.LoginModalButton>
              </S.LoginModalInnerContent>
            </S.LoginModal>
          </S.LoginModalLayout>
        )}
      </S.Header>
    </>
  );
}
