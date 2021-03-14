import axios from 'axios';
import addSeconds from 'date-fns/addSeconds';
import { useEffect } from 'react';
import { useCareCenter, useCareCenterDispatch } from '../../context/care-center';

export const useSoftRefresh = () => {
  const careCenter = useCareCenter();
  const careCenterDispatch = useCareCenterDispatch();

  useEffect(() => {
    (async () => {
      if (!careCenter) return;
      if (!careCenter.isValidating) return;
      if (careCenter.expiresIn > new Date()) return; // 현재 토큰이 활성화되어 있으면 요청을 할 이유가 없음

      try {
        const response = await axios.post('/api/auth/refresh');
        const statusCode = response.data.statusCode;

        // accessToken을 다시 요청할 때 실패시 slient하게 하기 위해 오류 던지지 않고 콘솔로 대체
        if (statusCode >= 400) {
          switch (statusCode) {
            case 400:
              break;
            case 401:
              alert('자동 로그인 세션이 만료되어 로그아웃되었습니다.');
          }
          throw new Error();
        }

        axios.defaults.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
        careCenterDispatch({
          type: 'LOGIN',
          payload: {
            accessToken: response.data.accessToken,
            expiresIn: addSeconds(Date.now(), parseInt(response.data.expiresIn)),
            careCenter: response.data.careCenter,
          },
        });
      } catch (e) {
        careCenterDispatch({
          type: 'LOGOUT',
        });
      }
    })();
  }, []);
};
