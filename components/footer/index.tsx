import React from 'react';
import * as S from './styles';

export default function Footer() {
  return (
    <>
      <S.Footer>
        <S.InnerContent>
          <S.Text>
            <span>BoDa</span> | 대표이사 : 김예지 | 개인정보관리책임자 : 백종근
            <br />
            사업자번호 : 252-63-00514 | 통신판매업 신고 번호 : 제 2017-서울강남-00000호
            <br />
            정보 조회
          </S.Text>
          <S.FooterBar />
          <S.Text>Copyright ⓒ BoDa. All rights reserved.</S.Text>
        </S.InnerContent>
      </S.Footer>
    </>
  );
}
