import React from 'react';
import * as S from './styles';

export default function Footer() {
  return (
    <>
      <S.Footer>
        <S.InnerContent>
          <S.Text>
            <span>돌봄</span> | 대표이사 : 김예지 | 개인정보관리책임자 : 백종근
            <br />
            사업자번호 : 825-88-02119
            <br />
            정보 조회
          </S.Text>
          <S.FooterBar />
          <S.Text>Copyright ⓒ dolbom. All rights reserved.</S.Text>
        </S.InnerContent>
      </S.Footer>
    </>
  );
}
