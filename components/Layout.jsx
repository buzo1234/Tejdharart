import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { client } from '../lib/client';

import Navbar from './Navbar';
import Footer from './Footer';
import Intro from './Intro';
import { useStateContext } from '../context/StateContext';



const Layout = ({ children }) => {
  const [modal, setModal] = useState(true);
  const { cat } = useStateContext();

  return (
    <div className='layout'>
      <Head>
        <title>Tejdharart</title>
      </Head>
      {modal ? (
        <>
          <div className='w-screen flex fixed justify-center items-center my-auto z-50 h-screen bg-gray-700/50'>
            <div className="transition delay-200 translate-y-0 flex-col ease-in-out w-fit md:w-3/4 lg:w-3/4 xl:w-3/4 h-11/12  px-2 md:px-3 lg:px-3 xl:px-3 py-1 mx-1 flex bg-[#fcd34d] rounded-xl shadow-2xl overflow-y-scroll">
              <button
                onClick={() => setModal(false)}
                className='flex w-full justify-end text-black text-xl font-bold'
              >
                X
              </button>
              <Intro />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='w-screen justify-center items-center my-auto z-20 h-screen bg-gray-700/50 transition delay-200 -translate-y-full ease-in-out hidden '>
            <div className=' flex-col  w-11/12 md:w-3/4 lg:w-3/4 xl:w-3/4 h-fit px-2 md:px-3 lg:px-3 xl:px-3 py-1 mx-auto flex bg-[#fcd34d] rounded-xl shadow-2xl'>
              <button
                onClick={() => setModal(false)}
                className='flex w-full justify-end text-red-600 text-xl font-bold'
              >
                X
              </button>
              <Intro />
            </div>
          </div>
        </>
      )}
      <header>
        <Navbar cat={cat} />
      </header>
      <main className='main-container'>{children}</main>
    </div>
  );
};

export const getServerSideProps = async () => {


  const CategoryQuery = "*[_type == 'category' && !(_id in path('drafts.**'))]";
  const CategoryData = await client.fetch(CategoryQuery);

  return {
    props: { CategoryData },
  };
};


export default Layout;
