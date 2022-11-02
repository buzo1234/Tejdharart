import React from 'react';
import { Footer } from '../components';
import AboutFounder from '../components/AboutFounder';
import { useStateContext } from '../context/StateContext';
const Founder = () => {
  const { cat } = useStateContext();
  return (
    <div>
      <AboutFounder />
      <Footer data={cat} />
    </div>
  );
};

export default Founder;
