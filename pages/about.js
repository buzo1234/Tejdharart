import React from 'react';
import { Footer } from '../components';
import Aboutus from '../components/Aboutus';
import { useStateContext } from '../context/StateContext';

const about = () => {
  const { cat } = useStateContext();

  return (
    <div>
      <Aboutus />
      <Footer data={cat} />
    </div>
  );
};

export default about;
