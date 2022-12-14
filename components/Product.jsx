import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const Product = ({
  product: { productImage, slug, title, defaultPrice, colorVariants, sizeVariants },
}) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className='product-card'>
          {productImage && (
            <img
              src={
                productImage
                  ? urlFor(productImage && productImage[0])
                  : urlFor(
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnIm-lbLsUFMpqohRj4di_06WAkoJrDC9AFg&usqp=CAU'
                    )
              }
              width={250}
              height={250}
              className='product-image'
            />
          )}
          <p className='product-name'>{title}</p>
          {colorVariants !== undefined || sizeVariants !== undefined ? (
            <p className='text-sm text-gray-700 italic'>Has {colorVariants ? 'colour' : null} {colorVariants && sizeVariants ? 'and' : null} {sizeVariants ? 'size': null} variants</p>
          ) : null}
          <p className='product-price'>&#x20B9;{defaultPrice}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
