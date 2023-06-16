import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { client } from '../lib/client';

import Navbar from './Navbar';
import Footer from './Footer';
import Intro from './Intro';
import { useStateContext } from '../context/StateContext';

const Layout = ({ children }) => {
  return (
    <div className='layout'>
      <Head>
        <title>Tejdharart</title>
      </Head>

      <main className='main-container'>{children}</main>
    </div>
  );
};

export default Layout;
