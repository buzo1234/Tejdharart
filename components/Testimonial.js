import React from 'react';

const Testimonial = ({ review }) => {
  return (
    <div className='flex items-center justify-center w-[400px] flex-col h-[400px] bg-amber-300 rounded-3xl shadow-lg mb-[20px] '>
      <div
        className='flex w-full justify-center mt-4
      '
      >
        <img
          src={review.image}
          alt='userimage'
          className='w-[140px] h-[140px] rounded-full shadow-md'
        />
      </div>
      <div className='mt-3 font-bold text-lg'>{review.name}</div>
      <p className=' px-3 py-3 whitespace-normal'>"{review.review}"</p>
    </div>
  );
};

export default Testimonial;
