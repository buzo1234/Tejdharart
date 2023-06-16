import React, { useState, useEffect } from 'react';
import Head from 'next/head';


const Home = () => {
 
  
    return (
      <div className='relative about__para'>
        <Head>
         

          <title>Tejdharart</title>
          <meta name='description' content='Tejdharart' />
          <link rel='icon' href='/logo_tejdharart.jpg' />
        </Head>
        <div>
        <div className='p-2'>
          <p className='text-red-700 text-xl mt-2 font-semibold'>
            ERROR<span className='text-sm ml-2'>(subscription-terminated)</span>
          </p>
          <p>Subscription terminated until further payment is initiated!</p>
        </div>
      </div>
      </div>
    );
              }

export default Home;
