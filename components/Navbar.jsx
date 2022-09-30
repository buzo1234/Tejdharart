import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import Image from 'next/image';

import { Cart } from './';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className='navbar-container'>
      <p className='logo mt-2'>
        <Link href='/'>
          <Image src='/logo_tejdharart.jpg' width={120} height={120} />
        </Link>
      </p>

      <div className='flex items-center  space-x-5'>
        <Link href='/login'>
          <button className='flex px-3 py-1 bg-white border-2 border-black rounded-md h-fit'>
            Login/Signup
          </button>
        </Link>

        <button
          type='button'
          className='cart-icon'
          onClick={() => setShowCart(true)}
        >
          <AiOutlineShopping />
          <span className='cart-item-qty'>{totalQuantities}</span>
        </button>

        {showCart && <Cart />}
      </div>
    </div>
  );
};

export default Navbar;
