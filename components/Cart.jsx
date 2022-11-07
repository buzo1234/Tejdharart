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
  const [address, setAddress] = useState('');
  const [add1, setAdd1] = useState('');
  const [add2, setAdd2] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [pin, setPin] = useState('');
  const [land, setLand] = useState('');

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
    let location = add1 + ", " + add2 + ", " + state + ", " + city + ", " + pin + ", " + land
    
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

    console.log(location)

    try {
      let new_cart = {
        cart: cartItems,
        address: location,
        userID: userData.userDetails.userPhone,
        userNa: userData.userDetails.userName,
      };
      await axios({
        method: 'post',
        url: 'https://tejdhar-otp-service.vercel.app/auth/atc',
        data: new_cart,
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
      <div className='cart-container overflow-y-scroll'>
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

        <div className='w-full px-3 py-2 flex flex-col items-center justify-center mt-3 mb-2 overflow-auto'>
          <div className='flex w-full'>
            <p className='text-left text-lg font-bold'>Address</p>
          </div>
          <table className='flex w-full justify-center items-center flex-col '>
            <tr className='flex w-full py-1 justify-center'>
              <td className='flex w-full mx-2'>
                <input type="text" placeholder='Address Line 1' onChange={(e) => setAdd1(e.target.value)} required className='border-red-500 border-[1px] w-full px-2 py-1'/>
              </td>
            
            </tr>
            <tr className='flex w-full py-2 justify-center'>
              <td className='flex w-full mx-2'>
              <input type="text" placeholder='Address Line 2 (optional)' onChange={(e) => setAdd2(e.target.value)} className='border-red-500 border-[1px] w-full px-2 py-1'/>
              </td>
            </tr>
            <tr className='flex w-full py-2 justify-center'>
              <td className='flex w-full mx-2'>
              <input type="text" placeholder='State' onChange={(e) => setState(e.target.value)} required className='border-red-500 border-[1px] w-full px-2 py-1'/>
              </td>
              <td className='flex w-full mx-2'>
              <input type="text" placeholder='City' onChange={(e) => setCity(e.target.value)} required className='border-red-500 border-[1px] w-full px-2 py-1'/>
              </td>
            </tr>
            <tr className='flex w-full py-2 justify-center'>
              <td className='flex w-full mx-2'>
              <input type="text" placeholder='Pin' onChange={(e) => setPin(e.target.value)} required className='border-red-500 border-[1px] w-full px-2 py-1'/>
              </td>
              <td className='flex w-full mx-2'>
              <input type="text" placeholder='Nearest Landmark' onChange={(e) => setLand(e.target.value)} required className='border-red-500 border-[1px] w-full px-2 py-1'/>
              </td>
            </tr>
          </table>
          
        </div>

        <div className='product-container '>
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
          <div className='cart-bottom bg-white'>
            <div className='total'>
              <h3>Subtotal:</h3>
              <h3>&#x20B9;{totalPrice}</h3>
            </div>
            <div className='btn-container'>
              <button
                type='button'
                className='btn disabled:bg-gray-400 disabled:cursor-not-allowed'
                disabled={(add1.length > 10 && state.length > 3 && city.length > 2 && pin.length === 6) ? false : true}
                onClick={handleCheckout}
              >
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
