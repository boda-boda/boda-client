import axios from 'axios';
import { useCallback, useState } from 'react';

export const useEditPassword = () => {
  const [originalPassword, setOriginalPassword] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [isPasswordModalOn, setPasswordModalOn] = useState(false);

  const onChangeOriginalPassword = useCallback((e: any) => {
    setOriginalPassword(e.target.value);
  }, []);

  const onChangePassword = useCallback((e: any) => {
    setPassword(e.target.value);
  }, []);

  const onChangeCheckPassword = useCallback((e: any) => {
    setCheckPassword(e.target.value);
  }, []);

  const onClickEditPassword = useCallback(async () => {
    //axios로 현재 비번 체크하고 아니면 return하기?

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

    //비번 변경 ㄱㄱ

    alert('비밀번호 변경에 성공하였습니다.');
    setPasswordModalOn(false);
  }, [password, checkPassword]);

  return {
    isPasswordModalOn,
    setPasswordModalOn,
    originalPassword,
    password,
    onChangeOriginalPassword,
    checkPassword,
    onChangePassword,
    onClickEditPassword,
    onChangeCheckPassword,
  };
};
