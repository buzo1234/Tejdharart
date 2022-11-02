import Head from 'next/head';
import { Footer, LoginPage } from '../components';
import { useRouter } from 'next/router';
import { useUserContext } from '../context/UserContext';
import { useEffect, useState } from 'react';
import { useStateContext } from '../context/StateContext';
export default function Home() {
  const { cat } = useStateContext();
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
        <div className=' h-full w-screen flex flex-col '>
          <Head>
            <title>Login | Tejdharart</title>
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <div className='flex flex-col w-screen h-[800px] justify-center items-center'>
            <LoginPage />
          </div>

          <Footer data={cat} />
        </div>
      );
    } else {
      router.push('/');
      return (
        <div className='h-full w-screen flex flex-col justify-center items-center'>
          <p className='text-lg font-bold'>Loading...</p>
        </div>
      );
    }
  } else {
    return (
      <div className='h-full w-screen flex flex-col justify-center items-center'>
        <p className='text-lg font-bold'>Loading...</p>
      </div>
    );
  }
}
