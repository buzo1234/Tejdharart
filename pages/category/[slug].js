import React, { useState } from 'react';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from 'react-icons/ai';

import { useRouter } from 'next/router';
import { client, urlFor } from '../../lib/client';
import { Footer, Product } from '../../components';

const CategoryDetails = ({ category, products }) => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <div>
      <div className='products-heading'>
        <h2>{category.title}</h2>
      </div>

      <div className='products-container'>
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
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

  console.log(category);

  return {
    props: { products, category },
  };
};

export default CategoryDetails;
