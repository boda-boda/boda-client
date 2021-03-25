import Layout from '../../components/layout';
import Banner from '../../components/banner';
import { BannerStyleType } from '../../common/types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Main() {
  const router = useRouter();

  useEffect(() => {
    if (router.asPath) {
      router.push(router.asPath);
    }
  }, [router]);

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
