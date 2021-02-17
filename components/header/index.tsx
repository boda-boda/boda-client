import React, { useState } from 'react';
import ArrowDown from '../../svgs/arrow-down-svg';
import ArrowUp from '../../svgs/arrow-up-svg';
import CloseIconSVG from '../../svgs/close-icon-svg';
import Link from 'next/link';
import * as S from './styles';

export default function Header() {
  const [isMenuModalOn, setIsMenuModalOn] = useState([false, false, false]);
  const [isLoginModalOn, setIsLoginModalOn] = useState(false);
  const [isLogined, setIsLogined] = useState(true); //이거는 ㄹㅇ 임시
  const handleMenuClick = (i: number) => {
    setIsMenuModalOn((isModalOn) =>
      isModalOn.map((item, index) => {
        if (index === i) return !item;
        return false;
      })
    );
  };
  return (
    <>
      <S.Header>
        <S.InnerContent>
          <Link href="/" passHref>
            <S.StyledLink>
              <S.Logo>
                <S.LogoImg src={'https://cdn.worldvectorlogo.com/logos/chanel-2.svg'} />
              </S.Logo>
            </S.StyledLink>
          </Link>
          <S.MenuList>
            <S.MenuItem onClick={() => handleMenuClick(0)}>
              신규 요양보호사 추가
              {isMenuModalOn[0] ? (
                <>
                  <ArrowUp />
                  <S.MenuModal>
                    <Link href="/caregiverlist" passHref>
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
              )}
            </S.MenuItem>
            <S.MenuItem onClick={() => handleMenuClick(1)}>
              나의 요양보호사 관리
              {isMenuModalOn[1] ? (
                <>
                  <ArrowUp />
                  <S.MenuModal>
                    <Link href="/mycaregiverlist" passHref>
                      <S.StyledLink>요양보호사 목록</S.StyledLink>
                    </Link>
                    <S.MenuBar />
                    <Link href="/" passHref>
                      <S.StyledLink>요양보호사 추가</S.StyledLink>
                    </Link>
                  </S.MenuModal>
                </>
              ) : (
                <ArrowDown />
              )}
            </S.MenuItem>
            {isLogined ? (
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
                      <Link href="/" passHref>
                        <S.StyledLink>수급자 관리</S.StyledLink>
                      </Link>
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
                <S.StringInput type="string" placeholder="아이디 입력" />
                <S.StringInput type="password" placeholder="비밀번호 입력" />
                <div style={{ marginBottom: '21px' }}>
                  <input type="checkbox" id="login-save" />
                  <S.LoginSaveLabel htmlFor="login-save">자동 로그인</S.LoginSaveLabel>
                </div>
                <S.LoginModalButton>로그인</S.LoginModalButton>
                <S.LoginModalBar />
                <S.LoginModalSubtitle>
                  <span>보다</span>가 처음이신가요?
                </S.LoginModalSubtitle>
                <S.LoginModalText>
                  아래에 연락처를 남겨 주시면 상담 연락 드리겠습니다.
                </S.LoginModalText>
                <S.StringInput type="string" placeholder="연락처 입력" />
                <S.LoginModalButton>이용 신청하기</S.LoginModalButton>
              </S.LoginModalInnerContent>
            </S.LoginModal>
          </S.LoginModalLayout>
        )}
      </S.Header>
    </>
  );
}
