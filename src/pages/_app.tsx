import '@/styles/globals.css';
import { AppProps } from 'next/app';
import { UsersProvider } from '@/context/UsersContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UsersProvider>
      <Component {...pageProps} />
    </UsersProvider>
  );
}
