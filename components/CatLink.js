import Link from 'next/link';
import React from 'react';

const CatLink = ({ category: { title, slug } }) => {
  return (
    <div>
      <Link href={`/category/${slug.current}`}>
        <p className='hover:underline cursor-pointer'>{title}</p>
      </Link>
    </div>
  );
};

export default CatLink;
