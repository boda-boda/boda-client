import { AppProps } from 'next/app';
import { CareCenterProvider } from '../context/care-center';
import axios from 'axios';
import Head from 'next/head';
import { useEffect } from 'react';
import { disableReactDevTools } from '../common/lib/devtool';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_HOST;
axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/json';

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    disableReactDevTools();
  }, []);

  return (
    <CareCenterProvider
      careCenter={{
        isValidating: true,
        isLoggedIn: false,
      }}
    >
      <Head>
        <meta
          name="description"
          content="간편하게 원하는 요양보호사를 탐색해보세요! 재가센터의 요양보호사 관리 및 매칭서비스, 돌봄입니다."
        />
        <meta
          property="og:description"
          content="간편하게 원하는 요양보호사를 탐색해보세요! 재가센터의 요양보호사 관리 및 매칭서비스, 돌봄입니다."
        />
        <meta
          property="og:image"
          content="https://user-images.githubusercontent.com/52532871/111497282-51a2f900-8784-11eb-93ff-1b699a13b582.png"
        />
      </Head>
      <Component {...pageProps} />
    </CareCenterProvider>
  );
}
