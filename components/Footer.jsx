import Link from 'next/link';
import React from 'react';
import {
  AiFillInstagram,
  AiOutlineTwitter,
  AiFillFacebook,
} from 'react-icons/ai';
import CatLink from './CatLink';
import { client } from '../lib/client';
import Head from 'next/head';

const Footer = ({ data }) => {
  console.log('footer data', data);
  return (
    <div className='flex flex-col mt-20 w-full bg-amber-300'>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com'></link>
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin
        ></link>
        <link
          href='https://fonts.googleapis.com/css2?family=Baloo+2&family=Caveat:wght@500&display=swap'
          rel='stylesheet'
        ></link>
      </Head>
      <div className='w-full grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 px-4 py-2 mt-10'>
        <div className='col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 '>
          <p className='text-xl font-bold my-2'>Tejdhar Art</p>
          <p className='text-3xl pr-32 mt-3 drop-shadow-lg about__para'>
            “There&apos;s no better way than a &apos;Gift&apos;, to express
            yourself.”
          </p>
          <p className='mt-5 text-xl font-bold'>Address: </p>
          <p className='text-lg'>
            B 3, Arti society Sheela Vihar colony Kothrud; Pune 411038.
          </p>
          <div className='text-lg font-bold mt-5 flex items-center space-x-2'>
            <img src='/mail2.png' alt='email' className='w-[30px] h-[30px]' />
            <p> info@tejdharart.com</p>
          </div>
        </div>

        <div className='mt-4 md:mt-0 lg:mt-0 xl:mt-0'>
          <p className='font-bold text-lg py-2'>Useful Links</p>
          <Link href='/'>
            <p className='hover:underline cursor-pointer'>Home</p>
          </Link>
          <Link href='/about'>
            <p className='hover:underline cursor-pointer'>About Us</p>
          </Link>
          <Link href='/founder'>
            <p className='hover:underline cursor-pointer'>About Founder</p>
          </Link>
          <Link href='/privacy'>
            <p className='hover:underline cursor-pointer'>Privacy Policies</p>
          </Link>
          <Link href='/cancellation'>
            <p className='hover:underline cursor-pointer'>
              Refunds and Cancellation
            </p>
          </Link>
          <Link href='/disclaimer'>
            <p className='hover:underline cursor-pointer'>Disclaimer</p>
          </Link>
        </div>
        <div className='mt-4 md:mt-0 lg:mt-0 xl:mt-0'>
          <p className=' font-bold text-lg py-2'>Our Categories</p>

          {data?.map((category) => (
            <CatLink key={category._id} category={category} />
          ))}
        </div>
        <div className='flex w-full flex-col mt-4 md:mt-0 lg:mt-0 xl:mt-0'>
          <p className='text-lg font-bold mb-2'>Follow us on our Socials!</p>
          <div className='flex gap-2'>
            <Link href='https://www.instagram.com/tejdharart/'>
              <a target='_blank'>
                <p className='icons cursor-pointer'>
                  <AiFillInstagram className='w-8 h-8' />
                </p>
              </a>
            </Link>
            <p className='icons'>
              <AiOutlineTwitter className='w-8 h-8' />
            </p>
            <Link href='https://www.facebook.com/tejdharart/'>
              <a target='_blank'>
                <p className='icons'>
                  <AiFillFacebook className='w-8 h-8' />
                </p>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className='footer-container'>
        <p>©2022 Tejdharart, All rights reserverd</p>
      </div>
    </div>
  );
};

/* export const getServerSideProps = async () => {
  const CategoryQuery = '*[_type == "category"]';
  const CategoryData = await client.fetch(CategoryQuery);

  return {
    props: { CategoryData },
  };
};
 */
export default Footer;
