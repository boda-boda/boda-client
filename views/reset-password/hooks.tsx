import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

export const useResetPassword = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const onChangePassword = useCallback((e: any) => {
    setPassword(e.target.value);
  }, []);

  const onChangeCheckPassword = useCallback((e: any) => {
    setCheckPassword(e.target.value);
  }, []);

  useEffect(() => {
    if (!router.query.ID || !router.query.KEY) {
      return;
    }

    if (isNaN(Number(router.query.ID as string))) {
      router.push('/');
    }
  }, []);

  const onClickResetPassword = useCallback(async () => {
    if (!router.query.ID || !router.query.KEY) {
      alert("올바르지 않은 링크로부터의 접근입니다. 비밀번호 변경 요청을 처음부터 다시 시도해주세요.") // prettier-ignore
      router.push('/');
      return;
    }

    if (!password) {
      alert('비밀번호를 입력해 주세요.');
      return;
    }

    if (!checkPassword) {
      alert('확인 비밀번호를 입력해 주세요.');
      return;
    }
    // TODO: 비밀번호 복잡도 설정

    if (password !== checkPassword) {
      alert('두 비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await axios.post(`/auth/reset-password/email/challenge`, {
        id: Number(router.query.ID),
        password,
        key: router.query.KEY,
      });
    } catch (e) {
      if (e.response) {
        switch (e.response.status) {
          case 400:
            alert('패스워드 형식이 잘못되었습니다.\n특수문자와 영문자를 포함한 10자 이상의 문자를 이용해주세요.'); // prettier-ignore
            break;
          case 401:
            alert('올바르지 않은 url 입니다. 비밀번호 변경 요청을 처음부터 다시 시도해주세요.');
            router.push('/');
            break;
          case 403:
            alert('이미 비밀번호 변경에 사용된 url입니다. 비밀번호 변경 요청을 처음부터 다시 시도해주세요.'); // prettier-ignore
            router.push('/');
            break;
          case 410:
            alert('인증 제한 시간 5분이 초과되었습니다. 비밀번호 변경 요청을 처음부터 다시 시도해주세요.'); // prettier-ignore
            router.push('/');
            break;
          default:
            alert('인증 과정에서 오류가 발생하였습니다. \n관리자에게 문의 주시면 빠르게 응대해드리겠습니다.\n 더욱 발전하는 서비스가 되도록 항상 노력하겠습니다.'); // prettier-ignore
        }
        return;
      }
    }

    alert('비밀번호 변경에 성공하였습니다.');
    router.push('/');
  }, [password, checkPassword]);

  return {
    password,
    checkPassword,
    onChangePassword,
    onClickResetPassword,
    onChangeCheckPassword,
  };
};
