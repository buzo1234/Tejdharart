import React from 'react';

const Testimonial = ({ review }) => {
  return (
    <div className='flex px-3 py-2 justify-between min-w-[350px] w-full md:w-1/3 lg:1/4 max-w-[500px] flex-col h-fit bg-amber-300 rounded-3xl shadow-lg mb-[20px] '>
      <p className=' px-3 py-3 whitespace-normal'>
        &quot;{review.review}&quot;
      </p>
      <div className='mt-3 font-bold text-lg'>{review.name}</div>
      <div className='text-lg font-semibold'>{review.designation}</div>
    </div>
  );
};

export default Testimonial;
