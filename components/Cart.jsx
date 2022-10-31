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
import getStripe from '../lib/getStripe';
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

  const handleCheckout = async () => {
    console.log(totalPrice);
    const userData = JSON.parse(localStorage.getItem('state')).user;
    const data = {
      purpose: 'Payment to Tejdharart',
      amount: totalPrice,
      buyer_name: userData.userDetails.userName,
      phone: userData.userDetails.userPhone,
      redirect_url: 'https://www.tejdharart.com/',
    };

    await axios
      .post('https://tejdhar-otp-service.vercel.app/auth/pay/', data)
      .then((res) => {
        console.log('resp', res.data);
        router.push(res.data);
      })
      .catch((error) => console.log(error.response.data));
  };

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
              <div className='product' key={item?._id}>
                <img
                  src={urlFor(item?.defaultProductVariant?.images[0])}
                  className='cart-product-image'
                />
                <div className='item-desc'>
                  <div className='flex top'>
                    <h5>{item?.title}</h5>
                    <h4>&#x20B9;{item?.defaultProductVariant.price}</h4>
                  </div>
                  <div className='flex bottom'>
                    <div>
                      <p className='quantity-desc'>
                        <span
                          className='minus'
                          onClick={() =>
                            toggleCartItemQuanitity(item?._id, 'dec')
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
                            toggleCartItemQuanitity(item?._id, 'inc')
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
            <div className='btn-container'>
              <div className='bg-red-500 px-3 py-1 mx-auto text-center text-white text-xl rounded-xl mt-5'>
                Please LogIn to continue!
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
