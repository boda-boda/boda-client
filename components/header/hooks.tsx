import { useCallback, useState } from 'react';
import axios from 'axios';
import { useCareCenter, useCareCenterDispatch } from '../../context/care-center';
import { addSeconds } from 'date-fns';
import { useRouter } from 'next/router';

export function useHeader() {
  const router = useRouter();

  const [isMenuModalOn, setIsMenuModalOn] = useState([false, false, false]);

  const careCenter = useCareCenter();
  const careCenterDispatch = useCareCenterDispatch();

  const handleLogout = useCallback(async () => {
    try {
      await axios.post('/auth/logout');
    } catch (e) {
      alert('로그아웃에 실패하였습니다. 관리자에게 문의 부탁드립니다.');
      return;
    }

    careCenterDispatch({
      type: 'LOGOUT',
    });
    alert('로그아웃 되었습니다.');
    router.replace('/');
  }, []);

  const handleMenuClick = (i: number) => {
    setIsMenuModalOn((isModalOn) =>
      isModalOn.map((item, index) => {
        if (index === i) return !item;
        return false;
      })
    );
  };

  return {
    careCenter,
    handleLogout,
    isMenuModalOn,
    handleMenuClick,
  };
}
