import { useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';

const OTPInput = dynamic(() => import('otp-input-react'), {
  // Do not import in server side
  ssr: false,
});
import { useUserContext } from '../../context/UserContext';
import { useRouter } from 'next/router';

const SigninForm = ({ isAnimated, setIsAnimated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpbtn, setotpbtn] = useState(true);
  const { state, dispatch } = useUserContext();
  const [signbtn, setsignbtn] = useState(false);
  const [OTP, setOTP] = useState('');

  const router = useRouter();

  async function otpHandler(e) {
    e.preventDefault();
    try {
      await axios({
        method: 'post',
        url: 'https://tejdhar-otp-service.vercel.app/auth/signin/',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'DELETE, POST, GET',
          'Access-Control-Allow-Headers':
            'Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization',
        },
        data: {
          email: email,
        },
      }).then((response) => {
        if (response.data[0]) {
          setotpbtn(false);
          setsignbtn(true);
        } else {
          alert(response.data[1]);
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
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
          'Access-Control-Allow-Headers':
            'Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization',
        },
        url: 'https://tejdhar-otp-service.vercel.app/auth/verify/',
        data: {
          email: email,
          otp: OTP,
        },
      }).then((response) => {
        if (response.data[0]) {
          alert(`Verification Successfull with OTP ${OTP}`);
          dispatch({
            type: 'logged_in',
            value: { name: response.data[1].name, phone: email },
          });
          router.push('/');
        } else {
          alert(`Message from Server : ${response.data[1]}`);
        }
      });
    } catch (error) {
      alert('Please enter the correct OTP');
    }
  }

  return (
    <div className='selection:bg-indigo-500 selection:text-white '>
      <div className='flex justify-center items-center '>
        <div className=' flex-1'>
          <div className='mx-auto overflow-hidden'>
            <div className='p-8'>
              <h1 className='text-xl md:text-4xl lg:text-5xl font-bold text-black'>
                Welcome back!
              </h1>

              <form className='mt-12' action='' method='POST'>
                <div className='relative '>
                  <input
                    id='email'
                    name='email'
                    type='number'
                    className='peer h-10 w-full border-b-2 border-black text-black placeholder-transparent focus:outline-none focus:border-indigo-600  bg-transparent'
                    placeholder='Phone'
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
                  value='Sign in'
                  className='mt-20 px-8 py-4 uppercase rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-indigo-500 focus:ring-opacity-80 cursor-pointer bg-transparent disabled:bg-opacity-40 disabled:cursor-not-allowed'
                />
              </form>
              <a
                href='#'
                className='mt-4 block text-sm text-center font-medium text-indigo-600 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500'
              >
                {' '}
                Forgot your password?{' '}
              </a>
              <div className='flex w-full justify-center items-center mt-5 space-x-4'>
                <p className='text-xs md:text-lg lg:text-lg xl:text-lg'>
                  Don&apos;t have an account?
                </p>
                <button
                  className='px-4 py-2 rounded-lg border-2 border-black font-semibold'
                  onClick={(e) => {
                    setIsAnimated(!isAnimated);
                  }}
                >
                  SignUp!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
