import Layout from '../../components/layout';
import SpinnerSVG from '../../svgs/spinner-svg';
import { useLogin } from './hooks';
import * as S from './styles';

export default function LoginPage() {
  const {
    name,
    password,
    handleLogin,
    handlePressEnter,
    isRequestingLogin,
    isRequestingEmail,
    updateUsername,
    updatePassword,
    contact,
    handleContactUpdate,
    handleConsultRequest,
    forgotPassword,
    setForgotPassword,
    forgotEmail,
    setForgotEmail,
    handleSendEmail,
  } = useLogin();

  return (
    <Layout>
      <S.LoginTitle>로그인 및 이용 신청</S.LoginTitle>
      <S.LoginLayout>
        <S.LoginInnerContent>
          {forgotPassword ? (
            <>
              <S.LoginSubtitle>
                <span>비밀번호</span>를 잊어버리셨나요?
              </S.LoginSubtitle>
              <S.LoginText>
                회원가입하신 이메일을 입력해주세요.
                <br />
                비밀번호를 재설정할 수 있는 링크를 보내드립니다.
              </S.LoginText>
              <S.StringInput
                value={forgotEmail}
                onChange={(e) => {
                  setForgotEmail(e.target.value);
                }}
                placeholder="이메일 입력"
              />
              <S.LoginButton onClick={handleSendEmail} disabled={isRequestingEmail}>
                {isRequestingEmail ? (
                  <S.SpinnerContainer>
                    <SpinnerSVG />
                  </S.SpinnerContainer>
                ) : (
                  '확인'
                )}
              </S.LoginButton>
              <S.ForgotPasswordText onClick={() => setForgotPassword(false)}>
                {'>'}
                <span>로그인하러 가기</span>
              </S.ForgotPasswordText>
            </>
          ) : (
            <>
              <S.LoginSubtitle>
                <span>돌봄</span>의 회원이신가요?
              </S.LoginSubtitle>
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
              <S.LoginButton disabled={isRequestingLogin} onClick={handleLogin}>
                로그인
              </S.LoginButton>
              <S.ForgotPasswordText onClick={() => setForgotPassword(true)}>
                !<span>비밀번호를 잊어버리셨나요?</span>
              </S.ForgotPasswordText>
            </>
          )}
        </S.LoginInnerContent>
        <S.LoginInnerContent>
          <S.LoginSubtitle>
            <span>돌봄</span>이 처음이신가요?
          </S.LoginSubtitle>
          <S.LoginText>아래에 연락처를 남겨 주시면 상담 연락 드리겠습니다.</S.LoginText>
          <S.StringInput
            value={contact}
            onChange={handleContactUpdate}
            type="string"
            placeholder="연락처 입력"
          />
          <S.LoginButton onClick={handleConsultRequest}>이용 신청하기</S.LoginButton>
        </S.LoginInnerContent>
      </S.LoginLayout>
    </Layout>
  );
}
