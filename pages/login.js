import Head from 'next/head';
import { LoginPage } from '../components';
import { useRouter } from 'next/router';
import { useUserContext } from '../context/UserContext';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const { state, dispatch } = useUserContext();
  const [show, setShow] = useState(false);
  /* 
  useEffect(() => {
    if (state !== undefined) {
      if (state.user.userAvailable) {
        router.push('/');
      }
    }
  }, [state]); */

  if (typeof window !== 'undefined') {
    if (!JSON.parse(localStorage.getItem('state')).user.userAvailable) {
      return (
        <div className='flex flex-col items-center justify-center h-screen w-full '>
          <Head>
            <title>Slider Login / Signup</title>
            <link rel='icon' href='/favicon.ico' />
          </Head>

          <LoginPage />
        </div>
      );
    } else {
      router.push('/');
      return (
        <div className='h-screen w-screen flex justify-center items-center'>
          <p className='text-lg font-bold'>Loading...</p>
        </div>
      );
    }
  } else {
    return (
      <div className='h-screen w-screen flex justify-center items-center'>
        <p className='text-lg font-bold'>Loading...</p>
      </div>
    );
  }
}
