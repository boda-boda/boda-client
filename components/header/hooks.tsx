import { useCallback, useState } from 'react';
import axios from 'axios';
import { useCareCenter, useCareCenterDispatch } from '../../context/care-center';
import { addSeconds } from 'date-fns';
import { useRouter } from 'next/router';

export default function useHeader() {
  const router = useRouter();

  const [isMenuModalOn, setIsMenuModalOn] = useState([false, false, false]);
  const [isLoginModalOn, setIsLoginModalOn] = useState(false);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const careCenter = useCareCenter();
  const careCenterDispatch = useCareCenterDispatch();

  const updateUsername = useCallback((e: any) => {
    setName(e.target.value.trim());
  }, []);

  const updatePassword = useCallback((e: any) => {
    setPassword(e.target.value.trim());
  }, []);

  const handleLogout = useCallback(async () => {
    console.log('Asdf');
    try {
      await axios.post('/api/auth/logout');
    } catch (e) {
      alert('로그아웃에 실패하였습니다. 관리자에게 문의 부탁드립니다.');
      return;
    }

    careCenterDispatch({
      type: 'LOGOUT',
    });
    router.replace('/');
  }, []);

  const handleLogin = useCallback(async () => {
    if (!name.trim()) {
      alert('아이디를 입력해 주세요.');
      return;
    }

    if (!password.trim()) {
      alert('비밀번호를 입력해 주세요.');
      return;
    }

    if (name.trim() !== name || password.trim() !== password) {
      alert('아이디와 비밀번호는 공백문자를 포함할 수 없습니다.');
      return;
    }

    try {
      const loginResponse = await axios.post(`/api/auth/login`, {
        name,
        password,
      });

      axios.defaults.headers['Authorization'] = `Bearer ${loginResponse.data.accessToken}`;
      careCenterDispatch({
        type: 'LOGIN',
        payload: {
          accessToken: loginResponse.data.accessToken,
          expiresIn: addSeconds(Date.now(), parseInt(loginResponse.data.expiresIn)),
          careCenter: loginResponse.data.careCenter,
        },
      });
    } catch ({ response }) {
      switch (response.status) {
        case 404:
        case 401:
        case 400:
          alert(response.data.message);
          break;
        default:
          alert('예측할 수 없는 오류가 발생하였습니다.');
      }
      return;
    }

    setIsLoginModalOn(false);
  }, [name, password]);

  const handleMenuClick = (i: number) => {
    setIsMenuModalOn((isModalOn) =>
      isModalOn.map((item, index) => {
        if (index === i) return !item;
        return false;
      })
    );
  };

  return {
    name,
    password,
    handleLogin,
    handleLogout,
    updateUsername,
    updatePassword,
    isMenuModalOn,
    isLoginModalOn,
    careCenter,
    setIsLoginModalOn,
    handleMenuClick,
  };
}
