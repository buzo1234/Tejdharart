import React, { useState } from 'react';
import { Footer } from '../components';
import Head from 'next/head';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';

const Occasinally = () => {
  const { cat } = useStateContext();
  const [nameForm, setNameForm] = useState('');
  const [emailForm, setEmailForm] = useState('');
  const [phoneForm, setPhoneForm] = useState();
  const [descForm, setDescForm] = useState('');

  const [flag, setFlag] = useState(false);

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
          product: null,
          subject: 'Customized Occasionally yours',
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
      <Head>
        <title>Occasionally Yours | Tejdharart</title>
        <meta name='description' content='Tejdharart' />
        <link rel='icon' href='/logo_tejdharart.jpg' />
      </Head>

      <div className='px-4 my-5 max-w-6xl mx-auto'>
        <p className='text-4xl font-bold font-sans mb-5'>Occasionally Yours</p>
        <p className='text-lg'>
          Gifting is the best way to express. Many occasions are incomplete
          without gifting. When we gift, we make that person feel special and
          the occasion too. If you are bored with stereotypical gift items then
          get in touch with us today. We assure you, we will be your perfect
          gifting partner.
          <br />
          <br />
          We offer Diwali Gifts, Return Gifts suitable for occasion, Bridesmaid
          Gifts, Anniversary Gifts, New Year Gifts, Christmas Gifts, Gift
          Wrapping/Packaging Solutions.
          <br />
          <br />
          • Products in this category are made to order.
          <br /> • Quotation will be sent after products and quantity is
          finalised.
          <br /> • Making time varies as per requirement.
          <br /> • Shipping cost chargeable at actual.
          <br /> • Allow us to deliver you best by placing an order in time.
          <br /> • No refunds/cancellations.
        </p>

        <br />
        <br />

        <p className='font-bold my-3 text-lg'>
          Please fill this form for further enquiries.
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
            placeholder='Please describe your request'
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
            Message sent! You will hear from us shortly
          </p>
        ) : null}
      </div>
      <Footer data={cat} />
    </div>
  );
};

export default Occasinally;
