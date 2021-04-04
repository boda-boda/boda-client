import React from 'react';
import ArrowDown from '../../svgs/arrow-down-svg';
import ArrowUp from '../../svgs/arrow-up-svg';
import CloseIconSVG from '../../svgs/close-icon-svg';
import SpinnerSVG from '../../svgs/spinner-svg';
import Link from 'next/link';
import * as S from './styles';
import { useHeader } from './hooks';

export default function Header() {
  const {
    name,
    password,
    careCenter,
    handleLogin,
    handlePressEnter,
    isRequestingLogin,
    isRequestingEmail,
    handleLogout,
    updateUsername,
    updatePassword,
    isMenuModalOn,
    isLoginModalOn,
    setIsLoginModalOn,
    handleMenuClick,
    contact,
    setContact,
    handleContactUpdate,
    handleConsultRequest,
    forgotPassword,
    setForgotPassword,
    forgotEmail,
    setForgotEmail,
    handleSendEmail,
  } = useHeader();

  return (
    <>
      <S.Header>
        <S.InnerContent>
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
                  setIsLoginModalOn(true);
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
                <ArrowUp />
              ) : (
                <ArrowDown />
              )}
              <S.MenuModal isMenuModalOn={isMenuModalOn[1]}>
                <Link href="/list" passHref>
                  <S.StyledLink>요양보호사 목록</S.StyledLink>
                </Link>
                <S.MenuBar />
                <Link href="/new" passHref>
                  <S.StyledLink>요양보호사 추가</S.StyledLink>
                </Link>
              </S.MenuModal>
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
                {isMenuModalOn[2] ? <ArrowUp /> : <ArrowDown />}
                <S.MenuModal isMenuModalOn={isMenuModalOn[2]}>
                  <Link href="/mycenter" passHref>
                    <S.StyledLink>나의 센터 정보</S.StyledLink>
                  </Link>
                  <S.MenuBar />
                  <S.LogoutButton onClick={handleLogout}>로그아웃</S.LogoutButton>
                </S.MenuModal>
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
                onClick={() => {
                  setIsLoginModalOn(false);
                  setForgotPassword(false);
                  setContact('');
                }}
              />
              <S.LoginModalInnerContent>
                {forgotPassword ? (
                  <>
                    <S.LoginModalTitle>로그인 및 이용 신청</S.LoginModalTitle>
                    <S.LoginModalSubtitle>
                      <span>비밀번호</span>를 잊어버리셨나요?
                    </S.LoginModalSubtitle>
                    <S.LoginModalText>
                      회원가입하신 이메일을 입력해주세요.
                      <br />
                      비밀번호를 재설정할 수 있는 링크를 보내드립니다.
                    </S.LoginModalText>
                    <S.StringInput
                      value={forgotEmail}
                      onChange={(e) => {
                        setForgotEmail(e.target.value);
                      }}
                      placeholder="이메일 입력"
                    />
                    <S.LoginModalButton onClick={handleSendEmail} disabled={isRequestingEmail}>
                      {isRequestingEmail ? (
                        <S.SpinnerContainer>
                          <SpinnerSVG />
                        </S.SpinnerContainer>
                      ) : (
                        '확인'
                      )}
                    </S.LoginModalButton>
                    <S.ForgotPasswordText onClick={() => setForgotPassword(false)}>
                      {'>'}
                      <span>로그인하러 가기</span>
                    </S.ForgotPasswordText>
                  </>
                ) : (
                  <>
                    <S.LoginModalTitle>로그인 및 이용 신청</S.LoginModalTitle>
                    <S.LoginModalSubtitle>
                      <span>돌봄</span>의 회원이신가요?
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
                    <S.ForgotPasswordText onClick={() => setForgotPassword(true)}>
                      !<span>비밀번호를 잊어버리셨나요?</span>
                    </S.ForgotPasswordText>
                  </>
                )}
                <S.LoginModalBar />
                <S.LoginModalSubtitle>
                  <span>돌봄</span>이 처음이신가요?
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
