import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '../context/UserContext';
import axios from 'axios';
import Head from 'next/head';
import Orderblock from '../components/Orderblock';
import { useStateContext } from '../context/StateContext';
import { Footer } from '../components';
export default function Orders() {
  const { cat } = useStateContext();
  const { state, dispatch } = useUserContext();
  const router = useRouter();
  const [p, setP] = useState(false);
  const [orders, setOrders] = useState([]);
  const [suc, setSuc] = useState('');

  const status2 = router.query.status;
  
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
          console.log('res', response);
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

  console.log('orders', orders);

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
      <div>
        <Head>
          <title>Orders | Tejdharart</title>
          <meta name='description' content='Generated by create next app' />
          <link rel='icon' href='/logo_tejdharart.jpg' />
        </Head>
        {status2 !== 'Success' ? <p className='px-4 py-4 text-2xl text-red-500 font-bold'>Failed to place the order</p> : null}
        
        <div className='max-w-6xl mx-auto px-4'>
          <p className='text-2xl font-semibold'>Your Orders</p>
          {/* Order Template */}
          {/*  */}
          {orders.length > 0 ? (
            orders.map((item, i) => {
              return (
                <Orderblock
                  key={i}
                  item={item.order}
                  index={i + 1}
                  date={item.datetime}
                  status={item?.status}
                />
              );
            })
          ) : (
            <div className='flex w-full h-screen'>
              <p className='font-bold text-black text-3xl mx-4'>
                No Previous Orders
              </p>
            </div>
          )}
        </div>
        <Footer data={cat} />
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
