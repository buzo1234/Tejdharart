import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { client } from '../../lib/client';
import { Footer, Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

const CategoryDetails = ({ category: { title }, products, discount }) => {
  const router = useRouter();
  const { slug } = router.query;
  const { cat, setDiscount } = useStateContext();

  useEffect(() => {
    setDiscount(discount[0].discount);
  }, []);

  useEffect(() => {
    products.sort((a, b) => (a._createdAt > b._createdAt ? -1 : 1));
  }, [products]);

  return (
    <div>
      <Head>
        <title>{title} | Tejdharart</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/logo_tejdharart.jpg' />
      </Head>
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
  const query = `*[_type == "category" && !(_id in path('drafts.**'))] {
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
  const query = `*[_type == "category" && !(_id in path('drafts.**')) && slug.current == '${slug}'][0]`;

  const category = await client.fetch(query);

  const productsQuery = `*[_type == "product" && !(_id in path('drafts.**')) && category._ref == '${category._id}']`;
  const products = await client.fetch(productsQuery);

  const discountQuery = "*[_type == 'Discount' && !(_id in path('drafts.**'))]";
  const discount = await client.fetch(discountQuery);

  return {
    props: { products, category, discount },
    revalidate: 2,
  };
};

export default CategoryDetails;
