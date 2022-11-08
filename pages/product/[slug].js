import React, { useEffect, useState } from 'react';
import {
  AiOutlineMinus,
  AiOutlinePlus,

 
} from 'react-icons/ai';
import { PortableText } from '@portabletext/react';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi'
import { client, urlFor } from '../../lib/client';
import { Footer, Product } from '../../components';
import { useStateContext } from '../../context/StateContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import ReactImageMagnify from 'react-image-magnify';

const ProductDetails = ({ product, products }) => {
  console.log('product details', product);
  const { productImage, title, body, defaultPrice, colorVariants, custom } =
    product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart, cat } = useStateContext();
  const [selcolor, setselcolor] = useState(null);

  const [nameForm, setNameForm] = useState('');
  const [emailForm, setEmailForm] = useState('');
  const [phoneForm, setPhoneForm] = useState();
  const [descForm, setDescForm] = useState('');

  const [flag, setFlag] = useState(false);


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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      nameForm &&
      emailForm &&
      phoneForm &&
      descForm &&
      phoneForm.length === 10
    ) {
      try {
        let data = {
          name: nameForm,
          email: emailForm,
          phone: phoneForm,
          description: descForm,
        };
        await axios({
          method: 'post',
          url: 'https://tejdhar-otp-service.vercel.app/auth/sendmail',
          data: data,
        })
          .then((res) => {
            if (res.data[0]) {
              console.log(res.data[1]);
              setDescForm('');
              setEmailForm('');
              setPhoneForm('');
              setNameForm('');
              toast.success('Order request received!');
              setFlag(true);
            } else {
              alert(res.data[1]);

              setFlag(false);
            }
          })
          .catch((error) => alert(error));
      } catch (error) {
        alert(error);
      }
    } else {
      alert('Please fill all the details');
    }
  };

  return (
    <div>
      <div className='product-detail-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
        <div className='cols-span-1'>
   
         
          <div className='image-container flex relative'>
            {productImage ? (
              <>
                <div className='absolute top-0 left-0 flex h-full mr-1 items-center justify-center cursor-pointer z-40 rounded-tl-lg rounded-bl-lg w-[50px]  text-6xl ' onClick={() => setIndex(index=== 0 ? productImage.length-1 : index-1)}><FiChevronLeft className='px-2 py-2 bg-white bg-opacity-20 font-bold text-black'/></div>
                  <ReactImageMagnify {...{
                    smallImage: {
                      isFluidWidth: true,
                      src:  urlFor( productImage[index]),
                      
                },
                largeImage: {
                    src: urlFor( productImage[index]),
                    height: 1200,
                    width:1200,
                  
                  },
                  /* enlargedImagePosition: 'over', */
                  imageClassName:'product-detail-image object-contain',
                  enlargedImageClassName: 'max-w-[1200px] object-contain',
                  
                  enlargedImageContainerClassName:'bg-red-500 z-30',
                  isHintEnabled:true
                }} />
              <div className='absolute top-0 right-0 flex h-full ml-1 items-center justify-center cursor-pointer z-40 rounded-tr-lg rounded-br-lg w-[50px]  text-6xl ' onClick={() => setIndex(index!== productImage.length-1 ? index+1 : 0)}><FiChevronRight className='px-2 py-2 bg-white bg-opacity-20 font-bold text-black'/></div>
                </>
              
            /* <img
                src={
                  productImage && urlFor(productImage && productImage[index])
                }
                className='product-detail-image object-contain'
              />  */
            ) : null}
          </div>
          <div className='small-images-container'>
            {productImage?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? 'small-image selected-image border-2 border-solid border-red-500 border-spacing-2' : 'small-image'
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className='product-detail-desc col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2'>
          <h1 className='text-2xl'>{title}</h1>
         
          {colorVariants !== undefined ? (
            <div>
              <p className='font-semibold'>
                Color Variants (Please select your color):
              </p>
              <p className='p-0 m-0 text-sm'>{selcolor}</p>
              <div className='flex gap-4'>
                {colorVariants.map((item, i) => (
                  <div
                    key={i}
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
          <p className='price'>
            {/* &#x20B9;{defaultPrice} */}
            {custom ? '' : <p>&#x20B9;{defaultPrice}</p>}
          </p>
          {!custom ? (
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
          ) : null}

          {custom ? (
            <>
              <p className='font-bold my-3 text-lg'>
                Please fill this form to place a customization order!
              </p>
              <form className='flex flex-col w-full md:w-3/5 lg:w-3/5 xl:w-3/5'>
                <input
                  onChange={(e) => setNameForm(e.target.value)}
                  value={nameForm}
                  type='text'
                  className='mb-4 border-[1px] border-gray-600 border-solid px-3 py-2'
                  placeholder='Enter your name'
                />
                <input
                  onChange={(e) => setEmailForm(e.target.value)}
                  value={emailForm}
                  type='email'
                  className='mb-4 border-[1px] border-gray-600 border-solid px-3 py-2'
                  placeholder='Enter your email'
                />
                <div className='flex w-full '>
                  <input
                    onChange={(e) => setPhoneForm(e.target.value)}
                    value={phoneForm}
                    type='number'
                    placeholder='Enter your phone number'
                    className='mb-4 w-full border-[1px] border-gray-600 border-solid px-3 py-2'
                  />
                </div>
                <textarea
                  onChange={(e) => setDescForm(e.target.value)}
                  value={descForm}
                  className=' border-[1px] border-gray-600 border-solid px-3 py-2'
                  name='description'
                  id='description'
                  placeholder='Enter description of your customized product'
                  cols='30'
                  rows='6'
                ></textarea>
                <div className='buttons'>
                  <button
                    type='button'
                    className='add-to-cart'
                    onClick={(e) => handleFormSubmit(e)}
                  >
                    Submit
                  </button>
                </div>
              </form>

              {flag ? (
                <p className='text-lg text-green-800 font-semibold md:text-xl lg:text-xl xl:text-xl'>
                  Order Request sent! You will hear from us shortly
                </p>
              ) : null}
            </>
          ) : (
            <div className='buttons'>
              <button
                type='button'
                className='add-to-cart'
                onClick={() => onAdd(product, selcolor, qty)}
              >
                Add to Cart
              </button>
              <button
                 type='button'
                className='buy-now bg-gray-500'
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>
          )}
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
      <Footer data={cat} />
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product" && !(_id in path('drafts.**'))] {
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
  const query = `*[_type == "product" && !(_id in path('drafts.**')) && slug.current == '${slug}'][0]`;
  const productsQuery = "*[_type == 'product' && !(_id in path('drafts.**'))]";

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  console.log(product);

  return {
    props: { products, product },
    revalidate: 10,
  };
};

export default ProductDetails;
