import React from 'react';
import { Footer } from '../components';
import { useStateContext } from '../context/StateContext';

const Cancellation = () => {
  const { cat } = useStateContext();
  return (
    <div>
      <div className='px-4 my-5 max-w-6xl mx-auto'>
        <p className='text-4xl font-bold font-sans mb-5'>
          RETURN, Cancellation & REFUND POLICY
        </p>
        <p className='font-bold'>Cancellation Policy</p>
        <br />
        <p>
          A cancellation occurs when a consumer returns an item purchased on an
          e-commerce website. Tejdhar Follows <b>No Cancellation Policy</b>.
          Order once placed cannot be cancelled. Be careful before placing order
          on Tejdhar Portal.
        </p>
        <br />
        <br />
        <p className='font-bold'>Exchanges</p>
        <br />
        <p>
          Product if damaged during transportation or having manufacturing
          defect before delivery will be exchanged by Tejdhar art. No other
          product will be exchanged by Tejdhar. Tejdhar Team will check for
          damages and after all checks exchange will be initiated. Tejdharart
          reserves the right to cancel or refuse to accept any order placed due
          to various reasons including but not limited to, the non-availability
          of stock, pricing errors, informational errors or problems identified
          with the personal/financial details provided by the customer. Proof of
          bill and original packaging must be provided at the time of exchange.
          Once used, products will be ineligible for exchange or return.{' '}
        </p>
        <br />
        <br />
        <p className='font-bold'>Refunds</p>
        <br />
        <p>
          We follow no refund policy. As we are not providing cancellation and
          exchange refund will not be initiated. For the damages and
          manufacturing defects we are providing Product to Product replacement.
          In this case all transportation charges for product will be in the
          scope of customer.
        </p>
        <br />
        <br />
        <p className='font-bold'>Damages and Issues</p>
        <br />
        <p>
          Please inspect your order upon reception and contact us immediately if
          the item is defective, damaged or if you receive the wrong item, so
          that we can evaluate the issue and make it right. <br />
          <br />
          To rectify this issue write us on{' '}
          <span className='text-blue-800 underline'>
            info@tejdharart.com/ info@tejdharart.in
          </span>
        </p>
        <br />
        <br />
        <p className='font-bold'>Exceptions / Non-Returnable items</p>
        <br />
        <p>
          Certain types of items cannot be returned, like custom products (such
          as special orders or personalized items), and personal care goods.
          Please get in touch if you have questions or concerns about your
          specific item.
        </p>
      </div>
      <Footer data={cat} />
    </div>
  );
};

export default Cancellation;
