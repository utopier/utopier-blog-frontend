/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, ThemeProvider } from '@emotion/react'

import { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import ErrorBoundary from '../components/ErrorBoundary'

import AppLayout from '../components/AppLayout';

import GlobalStyles from '../styles/GlobalStyles';
import theme from '../styles/Theme';

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
      <ErrorBoundary>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <AppLayout>
            <Component {...pageProps}/>
          </AppLayout>      
        </ThemeProvider>
      </ErrorBoundary>
    )
  }
  
  export default wrapper.withRedux(MyApp);
