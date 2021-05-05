import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { CareCenter } from '../../model/care-center';

export const usePrivatePage = (careCenter: CareCenter) => {
  const router = useRouter();

  useEffect(() => {
    if (careCenter.isValidating) return;
    if (!careCenter.isLoggedIn) {
      alert('로그인이 필요합니다.');
      router.push('/');
    }
  }, [careCenter]);

  return {
    careCenter,
  };
};
