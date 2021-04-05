import { AppProps } from 'next/app';
import { useEffect } from 'react';

import AppLayout from '../components/AppLayout';

import GlobalStyles from '../styles/GlobalStyles';

import wrapper from '../store';

function MyApp({ Component, pageProps }:AppProps) {
    useEffect(() => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then((registration) => {
            console.log('service worker registration : ', registration);
            console.log('service worker registration successful');
          })
          .catch((err) => {
            console.warn('service worker registration failed', err.message);
          });
      }
    }, []);
    return (
      <>
        <GlobalStyles />
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </>
    )
  }
  
  export default wrapper.withRedux(MyApp);
