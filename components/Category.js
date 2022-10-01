import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const Category = ({ category: { title, slug, image, description, _id } }) => {
  return (
    <div>
      <Link href={`/category/${slug.current}`}>
        <div className='category-card'>
          {image && (
            <img
              src={urlFor(image)}
              width={250}
              height={250}
              className='product-image'
              loading='eager'
            />
          )}
          <p className='product-name'>{title}</p>
          {/*  <div>
            {tags?.map((tag) => (
              <p>{tag}</p>
            ))}
          </div> */}
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default Category;
