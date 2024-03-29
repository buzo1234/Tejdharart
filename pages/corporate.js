import React, { useState } from 'react';
import { Footer } from '../components';
import Head from 'next/head';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import ReactImageMagnify from 'react-image-magnify';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Corporate = () => {
  const { cat } = useStateContext();
  const [nameForm, setNameForm] = useState('');
  const [emailForm, setEmailForm] = useState('');
  const [phoneForm, setPhoneForm] = useState();
  const [descForm, setDescForm] = useState('');
  const [index, setIndex] = useState(0);

  const [flag, setFlag] = useState(false);

  const productImage = ['/cg1.jpeg', '/cg2.jpeg', '/cg3.jpeg'];

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
              toast.success('Request received!');
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
        <div className='product-detail-container  justify-center grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 items-center gap-y-4' style={{margin:'0px', gap:'20px 0px', marginTop:'0px'}}>
          <div className='col-span-1 md:col-span-3 lg:col-span-3 xl:col-span-3 '>
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
          <div className='col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2  p-2 flex flex-col w-full items-start'>
            <div className='image-container flex relative'>
              {productImage ? (
                <>
                  <div
                    className='absolute top-0 left-0 flex h-full mr-1 items-center justify-center cursor-pointer z-40 rounded-tl-lg rounded-bl-lg w-[50px]  text-6xl '
                    onClick={() =>
                      setIndex(
                        index === 0 ? productImage.length - 1 : index - 1
                      )
                    }
                  >
                    <FiChevronLeft className='px-2 py-2 bg-white bg-opacity-20 font-bold text-black' />
                  </div>
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        isFluidWidth: true,
                        src: productImage[index],
                      },
                      largeImage: {
                        src: productImage[index],
                        height: 1500,
                        width: 1500,
                      },
                      /* enlargedImagePosition: 'over', */
                      imageClassName: 'product-detail-image object-contain',
                      enlargedImageClassName: 'max-w-[1500px] object-contain left-0',

                      enlargedImageContainerClassName: 'bg-red-500 z-30 ',
                      isHintEnabled: true,
                      enlargedImagePosition: "over"
                    }}
                  />
                  <div
                    className='absolute top-0 right-0 flex h-full ml-1 items-center justify-center cursor-pointer z-40 rounded-tr-lg rounded-br-lg w-[50px]  text-6xl '
                    onClick={() =>
                      setIndex(
                        index !== productImage.length - 1 ? index + 1 : 0
                      )
                    }
                  >
                    <FiChevronRight className='px-2 py-2 bg-white bg-opacity-20 font-bold text-black' />
                  </div>
                </>
              ) : /* <img
            src={
              productImage && urlFor(productImage && productImage[index])
            }
                className='product-detail-image object-contain'
                />  */
              null}
            </div>
            <div className='small-images-container'>
              {productImage?.map((item, i) => (
                <img
                  key={i}
                  src={item}
                  className={
                    i === index
                      ? 'small-image selected-image border-2 border-solid border-red-500 border-spacing-2'
                      : 'small-image'
                  }
                  onMouseEnter={() => setIndex(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer data={cat} />
    </div>
  );
};

export default Corporate;
