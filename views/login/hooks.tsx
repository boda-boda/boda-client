import { useCallback, useState } from 'react';
import axios from 'axios';
import { useCareCenterDispatch } from '../../context/care-center';
import { addSeconds } from 'date-fns';
import { useRouter } from 'next/router';

export function useLogin() {
  const router = useRouter();
  const [isRequestingLogin, setIsRequestingLogin] = useState(false);
  const [isRequestingEmail, setIsRequestingEmail] = useState(false);
  const [contact, setContact] = useState('');
  const handleContactUpdate = useCallback((e: any) => {
    setContact(e.target.value);
  }, []);

  const handleConsultRequest = useCallback(async () => {
    if (!contact) {
      alert('연락처를 입력해 주세요.');
      return;
    }

    try {
      await axios.post('/consult', {
        contact,
      });
    } catch (e) {
      alert(
        '서버에 오류가 발생하였습니다. 하단의 메일 혹은 전화로 문의 주시면 정말 감사드리겠습니다.'
      );
      return;
    }

    alert('요청이 완료되었습니다.');
    setContact('');
  }, [contact]);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [forgotEmail, setForgotEmail] = useState('');

  const careCenterDispatch = useCareCenterDispatch();

  const updateUsername = useCallback((e: any) => {
    setName(e.target.value.trim());
  }, []);

  const updatePassword = useCallback((e: any) => {
    setPassword(e.target.value.trim());
  }, []);

  const handleLogin = useCallback(async () => {
    if (isRequestingLogin) return;
    setIsRequestingLogin(true);

    if (!name.trim()) {
      alert('아이디를 입력해 주세요.');
      setIsRequestingLogin(false);
      return;
    }

    if (!password.trim()) {
      alert('비밀번호를 입력해 주세요.');
      setIsRequestingLogin(false);
      return;
    }

    if (name.trim() !== name || password.trim() !== password) {
      alert('아이디와 비밀번호는 공백문자를 포함할 수 없습니다.');
      setIsRequestingLogin(false);
      return;
    }

    try {
      const loginResponse = await axios.post(`/auth/login`, {
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
      alert(`${loginResponse.data.careCenter.name}님, 환영합니다`);
      router.replace('/list');
    } catch (e) {
      if (e.response) {
        switch (e.response.status) {
          case 400:
          case 401:
          case 404:
            alert(e.response.data?.message);
            break;
          default:
            alert('서버에 오류가 발생하였습니다. 잠시후 다시 시도해주세요.');
        }
      } else {
        alert('서버에 오류가 발생하였습니다. 잠시후 다시 시도해주세요.');
      }
      setIsRequestingLogin(false);
      return;
    }

    setIsRequestingLogin(false);
  }, [name, password]);

  const handlePressEnter = useCallback(
    (e: any) => {
      if (e.key === 'Enter') handleLogin();
    },
    [handleLogin]
  );

  const handleSendEmail = async () => {
    try {
      setIsRequestingEmail(true);
      const response = await axios.post(`/auth/reset-password/email`, {
        email: forgotEmail,
      });
      setIsRequestingEmail(false);
      alert('이메일을 발송했습니다. 메일함을 확인해주세요.');
    } catch (e) {
      setIsRequestingEmail(false);
      if (e.response) {
        switch (e.response.status) {
          case 400:
            alert('이메일 형식이 잘못되었습니다.');
            break;
          case 401:
            alert('이메일 형식이 잘못되었습니다.');
            break;
          case 404:
            alert('등록되지 않은 이메일입니다.');
            break;
          default:
            alert('서버에 오류가 발생하였습니다. 잠시후 다시 시도해주세요.');
        }
      }
    }
  };

  const [forgotPassword, setForgotPassword] = useState(false);

  return {
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
  };
}
