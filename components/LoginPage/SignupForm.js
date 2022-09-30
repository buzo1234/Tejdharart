import { useState } from 'react';

const SignupForm = ({ isAnimated, setIsAnimated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='selection:bg-indigo-500 selection:text-white'>
      <div className='flex justify-center items-center'>
        <div className='p-8 flex-1'>
          <div className='mx-auto overflow-hidden'>
            <div className='p-8'>
              <h1 className='text-xl md:text-4xl lg:text-5xl font-bold text-black'>
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
                  />
                  <label
                    htmlFor='email'
                    className='absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-sm'
                  >
                    Mobile Number
                  </label>
                </div>
                <div className='mt-10 relative'>
                  <input
                    id='password'
                    type='password'
                    name='password'
                    className='peer h-10 w-full border-b-2 border-black text-black placeholder-transparent focus:outline-none focus:border-indigo-600 bg-transparent'
                    placeholder='Password '
                  />
                  <label
                    htmlFor='password'
                    className='absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-sm'
                  >
                    Password
                  </label>
                </div>

                <input
                  type='submit'
                  value='Sign up'
                  className='mt-20 px-8 py-4 uppercase rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-indigo-500 focus:ring-opacity-80 cursor-pointer bg-transparent'
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
};

export default SignupForm;
