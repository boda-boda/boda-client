import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const resetPassword = () => {
  const router = useRouter();
  useEffect(() => {
    if (!router.query.ID || !router.query.KEY) return;
    (async () => {
      try {
        await axios.get(`/reset-password/${router.query.ID}/${router.query.KEY}`);
      } catch (e) {
        alert('잘못된 접근입니다.');
        router.push('/');
      }
    })();
  }, []);
  return [];
};
