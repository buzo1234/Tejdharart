import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
const Aboutus = () => {
  return (
    <div className='mt-10 flex justify-center max-w-6xl mx-auto flex-col items-center about__para'>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com'></link>
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossorigin
        ></link>
        <link
          href='https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap'
          rel='stylesheet'
        ></link>
        {/* <link rel='preconnect' href='https://fonts.googleapis.com'></link>
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin
        ></link>
        <link
          href='https://fonts.googleapis.com/css2?family=Kalam&display=swap'
          rel='stylesheet'
        ></link>

        <link rel='preconnect' href='https://fonts.googleapis.com'></link>
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin
        ></link>
        <link
          href='https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@500&display=swap'
          rel='stylesheet'
        ></link>

        <link rel='preconnect' href='https://fonts.googleapis.com'></link>
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin
        ></link>
        <link
          href='https://fonts.googleapis.com/css2?family=Baloo+2&family=Caveat:wght@500&display=swap'
          rel='stylesheet'
        ></link> */}
      </Head>
      <p className='text-[64px] font-bold italic'>ABOUT US</p>
      <p className='font-semibold text-[36px] italic my-5 text-center'>
        &quot;Love, emotions, feelings, and a lot of &apos;unsaid
        words&apos;&quot;
      </p>
      <div className='flex w-full h-1 bg-yellow-200'>{/* Underline */}</div>
      <section className='flex flex-col '>
        <p className='text-yellow-500 text-[28px] md:text-[48px] lg:text-[48px] xl:text-[48px] text-center font-bold italic my-10'>
          Wondering what &quot;Tej-Dhar&quot; means?
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 items-center justify-center gap-5'>
          <p className='col-span-1 text-[25px] px-5 about__para'>
            Well, it does mean &apos;precise&apos; and &apos;sharp&apos; but
            it&apos;s an acronym of the founder&apos;s name. Tejashree Dharane.
            Tej-Dhar Art was founded in April 2019 with the idea of bringing
            Nostalgia, creativity, uniqueness and lots of love, packaged in the
            form of a GIFT. We understand your need for that perfect gift for
            that special someone, or for that special occasion. We make sure
            that “special someone” feels really special and it does make a
            lasting impression.
          </p>
          <Image
            src={'/abtus-new.png'}
            height={400}
            width={400}
            objectFit='contain'
            className='col-span-1 mt-4 md:mt-0 lg:mt-0 xl:mt-0'
          />
        </div>
      </section>
      <section className='flex flex-col text-[25px] px-5 font-poppins'>
        <p className='text-yellow-500 text-[28px] md:text-[48px] lg:text-[48px] xl:text-[48px] text-center font-bold italic my-10'>
          So, what makes us unique?
        </p>
        <p className='about__para'>
          Firstly, each item handpicked, impromptu designs, the creatives are
          developed in-house and the finished product is hand-crafted making
          each piece unique in itself.
        </p>
        <br />
        <p className='about__para'>
          Secondly, almost all the items are locally sourced. So, we ensure
          quality and better life for our products.
        </p>
        <br />
        <p className='about__para'>
          And last but not the least, we ensure you get the best &apos;Value for
          money&apos;, experience.
        </p>
        <br />
        <p className='about__para'>
          We also have a customised option. Wherein we discuss with you, to
          understand your specific need, gather info about the recipient, their
          psyche and based on this we customise the gift for you. So, each gift
          is truly unique and nothing of the shelf. We have ensured that our
          product lines are &apos;Quirky&apos; enough and contemporary too. It
          well evident just by their names. Like &apos;Twisted Bollywood&apos;,
          &apos;Measurers&apos;, &apos;Daaru&apos; and more…
        </p>
        <br />
        <p>
          <b className='about__para'>
            We have recently added the &apos;Wedding Goodies&apos; and the
            &apos;Corporate gifting&apos; section. Make sure to visit them too.
          </b>
        </p>
        <br />
        <p className=' text-3xl'>
          &apos;There&apos;s no better way than a personalised &apos;Gift&apos;,
          to express yourself.&apos;
        </p>

        <p className=' text-4xl text-yellow-500'>
          Love, emotions, feelings, and a lot of &apos;unsaid words&apos;
        </p>
        <br />
        <p className='text-right about__para'>- it&apos;s the Tej-Dhar touch</p>
      </section>
    </div>
  );
};

export default Aboutus;
