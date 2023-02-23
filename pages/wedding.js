import React, { useState } from 'react';
import { Footer } from '../components';
import Head from 'next/head';
import axios from 'axios';
import { useStateContext } from '../context/StateContext';

const Wedding = () => {
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
          subject: 'Customized Wedding Bells & Vibes',
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
        <title>Wedding Bells | Tejdharart</title>
        <meta name='description' content='Tejdharart' />
        <link rel='icon' href='/logo_tejdharart.jpg' />
      </Head>

      <div className='px-4 my-5 max-w-6xl mx-auto'>
        <p className='text-4xl font-bold font-sans mb-5'>
          Wedding Bells & Vibes
        </p>
        <p className='text-lg'>
          We are famous in the world for &apos;Big Fat Indian Weddings&apos;.
          Weddings are full of designer clothes to classy decors, delicious food
          to ghodiwali baraat and love loaded blessings to thoughtful gifts. If
          everything can be designed or customised in a wedding as per theme,
          then why not gifts? At this point in wedding, Tejdhar Art is happily
          there to help you making memories together.
          <br />
          <br />
          We offer Custom Designed Invitations, Gift Hampers, Return Gifts,
          Wedding Favours, Gift Tags, Trousseau Packing.
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

export default Wedding;
