import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';

import { Cart } from './';
import { useStateContext } from '../context/StateContext';
import { useUserContext } from '../context/UserContext';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = ({ cat }) => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const [productshow, setProductShow] = useState(false);
  const [aboutshow, setAboutShow] = useState(false);
  const [serviceshow, setServiceShow] = useState(false);
  const { state, dispatch } = useUserContext();
  const router = useRouter();

  const [logstate, setlogstate] = useState({
    haveUser: false,
    userDetails: { username: null, userphone: null },
  });

  useEffect(() => {
    if (state !== undefined) {
      if (state.user.userAvailable) {
        setlogstate({
          haveUser: true,
          userDetails: {
            username: state.user.userDetails.userName,
            userphone: state.user.userDetails.userPhone,
          },
        });
      } else {
        setlogstate({
          haveUser: false,
          userDetails: {
            username: null,
            userphone: null,
          },
        });
      }
    }
  }, [state]);

  function setProductModal() {
    if (productshow) {
      setProductShow(false);
    } else {
      setProductShow(true);
    }
  }

  function setAboutModal() {
    if (aboutshow) {
      setAboutShow(false);
    } else {
      setAboutShow(true);
    }
  }

  function setServiceModal() {
    if (serviceshow) {
      setServiceShow(false);
    } else {
      setServiceShow(true);
    }
  }

  async function logoutUser(e) {
    e.preventDefault();
    try {
      await axios({
        method: 'post',
        url: 'https://tejdhar-otp-service.vercel.app/auth/logout/',
        data: {
          email: logstate.userDetails.userphone,
        },
      }).then((response) => {
        if (response.data[0]) {
          dispatch({ type: 'logged_out' });
          router.push('/');
        } else {
          alert(`Message from Server : ${response.data[1]}`);
        }
      });
    } catch (error) {
      alert('Problem in Loggin Out');
    }
  }

  return (
    <div className='navbar-container'>
      <p className='logo mt-2 cursor-pointer'>
        <Link href='/'>
          <Image
            src='/logo_tejdharart.jpg'
            width={90}
            height={90}
            className='cursor-pointer'
          />
        </Link>
      </p>

      <div className='flex items-center  space-x-5'>
        <div className='hidden md:block lg:block xl:block'>
          <Menu as='div' className='relative inline-block text-left'>
            {/* <div>
              <Menu.Button className='inline-flex w-full justify-center items-center rounded-md  px-4 py-2 text-sm md:text-lg lg:text-lg xl:text-lg font-medium text-gray-700 shadow-sm  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100'>
                Products
                <ChevronDownIcon
                  className='-mr-1 ml-2 h-5 w-5'
                  aria-hidden='true'
                />
              </Menu.Button>
            </div> */}

            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <div className='py-1'>
                  {cat?.map((category, i) => {
                    let dd = category.slug;
                    return (
                      <Menu.Item key={i}>
                        {({ active }) => (
                          <Link href={`/category/${dd.current}`}>
                            <a className='block px-4 py-2 text-gray-600 text-sm hover:text-gray-900 hover:bg-gray-100'>
                              {category.title}
                            </a>
                          </Link>
                        )}
                      </Menu.Item>
                    );
                  })}

                  {/*  <Menu.Item>
                      {({ active }) => (
                        <a
                          href='#'
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Support
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href='#'
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          License
                        </a>
                      )}
                    </Menu.Item> */}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        <button
          type='button'
          className='cart-icon'
          onClick={() => setShowCart(true)}
        >
          <AiOutlineShopping />
          <span className='cart-item-qty'>{totalQuantities}</span>
        </button>
        {logstate.haveUser ? (
          <>
            <Menu as='div' className='relative inline-block text-left'>
              <div>
                <Menu.Button className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100'>
                  Hi {logstate.userDetails.username}
                  <ChevronDownIcon
                    className='-mr-1 ml-2 h-5 w-5'
                    aria-hidden='true'
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <div className='py-1'>
                    {/* <Menu.Item>
                      {({ active }) => (
                        <Link href='/'>
                          <a className='block px-4 py-2 text-gray-600 text-sm hover:text-gray-900 hover:bg-gray-100'>
                            Home
                          </a>
                        </Link>
                      )}
                    </Menu.Item> */}
                    <Menu.Item>
                      {({ active }) => (
                        <Link href='/orders'>
                          <a className='block px-4 py-2 text-gray-600 text-sm hover:text-gray-900 hover:bg-gray-100'>
                            Orders
                          </a>
                        </Link>
                      )}
                    </Menu.Item>
                    {/* <Menu.Item>
                      {({ active }) => (
                        <Link href='/about'>
                          <a className='block px-4 py-2 text-gray-600 text-sm hover:text-gray-900 hover:bg-gray-100'>
                            About Us
                          </a>
                        </Link>
                      )}
                    </Menu.Item> */}

                    {/*  <Menu.Item>
                      {({ active }) => (
                        <a
                          href='#'
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Support
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href='#'
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          License
                        </a>
                      )}
                    </Menu.Item> */}

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={(e) => logoutUser(e)}
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block w-full px-4 py-2 text-left text-sm'
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </>
        ) : (
          <>
            <Link href='/login'>
              <button className='flex px-3 py-1 bg-white border-2 border-black rounded-md h-fit'>
                Login/Signup
              </button>
            </Link>
          </>
        )}

        <Menu as='div' className='relative inline-block text-left'>
          <div>
            <Menu.Button className='inline-flex w-full justify-center  text-sm font-medium text-gray-700 shadow-sm  focus:outline-none '>
              <div className='w-[29px]'>
                <div className='bg-black h-[3.5px] mb-2'></div>
                <div className='bg-black h-[3.5px] my-2'></div>
                <div className='bg-black h-[3.5px] '></div>
              </div>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <div className='py-1'>
                <Menu.Item>
                  <Link href={`/`}>
                    <a className='block px-4 py-2 text-gray-900 text-sm hover:text-black font-semibold hover:bg-gray-100'>
                      Home
                    </a>
                  </Link>
                </Menu.Item>
                <div>
                  <Menu>
                    <button
                      className=' w-full  items-center rounded-md text-smfont-medium  shadow-sm  inline-flex justify-between px-4 py-2  hover:bg-gray-100 text-gray-900 text-sm hover:text-black font-semibold'
                      onClick={setProductModal}
                    >
                      Products
                      {!productshow ? (
                        <ChevronDownIcon
                          className='-mr-1 ml-2 h-5 w-5'
                          aria-hidden='true'
                        />
                      ) : (
                        <ChevronUpIcon
                          className='-mr-1 ml-2 h-5 w-5'
                          aria-hidden='true'
                        />
                      )}
                    </button>
                  </Menu>
                </div>

                {productshow && (
                  <div className='py-1'>
                    {cat?.map((category, i) => {
                      let dd = category.slug;
                      return (
                        <Menu.Item key={i}>
                          {({ active }) => (
                            <Link href={`/category/${dd.current}`}>
                              <a className='block px-4 py-2 text-gray-600 text-sm hover:text-gray-900 hover:bg-gray-100'>
                                {category.title}
                              </a>
                            </Link>
                          )}
                        </Menu.Item>
                      );
                    })}
                  </div>
                )}

<div>
                  <Menu>
                    <button
                      className=' w-full  items-center rounded-md text-smfont-medium  shadow-sm  inline-flex justify-between px-4 py-2  hover:bg-gray-100 text-gray-900 text-sm hover:text-black font-semibold'
                      onClick={setServiceModal}
                    >
                      We Also Offer
                      {!serviceshow ? (
                        <ChevronDownIcon
                          className='-mr-1 ml-2 h-5 w-5'
                          aria-hidden='true'
                        />
                      ) : (
                        <ChevronUpIcon
                          className='-mr-1 ml-2 h-5 w-5'
                          aria-hidden='true'
                        />
                      )}
                    </button>
                  </Menu>
                </div>

                {serviceshow && (
                  <div className='py-1'>
                    <Menu.Item>
                      <Link href={'/corporate'}>
                        <a className='block px-4 py-2 text-gray-600 text-sm hover:text-gray-900 hover:bg-gray-100'>
                          Corporate Gifting
                        </a>
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link href={'/wedding'}>
                        <a className='block px-4 py-2 text-gray-600 text-sm hover:text-gray-900 hover:bg-gray-100'>
                          Wedding Bells & Vibes
                        </a>
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link href={'/occasionally'}>
                        <a className='block px-4 py-2 text-gray-600 text-sm hover:text-gray-900 hover:bg-gray-100'>
                          Occasionally Yours
                        </a>
                      </Link>
                    </Menu.Item>
                  </div>
                )}
                <div>
                  <Menu>
                    <button
                      className='w-full  items-center rounded-md text-smfont-medium  shadow-sm  inline-flex justify-between px-4 py-2  hover:bg-gray-100 text-gray-900 text-sm hover:text-black font-semibold'
                      onClick={setAboutModal}
                    >
                      About Us
                      {!aboutshow ? (
                        <ChevronDownIcon
                          className='-mr-1 ml-2 h-5 w-5'
                          aria-hidden='true'
                        />
                      ) : (
                        <ChevronUpIcon
                          className='-mr-1 ml-2 h-5 w-5'
                          aria-hidden='true'
                        />
                      )}
                    </button>
                  </Menu>
                </div>

                {aboutshow && (
                  <div className='py-1'>
                    <Menu.Item>
                      <Link href={'/about'}>
                        <a className='block px-4 py-2 text-gray-600 text-sm hover:text-gray-900 hover:bg-gray-100'>
                          About Tejdhar
                        </a>
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link href={'/founder'}>
                        <a className='block px-4 py-2 text-gray-600 text-sm hover:text-gray-900 hover:bg-gray-100'>
                          About founder
                        </a>
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link href={'/cancellation'}>
                        <a className='block px-4 py-2 text-gray-600 text-sm hover:text-gray-900 hover:bg-gray-100'>
                          Contact us
                        </a>
                      </Link>
                    </Menu.Item>
                  </div>
                )}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>

        {showCart && <Cart />}
      </div>
    </div>
  );
};

export default Navbar;
