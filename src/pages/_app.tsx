import React from 'react';
import '@/styles/globals.css';
import { AppProps } from 'next/app';
import { UsersProvider } from '@/context/UsersContext';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UsersProvider>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </UsersProvider>
  );
}
