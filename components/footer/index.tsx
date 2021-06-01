import { Tab } from '@material-ui/core';
import React from 'react';
import { PRIVACY_POLICY_URL } from '../../constant';
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
            전자우편주소 : help@dol-bom.com
          </S.Text>
          <S.FooterBar />
          <S.BottomContainer>
            <S.Text>Copyright ⓒ Oopsydaisy.Inc &nbsp; All rights reserved.</S.Text>
            <S.PolicyContiner>
              <S.StyledLink href={PRIVACY_POLICY_URL}>
                <S.PolicyText>개인정보처리방침</S.PolicyText>
              </S.StyledLink>
              <S.PolicyText>이용약관</S.PolicyText>
            </S.PolicyContiner>
          </S.BottomContainer>
        </S.InnerContent>
      </S.Footer>
    </>
  );
}
