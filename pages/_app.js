import React from 'react';
import { Toaster } from 'react-hot-toast';

import { Layout } from '../components';
import '../styles/globals.css';
import '../components/allStyles.css';

import { StateContext } from '../context/StateContext';
import { UserWrapper } from '../context/UserContext';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  if (typeof window !== 'undefined') {
    if (localStorage.getItem('state')) {
      if (localStorage.getItem('state').user) {
        if (
          localStorage.getItem('state').user.userAvailable === true &&
          router.pathname === '/login'
        ) {
          router.push('/');
        }
      }
    }
  }
  return (
    <UserWrapper>
      <StateContext>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </UserWrapper>
  );
}

export default MyApp;
