import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const Product = ({ product: { defaultProductVariant, title, slug, tags } }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className='product-card'>
          {defaultProductVariant.images && (
            <img
              src={
                defaultProductVariant
                  ? urlFor(
                      defaultProductVariant?.images &&
                        defaultProductVariant?.images[0]
                    )
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
          <p className='product-price'>&#x20B9;{defaultProductVariant.price}</p>
          {/*  <div>
            {tags?.map((tag) => (
              <p>{tag}</p>
            ))}
          </div> */}
        </div>
      </Link>
    </div>
  );
};

export default Product;
