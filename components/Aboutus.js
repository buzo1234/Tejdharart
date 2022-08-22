import React from 'react';
import Image from 'next/image';

const Aboutus = () => {
  return (
    <div className='mt-10 flex justify-center max-w-6xl mx-auto flex-col items-center font-poppins'>
      <p className='text-[64px] font-bold italic'>ABOUT US</p>
      <p className='font-semibold text-[36px] italic my-5 text-center'>
        "Love, emotions, feelings, and a lot of 'unsaid words'"
      </p>
      <div className='flex w-full h-1 bg-yellow-200'>{/* Underline */}</div>
      <section className='flex flex-col '>
        <p className='text-yellow-500 text-[48px] text-center font-bold italic my-10'>
          Wondering what "Tej-Dhar" means?
        </p>
        <div className='grid grid-cols-2 items-center justify-center'>
          <p className='col-span-1 text-[25px] px-5 font-poppins'>
            Well, it does mean ‘precise’ and ‘sharp’ but it’s an acronym of the
            founder’s name. Tejashree Dharane. Tej-Dhar Art was founded xxx
            years ago with the idea of bringing Nostalgia, creativity,
            uniqueness and lots of love, packaged in the form of a GIFT. We
            understand your need for that perfect gift for that special someone,
            or for that special occasion. We make sure that “special someone”
            feels really special and it does make a lasting impression.
          </p>
          <Image
            src={'/abtus-new.png'}
            height={400}
            width={400}
            objectFit='contain'
            className='col-span-1'
          />
        </div>
      </section>
      <section className='flex flex-col text-[25px] px-5 font-poppins'>
        <p className='text-yellow-500 text-[48px] text-center font-bold italic my-10'>
          So, what makes us unique?
        </p>
        <p className='font-poppins'>
          Firstly, each item handpicked, impromptu designs, the creatives are
          developed in-house and the finished product is hand-crafted making
          each piece unique in itself.
        </p>
        <br />
        <p className='font-poppins'>
          Secondly, almost all the items are locally sourced. So, we ensure
          quality and better life for our products.
        </p>
        <br />
        <p className='font-poppins'>
          And last but not the least, we ensure you get the best “Value for
          money”, experience.
        </p>
        <br />
        <p className='font-poppins'>
          We also have a customised option. Wherein we discuss with you, to
          understand your specific need, gather info about the recipient, their
          psyche and based on this we customise the gift for you. So, each gift
          is truly unique and nothing of the shelf. We have ensured that our
          product lines are ‘Quirky’ enough and contemporary too. It well
          evident just by their names. Like “Twisted Bollywood”, “Measurers”,
          “Daaru” and more…
        </p>
        <br />
        <p className='font-poppins'>
          <b>
            We have recently added the “Wedding Goodies” and the “Corporate
            gifting” section. Make sure to visit them too.
          </b>
        </p>
        <br />
        <p className='font-poppins'>
          “There’s no better way than a personalised ‘Gift’, to express
          yourself.”
        </p>
        <br />
        <br />
        <p className='font-poppins text-yellow-500'>
          Love, emotions, feelings, and a lot of ‘unsaid words’
        </p>
        <br />
        <p className='text-right font-poppins'>- it’s the Tej-Dhar touch</p>
      </section>
    </div>
  );
};

export default Aboutus;
