import Layout from '../../components/layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useCareCenter } from '../../context/care-center';
import { useSoftRefresh } from '../../common/hooks/auth';

export default function ErrorPage() {
  const router = useRouter();
  const careCenter = useCareCenter();

  useSoftRefresh();

  useEffect(() => {
    if (careCenter.isValidating) return;

    if (router.asPath) {
      router.push(router.asPath);
    }
  }, [careCenter, router]);

  if (careCenter.isValidating) {
    return <div></div>;
  }

  return (
    <>
      <Head>
        <title>돌봄</title>
      </Head>
      <Layout>
        <></>
      </Layout>
    </>
  );
}
