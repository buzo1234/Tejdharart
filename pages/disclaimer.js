import React from 'react';
import { Footer } from '../components';

const disclaimer = () => {
  return (
    <div>
      <div className='px-4 my-5 max-w-6xl mx-auto'>
        <p className='text-4xl font-bold font-sans mb-5'>Disclaimers</p>

        <ol className='px-3'>
          <li>
            If any query or doubt or complain we are open for conversation or
            available on tejdharart@gmail.com
          </li>
          <br />
          <li>
            Designs used on products if like any other content are used only as
            representative form of art.
          </li>
          <br />
          <li>
            No one is allowed to sale our products under any other brand name
            without our permission.
          </li>
          <br />
          <li>
            Only shipping damage will be replaced. Only with proper proof & same
            product will be sent. No refund or cash back.{' '}
          </li>
          <br />
          <li>
            No one is allowed to use our logo anywhere without proper
            intimation.{' '}
          </li>
          <br />
          <li>
            Any artwork from Tejdhar can&apos;t be used in the same form under
            other brand name.
          </li>
        </ol>
      </div>
      <Footer />
    </div>
  );
};

export default disclaimer;
