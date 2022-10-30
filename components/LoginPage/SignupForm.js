import { useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';

const OTPInput = dynamic(() => import('otp-input-react'), {
  // Do not import in server side
  ssr: false,
});

import { useUserContext } from '../../context/UserContext';
import { useRouter } from 'next/router';

const SignupForm = ({ isAnimated, setIsAnimated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpbtn, setotpbtn] = useState(true);
  const [signbtn, setsignbtn] = useState(false);
  const [OTP, setOTP] = useState('');
  const { state, dispatch } = useUserContext();
  const router = useRouter();

  async function otpHandler(e) {
    e.preventDefault();
    try {
      await axios({
        method: 'post',
        url: 'https://tejdhar-otp-service.vercel.app/auth/',
        data: {
          name: name,
          email: email,
        },
      }).then((response) => {
        if (response.data === 'Already existing') {
          alert('User Already exist! Please Sign In Instead');
        } else {
          setotpbtn(false);
          setsignbtn(true);
        }
      });
    } catch (error) {
      alert(error);
    }
  }

  async function verifyOtp(e) {
    e.preventDefault();
    try {
      await axios({
        method: 'post',
        url: 'https://tejdhar-otp-service.vercel.app/auth/verify/',
        data: {
          email: email,
          otp: OTP,
        },
      }).then((response) => {
        if (response.data[0]) {
          alert(`Verification Successfull with OTT ${OTP}`);
          dispatch({ type: 'logged_in', value: { name: name, phone: email } });
          router.push('/');
        } else {
          alert(`Message from Server : ${response.data[1]}`);
        }
      });
    } catch (error) {
      alert('Please enter the correct OTP');
    }
  }
  if (typeof window !== 'undefined') {
    return (
      <div className='selection:bg-indigo-500 selection:text-white'>
        <div className='flex justify-center items-center'>
          <div className='block h-full'>
            <div className='mx-auto overflow-hidden'>
              <div className='p-8'>
                <h1 className='text-xl md:text-4xl lg:text-5xl font-bold text-black '>
                  Create account
                </h1>

                <form className='mt-12' action='' method='POST'>
                  <div className='relative'>
                    <input
                      id='name'
                      name='name'
                      type='text'
                      className='peer h-10 w-full border-b-2 border-black text-black placeholder-transparent focus:outline-none focus:border-indigo-600 bg-transparent'
                      placeholder='Name'
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label
                      htmlFor='name'
                      className='absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-sm'
                    >
                      Name
                    </label>
                  </div>
                  <div className='mt-10 relative'>
                    <input
                      id='email'
                      name='email'
                      type='number'
                      className='peer h-10 w-full border-b-2 border-black text-black placeholder-transparent focus:outline-none focus:border-indigo-600 bg-transparent'
                      placeholder='john@doe.com'
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label
                      htmlFor='email'
                      className='absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-sm'
                    >
                      Mobile Number
                    </label>
                  </div>

                  <div className='flex w-full justify-center items-center'>
                    <button
                      disabled={!otpbtn}
                      name='send otp'
                      className='mt-5 py-1 px-3 rounded-md flex bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-center w-fit focus:outline-none focus:ring focus:ring-offset-2 focus:ring-indigo-500 focus:ring-opacity-80 cursor-pointer bg-transparent disabled:bg-gray-400 disabled:cursor-not-allowed'
                      onClick={otpHandler}
                    >
                      send otp
                    </button>
                  </div>

                  <div className='mt-10 flex flex-col w-full  justify-center'>
                    <label
                      htmlFor='password'
                      className='left-0 -top-3.5 text-black transition-all mb-3 text-lg font-semibold peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-sm'
                    >
                      OTP
                    </label>
                    <OTPInput
                      value={OTP}
                      onChange={setOTP}
                      autoFocus
                      OTPLength={6}
                      otpType='number'
                      disabled={!signbtn}
                      className='justify-between flex'
                      inputStyles={{
                        marginRight: '0px',
                        backgroundColor: 'none',
                      }}
                    />
                  </div>

                  <input
                    onClick={verifyOtp}
                    disabled={!signbtn}
                    type='submit'
                    value='Sign up'
                    className='mt-20 px-8 py-4 uppercase rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-indigo-500 focus:ring-opacity-80 cursor-pointer bg-transparent disabled:bg-opacity-40 disabled:cursor-not-allowed'
                  />
                </form>
                <div className='flex w-full justify-center items-center mt-5 space-x-4'>
                  <p className='text-xs md:text-lg lg:text-lg xl:text-lg'>
                    Already have an account?
                  </p>
                  <button
                    className='px-4 py-2 rounded-lg border-2 border-black font-semibold'
                    onClick={(e) => {
                      setIsAnimated(!isAnimated);
                    }}
                  >
                    Login!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='w-screen h-screen flex justify-center items-center'>
        <p className='text-lg font-bold animate-ping'>Loading</p>
      </div>
    );
  }
};

export default SignupForm;
