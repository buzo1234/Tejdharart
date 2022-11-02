import React, { useState } from 'react';

import { useRouter } from 'next/router';
import { client } from '../../lib/client';
import { Footer, Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

const CategoryDetails = ({ category: { title }, products }) => {
  const router = useRouter();
  const { slug } = router.query;
  const { cat } = useStateContext();

  return (
    <div>
      <div className='products-heading'>
        <h2>{title}</h2>
      </div>

      <div className='products-container'>
        {products?.map((product) => (
          <Product key={product?._id} product={product} />
        ))}
      </div>

      <Footer data={cat} />
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "category"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  console.log(paths);

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "category" && slug.current == '${slug}'][0]`;

  const category = await client.fetch(query);

  const productsQuery = `*[_type == "product" && category._ref == '${category._id}']`;
  const products = await client.fetch(productsQuery);

  return {
    props: { products, category },
    revalidate: 10,
  };
};

export default CategoryDetails;
