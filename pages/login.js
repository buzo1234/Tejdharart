import Head from 'next/head';
import { Footer, LoginPage } from '../components';
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
        <div className=' h-full w-screen '>
          <Head>
            <title>Slider Login / Signup</title>
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <div className='flex flex-col w-screen h-screen justify-center items-center'>
            <LoginPage />
          </div>

          <Footer />
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
