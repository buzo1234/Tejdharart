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
      designation: 'Chartered Accountant',
      name: 'Sharvari Wagh',
      review:
        'Diwali always has been the most important festival for and an unanswered quest of gifting persists. This year I thought of wrapping all aromatic essentials to gift my loved ones and got it done from Tejdhar. The fragrance was multiplied with the beautiful and attractive packaging done by Tejdhar and was loved by all. Nothing more I could have asked for. The colours, the texture, the feel and the look was just perfect! Thank you so much Tejdhar and Tejashree for making it so pretty.',
    },
    {
      designation: 'Happy Customer',
      name: 'Rashmi Joshi',
      review:
        'When I think about gifting…I think about Tejdhar Art. Tejashree as we lovingly know her is a one stop solution for all kinds of artistic, fun, creative, quirky, unique and personalized gifts. I have bought several gifts ranging from customized Peti boxes for birthdays to customized Frida Kahlo design bottles. She has beautifully curated a bulk order of her very cute and famous Ajji cha dabba for my Diwali gifting last year. Her work is exquisite and I wish her good luck for all her future projects!',
    },
    {
      designation: 'Classical Dancer',
      name: 'Ketaki Thakar',
      review:
        "Tejdhar offers very unique products and creative services. It was my son's thread ceremony and for gift packaging service I contacted Tejdhar. I was very happy with the results. It was done so creatively and was looking so attractive that everyone was asking for it. I have also bought few paperweights and fridge magnets from Tejdhar. It's a one stop solution for gifting. My best wishes to Tejdhar!",
    },
    {
      designation: 'CEO-Malaka Spice',
      name: 'Shrijith Ravindran',
      review:
        "Dear Tejdhar Art team, It's been a pleasure being a part of your journey and watching your brand grow. Your dedication to creating unique and beautiful art has always been inspiring. Excellent corporate gifting is all about finding the perfect balance between thoughtfulness, professionalism, and utility. A great corporate gift should be something that not only reflects your company's values but also leaves a lasting impression on the recipient and Tejdhar has always delivered that. As a Restaurant Professional, I have thoroughly enjoyed my experiences with your brand and look forward to continuing to support you in your new endeavour.",
    },
    {
      designation: 'Happy Customer',
      name: 'Neha Deshpande',
      review:
        "I bought some special gifts from Tejdhar Art for my daughter's first birthday. All the guests loved it. They provide you with such a variety of options as you like. I would suggest everyone to contact them for best gifting experience. Our best wishes to you.",
    },
    {
      designation: 'Happy Customer',
      name: 'Mamta Gupta',
      review:
        "Impressed with not only the artwork, it's the patience of hearing out and willingness to understand the client's need/ specifications to give best results was deeply appreciable. I got exactly what was in my mind. Thanks Tejashree… wishing you the very best and god bless.",
    },
    {
      designation: 'Photographer',
      name: 'Prajakta Joglekar',
      review:
        'Tejdhar art is absolutely a creative brand. Tejashree can make anything you want with her creative mind. Whenever you demand something different she always make sure to help you with that thought. Thanks Tejashree for creative products and a quick service.',
    },
    {
      designation: 'Student',
      name: 'Janhavee Gokhale',
      review:
        'I loved the eﬃciency and quick service in personalised product making. Perfection and promptness will take this brand to another level. Best wishes to all your expansions.',
    },
    {
      designation: 'IP Lawyer',
      name: 'Aabha Tumne',
      review:
        'I have been ordering customised products from Tejdhar almost for 2 years and all the products from the catalogue are awesome. Products are well finished and creatively designed. Customer service is 5/5, products are 5/5 and customer support is also 5/5. Tejashree is very talented and soft spoken person. I will definitely recommend Tejdhar for customised unique products.',
    },
    {
      designation: 'Dermatologist & cosmetologist',
      name: 'Dr. Amit Kelkar',
      review:
        'When we thought of gifting something to our DERMACON National Conference speakers, Tejdhar Art came into picture. After couple of round of discussions we finalised 600 pieces of Maharashtrian themed hamper. Everyone who received the hamper was appreciating the creative thought behind. It was a indeed happy association with Tejdhar Art.',
    },
    {
      designation: 'Happy Customer',
      name: 'Reva Nigudkar',
      review:
        "It's an amazing thing to gift handmade and customised products to your loved ones. So far I have ordered 6 personalised petis, Measurer, hand painted bottles and many other lovely stuff for us. My home is decorated with beautiful pieces of Tejdhar Art. Looking forward to shop more from you. Wishing you a bright future. Lots of love.",
    },
    {
      designation: 'Happy Customer',
      name: 'Abolee Zadbuke',
      review:
        'Absolutely amazing! I have bought customised Peti boxes from Tejdhar, the messages and thoughts I expected to convey were depicted in such a beautiful, creative and graceful manner. Sky is the limit for the creativity and skills Tejdhar process. Loved it to the core. More power to Tejdhar Art.',
    },
    {
      designation: 'Interior Designer',
      name: 'Arpit Punamia',
      review:
        "When you look out for something that is a limited edition for someone who is a limited edition for you…one of it's kind… Tejdhar Art is a place to go. Just love their work. Thank you so much Tejashree.",
    },
    {
      designation: 'Happy Customer',
      name: 'Harshad More',
      review:
        "Once you view the product then don't think twice, just order it. I am sure they will serve you the best without fail.",
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
            <div className='maylike-products-container track2'>
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
