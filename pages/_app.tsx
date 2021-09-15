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
    if (process.env.NODE_ENV !== 'development') disableReactDevTools();
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
          content="부모님을 위한 최고의 선택, 프리미엄 방문요양 서비스 돌봄"
        />
        <meta
          property="og:description"
          content="부모님을 위한 최고의 선택, 프리미엄 방문요양 서비스 돌봄"
        />
        <meta
          property="og:image"
          content="https://user-images.githubusercontent.com/52532871/113498681-1b1dfa00-954a-11eb-9c0f-25aab2033c56.jpg"
        />
        <meta name="viewport" content="width=device-width, initial-scale=0.3, maximum-scale=1" />
      </Head>
      <Component {...pageProps} />
    </CareCenterProvider>
  );
}
