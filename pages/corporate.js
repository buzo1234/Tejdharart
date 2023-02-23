import React, { useState } from 'react';
import { Footer } from '../components';
import Head from 'next/head';
import { useStateContext } from '../context/StateContext';

const corporate = () => {
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
          subject: 'Customized Corporate Gifting',
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
        <title>Coroporate Gifting | Tejdharart</title>
        <meta name='description' content='Tejdharart' />
        <link rel='icon' href='/logo_tejdharart.jpg' />
      </Head>

      <div className='px-4 my-5 max-w-6xl mx-auto'>
        <p className='text-4xl font-bold font-sans mb-5'>Corporate Giftings</p>
        <p className='text-lg'>
          Corporate gifting is a gesture towards your clients, employees or any
          other co-habitant within the business space. Recipients see it as an
          expression of gratitude, appreciation and value. Considering this
          thought, here at Tejdhar Art we offer you customised design products
          or hampers curated uniquely only for you. We make them mainly suitable
          for your budget at the same time occasion. Reach out to us and allow
          us to help you make your people smile.
          <br />
          <br />
          We offer Customised Corporate stationery, Goodie Bags, Hampers,
          Combos, Gift Packaging Solutions.
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

export default corporate;
