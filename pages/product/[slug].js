import React, { useEffect, useState } from 'react';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from 'react-icons/ai';
import { PortableText } from '@portabletext/react';

import { client, urlFor } from '../../lib/client';
import { Footer, Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ product, products }) => {
  console.log('product details', product);
  const { productImage, title, body, defaultPrice, colorVariants } = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
  const [selcolor, setselcolor] = useState(null);

  useEffect(() => {
    if (colorVariants !== undefined) {
      console.log(colorVariants);
      setselcolor(colorVariants[0].colorName);
    } else {
      setselcolor(null);
    }
  }, [colorVariants]);

  const handleBuyNow = () => {
    onAdd(product, selcolor, qty);

    setShowCart(true);
  };

  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            <img
              src={productImage && urlFor(productImage && productImage[index])}
              className='product-detail-image object-contain'
            />
          </div>
          <div className='small-images-container'>
            {productImage?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? 'small-image selected-image' : 'small-image'
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className='product-detail-desc'>
          <h1 className='text-2xl'>{title}</h1>
          <div className='reviews'>
            <div className='flex'>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          {colorVariants !== undefined ? (
            <div>
              <p className='font-semibold'>Color Variants:</p>
              <p className='p-0 m-0 text-sm'>{selcolor}</p>
              <div className='flex gap-4'>
                {colorVariants.map((item, i) => (
                  <div
                    /* className={`w-[20px] h-[20px] bg-[${item?.color?.hex}] `} */

                    className={
                      selcolor === item.colorName
                        ? 'border-[2px] border-black border-solid rounded-md'
                        : 'border-[0.1px] border-gray-500 border-solid rounded-md'
                    }
                    style={{
                      width: '30px',
                      height: '30px',
                      backgroundColor: item.color.hex,
                      cursor: 'pointer',
                    }}
                    onClick={() => setselcolor(item.colorName)}
                  ></div>
                ))}
              </div>
            </div>
          ) : null}
          <h4 className='font-semibold'>Details: </h4>
          <PortableText value={body?.en} />
          <p className='price'>&#x20B9;{defaultPrice}</p>
          <div className='quantity'>
            <h3>Quantity:</h3>
            <p className='quantity-desc'>
              <span className='minus' onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className='num'>{qty}</span>
              <span className='plus' onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className='buttons'>
            <button
              type='button'
              className='add-to-cart'
              onClick={() => onAdd(product, selcolor, qty)}
            >
              Add to Cart
            </button>
            <button type='button' className='buy-now' onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className='maylike-products-wrapper'>
        <h2>You may also like</h2>
        <div className='marquee'>
          <div className='maylike-products-container track'>
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
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
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  console.log(product);

  return {
    props: { products, product },
    revalidate: 10,
  };
};

export default ProductDetails;
