import Link from 'next/link';
import React from 'react';
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';
import CatLink from './CatLink';
import { client } from '../lib/client';

const Footer = ({ data }) => {
  return (
    <div className='flex flex-col mt-20  w-full bg-yellow-300'>
      <div className='w-full grid grid-cols-5 px-4 py-2 mt-10'>
        <Link href='/'>
          <div className='col-span-2 '>
            <p className='text-xl font-bold my-2'>Tejdharart</p>
            <p className='text-lg'>
              “There’s no better way than a personalised ‘Gift’, to express
              yourself.”
            </p>
          </div>
        </Link>

        <div>
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
        </div>
        <div>
          <p className=' font-bold text-lg py-2'>Our Categories</p>

          {data?.map((category) => (
            <CatLink key={category._id} category={category} />
          ))}
        </div>
        <div className='flex w-full justify-center flex-col'>
          <p className='text-lg font-bold mb-2'>
            Subscribe for newsletters and updates!
          </p>
          <div className='flex gap-2'>
            <input
              type='email'
              placeholder='Email Address'
              className='border-[1px] border-black px-1 py-2'
            />
            <button className='bg-black text-white px-3 rounded-md py-2'>
              Send
            </button>
          </div>
        </div>
      </div>
      <div className='footer-container'>
        <p>2022 Tejdharart All rights reserverd</p>
        <p className='icons'>
          <AiFillInstagram />
          <AiOutlineTwitter />
        </p>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const CategoryQuery = '*[_type == "category"]';
  const CategoryData = await client.fetch(CategoryQuery);

  return {
    props: { CategoryData },
  };
};

export default Footer;
