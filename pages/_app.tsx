import { AppProps } from 'next/app';
import { CareCenterProvider } from '../context/care-center';
import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_HOST;
axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/json';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CareCenterProvider
      careCenter={{
        isValidating: true,
        isLoggedIn: false,
      }}
    >
      <Component {...pageProps} />
    </CareCenterProvider>
  );
}
