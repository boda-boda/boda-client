import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useCareCenterDispatch } from '../../context/care-center';

export const useEditPassword = () => {
  const router = useRouter();
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [originalPassword, setOriginalPassword] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [isPasswordModalOn, setPasswordModalOn] = useState(false);

  const careCenterDispatch = useCareCenterDispatch();

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

    // TODO: 비밀번호 복잡도 설정
    if (password.length < 8) {
      alert('비밀번호는 8자 이상으로 하셔야 합니다.');
      return;
    }

    if (!checkPassword) {
      alert('확인 비밀번호를 입력해 주세요.');
      return;
    }

    if (password !== checkPassword) {
      alert('두 비밀번호가 일치하지 않습니다.');
      return;
    }
    setIsUpdatingPassword(true);

    try {
      await axios.post('/auth/reset-password', {
        password: originalPassword,
        newPassword: password,
      });
    } catch (e) {
      if (e.response) {
        switch (e.response?.status) {
          case 401:
            alert('입력하신 기존 비밀번호가 일치하지 않습니다.');
            break;
          case 404:
            alert('사용자 정보가 존재하지 않습니다.');
            break;
          default:
            alert('비밀번호 변경에 실패하였습니다. 관리자에게 문의 부탁드립니다.');
            break;
        }
      }
      return;
    }

    alert('비밀번호 변경에 성공하였습니다. 변경된 비밀번호로 다시 로그인 부탁드립니다.');
    window.location.replace('/');
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
    isUpdatingPassword,
  };
};
