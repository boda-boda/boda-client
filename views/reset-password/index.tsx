import * as S from './styles';
import Layout from '../../components/layout';
import Banner from '../../components/banner';
import { BannerStyleType } from '../../common/types';
import Category from '../../components/category';
import Head from 'next/head';

export default function ResetPassword() {
  return (
    <>
      <Head>
        <title>돌봄: 비밀번호 재설정</title>
      </Head>
      <Layout>
        <>
          <Banner
            bannerStyle={BannerStyleType.SECTION}
            sectionIndex={1}
            title="비밀번호 재설정"
            subtitle="비밀번호를 잊어버리셨나요?#새로운 비밀번호를 설정해주세요."
          />
          <Category list={['홈', '비밀번호 재설정']} />

          <S.InnerContent>
            <S.ResetPassword>
              <S.Title>새 비밀번호 설정</S.Title>
              <S.Text>
                안전한 이용을 위해 알파벳, 숫자, 특수문자(!, @, #, * 등)가 혼합된 10자 이상의
                비밀번호 설정을 권장합니다.
              </S.Text>
              <S.StringInput type="password" placeholder="새 비밀번호" />
              <S.StringInput type="password" placeholder="새 비밀번호 확인" />
              <S.SubmitButton>확인</S.SubmitButton>
            </S.ResetPassword>
          </S.InnerContent>
        </>
      </Layout>
    </>
  );
}
