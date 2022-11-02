import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import { client } from '../lib/client';
import {
  Product,
  FooterBanner,
  HeroBanner,
  Footer,
  Navbar,
} from '../components';
import Category from '../components/Category';

const Home = ({ products, CategoryData }) => {
  const [modal, setModal] = useState(true);

  if (typeof window === undefined) {
    return <></>;
  } else {
    return (
      <div className='relative about__para'>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com'></link>
          <link rel='preconnect' href='https://fonts.gstatic.com'></link>
          <link
            href='https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap'
            rel='stylesheet'
          ></link>
        </Head>
        {/* <HeroBanner heroBanner={bannerData.length && bannerData[0]}  /> */}
        {/* 
      {modal ? (
        <>
          <div className='w-screen flex fixed justify-center items-center my-auto z-20 h-screen bg-gray-700/50'>
          <div className='transition flex-col ease-in-out delay-150 w-3/4 h-fit px-3 py-1 mx-auto flex bg-white rounded-xl shadow-2xl'>
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
      ) : (
        ''
      )} */}

        <div className='products-heading about__para'>
          <h2>Our Product Categories</h2>
        </div>

        <div className='products-container'>
          {CategoryData?.map((category) => (
            <Category key={category._id} category={category} />
          ))}
        </div>

        <div className='products-heading'>
          <h2>Best Seller Products</h2>
          <p>Authentic Handmade Items!</p>
        </div>

        <div className='products-container'>
          {products?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>

        {/* <FooterBanner footerBanner={bannerData && bannerData[0]} /> */}
        <Footer data={CategoryData} />
      </div>
    );
  }
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const CategoryQuery = '*[_type == "category"]';
  const CategoryData = await client.fetch(CategoryQuery);

  return {
    props: { products, CategoryData },
  };
};

export default Home;
