import React from 'react';
import Image from 'next/image';
import { urlFor } from '../lib/client';

const Orderblock = ({ item, index }) => {
  return (
    <div className='bg-gradient-to-r from-amber-300 via-amber-100 to-amber-300 px-4 py-2 rounded-md  my-4 flex flex-col justify-center   w-full'>
      <p className='text-lg font-semibold'>Order: {index}</p>
      {item.map((val, i) => {
        return (
          <div key={i}>
            <div className=' grid grid-cols-4 h-[150px] justify-center items-center my-2'>
              <div className='flex w-full justify-center items-center'>
                <img
                  src={
                    val.defaultProductVariant
                      ? urlFor(
                          val.defaultProductVariant?.images &&
                            val.defaultProductVariant?.images[0]
                        )
                      : urlFor(
                          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnIm-lbLsUFMpqohRj4di_06WAkoJrDC9AFg&usqp=CAU'
                        )
                  }
                  width={130}
                  height={130}
                  className='rounded-lg'
                />
              </div>
              <p className='font-semibold text-lg text-center'>{val.title}</p>
              <p className='font-semibold text-lg text-center'>
                Price: &#x20B9;{val.defaultProductVariant.price}
              </p>
              <p className='font-semibold text-lg text-center'>
                Qty x {val.quantity}
              </p>
            </div>
            {item.length > 1 && item.length !== i + 1 ? (
              <div className='bg-gray-400 h-[0.2px] w-full'></div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Orderblock;
