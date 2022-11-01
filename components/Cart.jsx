import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import axios from 'axios';
import { useRouter } from 'next/router';

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
  } = useStateContext();
  const router = useRouter();
  const [present, setPresent] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('state')).user;

    if (userData.userAvailable) {
      setPresent(true);
    } else {
      setPresent(false);
    }
  }, []);

  console.log(cartItems);

  const handleCheckout = async () => {
    console.log(totalPrice);
    const userData = JSON.parse(localStorage.getItem('state')).user;
    const data = {
      purpose: 'Payment to Tejdharart',
      amount: totalPrice,
      buyer_name: userData.userDetails.userName,
      phone: userData.userDetails.userPhone,
      redirect_url: `https://tejdhar-otp-service.vercel.app/auth/orders?user_id=${userData.userDetails.userPhone}`,
      webhook_url: '/webhook/',
    };

    try {
      await axios({
        method: 'post',
        url: 'https://tejdhar-otp-service.vercel.app/auth/atc',
        data: {
          userID: userData.userDetails.userPhone,
          cart: cartItems,
        },
      })
        .then((res) => {
          console.log('response ', res);
          if (res.data[0]) {
            console.log('cart updated');
          } else {
            alert('Error');
          }
        })
        .catch((error) => {
          console.log(error);
          alert('Error Occured');
          return;
        });

      await axios({
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
          'Access-Control-Allow-Headers':
            'Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization',
        },
        withCredentials: false,

        url: 'https://tejdhar-otp-service.vercel.app/auth/pay/',
        data: data,
      })
        .then((res) => {
          console.log('resp', res.data);
          router.push(res.data);
        })
        .catch((error) => console.log('Error now ', error));
    } catch (error) {
      alert(error);
    }
  };

  function routeLogin() {
    setShowCart(false);
    router.push('/login');
  }

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button
          type='button'
          className='cart-heading'
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href='/'>
              <button
                type='button'
                onClick={() => setShowCart(false)}
                className='btn'
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className='product-container'>
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className='product' key={item?._id + item?.colorVariant}>
                <img
                  src={urlFor(item?.productImage?.[0])}
                  className='cart-product-image'
                />
                <div className='item-desc'>
                  <div className='flex top'>
                    <h5>{item?.title}</h5>
                    <h4>&#x20B9;{item?.defaultPrice}</h4>
                    {item?.colorVariant !== null ? (
                      <p>Colour : {item?.colorVariant}</p>
                    ) : null}
                  </div>
                  <div className='flex bottom'>
                    <div>
                      <p className='quantity-desc'>
                        <span
                          className='minus'
                          onClick={() =>
                            toggleCartItemQuanitity(item.id_main, 'dec')
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className='num' onClick=''>
                          {item?.quantity}
                        </span>
                        <span
                          className='plus'
                          onClick={() =>
                            toggleCartItemQuanitity(item.id_main, 'inc')
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type='button'
                      className='remove-item'
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && present ? (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal:</h3>
              <h3>&#x20B9;{totalPrice}</h3>
            </div>
            <div className='btn-container'>
              <button type='button' className='btn' onClick={handleCheckout}>
                Pay Now
              </button>
            </div>
          </div>
        ) : (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal:</h3>
              <h3>&#x20B9;{totalPrice}</h3>
            </div>

            <div className='btn-container cursor-pointer' onClick={routeLogin}>
              <div className='bg-red-500 px-3 py-1 mx-auto text-center text-white shadow-md text-lg rounded-xl mt-5'>
                Please Login to continue!
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
