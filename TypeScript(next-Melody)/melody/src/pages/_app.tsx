import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../redux/store';
import initAuth from '../utils/initAuth';
import '../styles/globals.css';
import { useEffect } from 'react';
import FloatingPlayer from '@/components/FloatingPlayer';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const dispatch = store.dispatch;
    initAuth(dispatch);
  }, []);

  return (
    <Provider store={store}>
      <>
        <Component {...pageProps} />
        <FloatingPlayer />
      </>
    </Provider>
  );
}

export default MyApp;

