import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import { client } from '../lib/client';
import { Product, Footer } from '../components';
import Category from '../components/Category';
import { useStateContext } from '../context/StateContext';
import Testimonial from '../components/Testimonial';

const Home = ({ products, CategoryData }) => {
  const [modal, setModal] = useState(true);
  const { logAllCategories, cat } = useStateContext();

  useEffect(() => {
    CategoryData.sort((a, b) => (a._createdAt > b._createdAt ? 1 : -1));
  }, [CategoryData]);

  useEffect(() => {
    logAllCategories(CategoryData);
  }, []);

  const testimonials = [
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1e0SL29KGid7L-WWGyeYiRSJJzgVUVvlxKg&usqp=CAU',
      name: 'User 1',
      review:
        'Tejdharart has a fantastic range of handicrafts that are not only beautiful but also made with exceptional quality. I have purchased several items from them, and I am always amazed at the attention to detail that goes into each piece. I highly recommend Tejdharart to anyone looking for unique and high-quality handicrafts.',
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWevUUQ4EAipF5Hk6EieZfSY222lyzXiwotw&usqp=CAU',
      name: 'User 2',
      review:
        "I am absolutely in love with Tejdharart's handicrafts! Their products are truly one of a kind, and I am always impressed with the intricate designs and vibrant colors used in each piece. The customer service is also fantastic, and I always feel like a valued customer when I shop with them.",
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDDmeVHNl4Q2UPObCM4J2EbCZN8slqYU3EbQ&usqp=CAU',
      name: 'User 3',
      review:
        "Tejdharart's handicrafts are the perfect addition to any home! I have purchased several items from them, including wall hangings, vases, and table decor, and each piece has added a special touch to my living space. I am so grateful to have discovered this amazing company!",
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR2XRpyLtvtdJnwYZgMUcPTCMmUGyKlOD9mg&usqp=CAU',
      name: 'User 4',
      review:
        'If you are looking for unique and stunning handicrafts, Tejdharart is the company for you! Their products are simply breathtaking, and the quality is unmatched. I have received countless compliments on the pieces I have purchased from them, and I plan to continue shopping with them for years to come.',
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZWTnjfvDOQP69d9G4QTT61uPmEud8ZQPlhQ&usqp=CAU',
      name: 'User 5',
      review:
        "Tejdharart's handicrafts are truly a work of art! I have never seen such beautiful and intricate designs in any other handicrafts. The attention to detail is impeccable, and the craftsmanship is of the highest quality. I highly recommend Tejdharart to anyone who is looking for exceptional handicrafts that are sure to impress!",
    },
  ];

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

          <title>Tejdharart</title>
          <meta name='description' content='Tejdharart' />
          <link rel='icon' href='/logo_tejdharart.jpg' />
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
          <h2>Our Products</h2>
        </div>

        <div className='products-container'>
          {CategoryData?.map((category) => (
            <Category key={category._id} category={category} />
          ))}
        </div>

        {/* Best Seller Products */}

        {/* <div className='products-heading'>
          <h2>Best Seller Products</h2>
        </div>

        <div className='products-container'>
          {products?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div> */}

        <div className='testimonial-heading'>
          <h2>Testimonials</h2>
        </div>

        <div className='testimonials-wrapper'>
          <div className='marquee2'>
            <div className='maylike-products-container track'>
              {testimonials.map((item) => (
                <Testimonial key={item._id} review={item} />
              ))}
            </div>
          </div>
        </div>

        {/* <FooterBanner footerBanner={bannerData && bannerData[0]} /> */}
        {cat !== undefined ? <Footer data={cat} /> : null}
      </div>
    );
  }
};

export const getServerSideProps = async () => {
  const query = "*[_type == 'product' && !(_id in path('drafts.**'))]";
  const products = await client.fetch(query);

  const CategoryQuery = "*[_type == 'category' && !(_id in path('drafts.**'))]";
  const CategoryData = await client.fetch(CategoryQuery);

  return {
    props: { products, CategoryData },
  };
};

export default Home;
