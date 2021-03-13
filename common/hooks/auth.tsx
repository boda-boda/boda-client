import axios from 'axios';
import addSeconds from 'date-fns/addSeconds';
import { useEffect } from 'react';
import { useCareCenter, useCareCenterDispatch } from '../../context/care-center';

export const useSoftRefresh = () => {
  const careCenter = useCareCenter();
  const careCenterDispatch = useCareCenterDispatch();

  useEffect(() => {
    (async () => {
      if (!careCenter.isValidating) return;
      if (careCenter && careCenter.expiresIn > new Date()) return; // 현재 토큰이 활성화되어 있으면 요청을 할 이유가 없음

      try {
        const respose = await axios.post('/api/auth/refresh');
        axios.defaults.headers['Authorization'] = `Bearer ${respose.data.accessToken}`;
        careCenterDispatch({
          type: 'LOGIN',
          payload: {
            accessToken: respose.data.accessToken,
            expiresIn: addSeconds(Date.now(), parseInt(respose.data.expiresIn)),
            careCenter: respose.data.careCenter,
          },
        });
      } catch ({ response }) {
        switch (response.status) {
          case 401:
          case 400:
            break;
          default:
            console.log('TOKEN REFRESH');
            console.log('예측할 수 없는 오류입니다. 관리자에게 문의 부탁드립니다.');
        }
        careCenterDispatch({
          type: 'LOGOUT',
        });
      }
    })();
  });
};
