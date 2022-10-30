import { useState } from 'react';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import LeftOverlayContent from './LeftOverlayContent';
import RightOverlayContent from './RightOverlayContent';

const LoginPage = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const overlayBg = '';

  return (
    <div className='h-4/5 w-11/12 md:w-4/5 lg:w-4/5 xl:w-4/5 bg-white relative overflow-hidden rounded-3xl flex-col'>
      <div
        className={`signin bg-white absolute top-0 left-0 h-full w-full md:w-1/2 lg:w-1/2 xl:w-1/2 flex justify-center items-center transition-all duration-700 ease-in-out z-20 bg-repeat ${
          isAnimated ? 'translate-x-full opacity-0' : ''
        } bg-red-500`}
        style={{ backgroundImage: 'url(Background.jpg)' }}
      >
        <div className='h-full w-full flex justify-center items-center my-3'>
          <SignupForm isAnimated={isAnimated} setIsAnimated={setIsAnimated} />
        </div>
      </div>

      <div
        className={`signup absolute top-0 left-0 h-full w-full md:w-1/2 lg:w-1/2 xl:w-1/2 flex justify-center items-center transition-all duration-700 ease-in-out ${
          isAnimated
            ? 'md:translate-x-full lg:translate-x-full xl:translate-x-full tran  opacity-100 z-20 animate-show'
            : 'opacity-0 z-10'
        }`}
        style={{ backgroundImage: 'url(Background.jpg)' }}
      >
        <div className='h-full w-full flex justify-center items-center my-3'>
          <SigninForm isAnimated={isAnimated} setIsAnimated={setIsAnimated} />
        </div>
      </div>

      <div
        className={`overlay-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition transition-transform duration-700 ease-in-out z-100 ${
          isAnimated ? '-translate-x-full' : ''
        } `}
      >
        <div
          className={`bg-no-repeat bg-center overlay ${overlayBg} relative -left-full h-full w-[200%] transform transition transition-transform duration-700 ease-in-out ${
            isAnimated ? 'translate-x-1/2' : 'translate-x-0'
          } hidden md:block lg:block xl:block`}
        >
          <div
            className={`overlay-left w-1/2 h-full absolute flex justify-center items-center top-0 transform  transition transition-transform duration-700 ease-in-out ${
              isAnimated ? 'translate-x-0' : '-translate-x-[20%]'
            } `}
          >
            <RightOverlayContent
              isAnimated={isAnimated}
              setIsAnimated={setIsAnimated}
            />
          </div>
          <div
            className={`overlay-right w-1/2 h-full absolute flex justify-center items-center top-0 right-0 transform transition transition-transform duration-700 ease-in-out ${
              isAnimated ? 'translate-x-[20%]' : 'translate-x-0'
            }`}
          >
            <LeftOverlayContent
              isAnimated={isAnimated}
              setIsAnimated={setIsAnimated}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
