import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '../context/UserContext';
import axios from 'axios';
import Orderblock from '../components/Orderblock';

export default function Orders() {
  const { state, dispatch } = useUserContext();
  const router = useRouter();
  const [p, setP] = useState(false);
  const [orders, setOrders] = useState([]);

  async function getOrders(id) {
    try {
      console.log('Phone ', id);
      await axios({
        method: 'post',
        url: 'https://tejdhar-otp-service.vercel.app/auth/getorders/',
        data: {
          email: id,
        },
      })
        .then((response) => {
          if (response.data[0]) {
            setOrders(response.data[1]);
          } else {
            console.log('Error Occured');
          }
        })
        .catch((err) => console.log('here ', err));
    } catch (error) {
      console.log('Error ', error);
    }
  }

  useEffect(() => {
    if (state !== undefined) {
      let flag = state.user;
      if (flag.userAvailable) {
        getOrders(flag.userDetails.userPhone);
        setP(true);
        console.log(orders);
      } else {
        setP(false);
      }
    }
  }, [state]);

  if (p) {
    console.log(orders);
    return (
      <div className='max-w-6xl mx-auto px-4'>
        <p className='text-2xl font-semibold'>Your Orders</p>
        {/* Order Template */}
        {/*  */}
        {orders.map((item, i) => {
          return <Orderblock key={i} item={item} index={i + 1} />;
        })}
      </div>
    );
  } else {
    return (
      <div className='h-screen w-screen flex flex-col justify-center items-center'>
        <p className='text-lg font-bold'>Loading...</p>
      </div>
    );
  }
}
