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
import { client } from '../lib/client';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import { obj } from './statecity';

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
    setTotalPrice,
    discount,
  } = useStateContext();
  const router = useRouter();
  const [present, setPresent] = useState(false);

  const [add1, setAdd1] = useState('');
  const [add2, setAdd2] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [statearr, setstatearr] = useState([
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttarakhand',
    'Uttar Pradesh',
    'West Bengal',
    'Jammu & Kashmir',
  ]);
  const [pin, setPin] = useState('');
  const [land, setLand] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState(
    ((100 - discount) / 100) * totalPrice
  );

  const [sf, setsf] = useState(0);

  useEffect(() => {
    console.log('city', city);
    if (city !== '') {
      if (city !== 'sc') {
        if (city === 'Mumbai' || city === 'Pune') {
          setsf(75);
        } else {
          setsf(135);
        }
      } else {
        setsf(0);
      }
    }
  }, [city, state]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('state')).user;
    console.log('Entered in use', userData);
    if (userData.userAvailable) {
      setPresent(true);
      console.log('done');
    } else {
      setPresent(false);
      console.log('not done');
    }
    console.log(present);
  }, []);

  console.log('CART DATA', cartItems);

  async function UpdateInStock(docid, qty) {
    client
      .patch(docid)
      .dec({ InStock: qty })
      .commit()
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  const handleCheckout = async () => {
    const toastId = toast.loading('Checking out...');
    let location =
      add1 +
      ', ' +
      add2 +
      ', ' +
      state +
      ', ' +
      city +
      ', ' +
      pin +
      ', ' +
      land;

    console.log(totalPrice);
    var paymentPrice = discount > 0 ? discountedPrice + sf : totalPrice + sf;
    const userData = JSON.parse(localStorage.getItem('state')).user;
    const data = {
      purpose: 'Payment to Tejdharart',
      amount: paymentPrice,
      buyer_name: userData.userDetails.userName,
      phone: userData.userDetails.userPhone,
      redirect_url: `https://tejdhar-otp-service.vercel.app/auth/orders?user_id=${userData.userDetails.userPhone}`,
      webhook_url: '/webhook/',
    };

    console.log(location);

    try {
      let new_cart = {
        cart: cartItems,
        address: location,
        userID: userData.userDetails.userPhone,
        userNa: userData.userDetails.userName,
        datetime: new Date(),
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
          toast.remove(toastId);
          console.log('RESPONSE_DATA', res.data);
          console.log('resp', res.data.payment_request.longurl);
          router.push(res.data.payment_request.longurl);
        })
        .catch((error) => {
          alert('Error now ', error);
          return;
        });
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
                <input
                  type='text'
                  placeholder='Address Line 1'
                  onChange={(e) => setAdd1(e.target.value)}
                  required
                  className='border-red-500 border-[1px] w-full px-2 py-1'
                />
              </td>
            </tr>
            <tr className='flex w-full py-2 justify-center'>
              <td className='flex w-full mx-2'>
                <input
                  type='text'
                  placeholder='Address Line 2 (optional)'
                  onChange={(e) => setAdd2(e.target.value)}
                  className='border-red-500 border-[1px] w-full px-2 py-1'
                />
              </td>
            </tr>
            <tr className='flex w-full py-2 justify-center'>
              <td className='flex w-full mx-2'>
                <select
                  name='state'
                  id=''
                  onChange={(e) => {
                    setState(e.target.value);
                    setCity('sc');
                  }}
                  required
                  className='border-red-500 border-[1px] w-full px-2 py-1'
                >
                  <option value='Select State'>Select State</option>
                  {statearr.map((val, id) => (
                    <option value={val} key={id}>
                      {val}
                    </option>
                  ))}
                </select>
              </td>
              <td className='flex w-full mx-2'>
                <select
                  name='city'
                  id=''
                  value={city}
                  defaultValue='sc'
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className='border-red-500 border-[1px] w-full px-2 py-1'
                >
                  <option value='sc'>Select City</option>
                  {state && state !== 'sc'
                    ? obj[state].map((val, id) => (
                        <option value={val.city} key={id}>
                          {val.city}
                        </option>
                      ))
                    : null}
                </select>
              </td>
            </tr>
            <tr className='flex w-full py-2 justify-center'>
              <td className='flex w-full mx-2'>
                <input
                  type='text'
                  placeholder='Pin'
                  onChange={(e) => setPin(e.target.value)}
                  required
                  className='border-red-500 border-[1px] w-full px-2 py-1'
                />
              </td>
              <td className='flex w-full mx-2'>
                <input
                  type='text'
                  placeholder='Nearest Landmark'
                  onChange={(e) => setLand(e.target.value)}
                  required
                  className='border-red-500 border-[1px] w-full px-2 py-1'
                />
              </td>
            </tr>
          </table>
        </div>

        <div className='product-container '>
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div
                className='product'
                key={item?._id + item?.colorVariant + item?.sizeVariant}
              >
                <img
                  src={urlFor(item?.productImage?.[0])}
                  className='cart-product-image'
                />
                <div className='item-desc'>
                  <div className='flex top'>
                    <h5>{item?.title}</h5>
                    {item?.variantPrice === item?.defaultPrice ? (
                      <h4>&#x20B9;{item?.defaultPrice}</h4>
                    ) : (
                      <h4>&#x20B9;{item?.variantPrice}</h4>
                    )}
                  </div>
                  {item?.colorVariant !== null || item?.sizeVariant !== null ? (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        marginTop: '10px',
                      }}
                    >
                      {item?.colorVariant !== null ? (
                        <p>
                          Colour : <b>{item?.colorVariant}</b>
                        </p>
                      ) : null}
                      {item?.sizeVariant !== null ? (
                        <div>
                          <p>
                            Size : <b>{item?.sizeVariant}</b>
                          </p>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                  <div className='flex bottom'>
                    <div>
                      {item?.InStock === item?.quantity ? (
                        <p className='font-semibold text-yellow-500 text-sm'>
                          Only {item?.InStock} left in stock.
                        </p>
                      ) : null}
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

        {present ? (
          <div className='cart-bottom bg-white'>
            <div className='flex w-full justify-between mb-2'>
              <h4>Total Price</h4>
              <h4>&#x20B9;{totalPrice}</h4>
            </div>
            {discount && cartItems.length > 0 && discount > 0 ? (
              <div>
                <div className='flex w-full justify-between mb-2'>
                  <h4>Discount</h4>
                  <h4>{discount}%</h4>
                </div>
                <div className='flex w-full justify-between mb-2'>
                  <h4>Discounted Price</h4>
                  <h4>&#x20B9;{discountedPrice}</h4>
                </div>
              </div>
            ) : null}
            <div className='flex w-full justify-between mb-2'>
              <h4>Shipping Fees</h4>
              <h4>&#x20B9;{sf}</h4>
            </div>
            <div className='bg-gray-500 h-[1px] w-full flex mb-2'></div>
            <div className='total'>
              <h3>Subtotal:</h3>
              <h3>&#x20B9;{discountedPrice + sf}</h3>
            </div>
            <div className='my-8'>
              <ul>
                <li>
                  Order will be dispatched within 4 to 5 working days once
                  placed.
                </li>
                <li>Once order placed cannot be exchanged/ Cancelled.</li>
                <li>Select the colour and quantity properly.</li>
                <li>Delivery time may vary as per location.</li>
              </ul>
            </div>
            {add1.length > 10 &&
            state.length > 2 &&
            city !== 'sc' &&
            city.length > 2 &&
            state !== 'Select State' &&
            pin.length === 6 ? (
              false
            ) : true ? (
              <p className='text-center text-sm text-red-600 mt-4'>
                Please enter valid Address
              </p>
            ) : null}
            <div className='btn-container'>
              <button
                type='button'
                className='btn disabled:bg-gray-400 disabled:cursor-not-allowed mt-4 disabled:mt-0'
                disabled={
                  add1.length > 10 &&
                  state.length > 2 &&
                  city !== 'sc' &&
                  city.length > 2 &&
                  state !== 'Select State' &&
                  pin.length === 6
                    ? false
                    : true
                }
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
