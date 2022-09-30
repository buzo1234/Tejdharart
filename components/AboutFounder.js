import React from 'react';
import Image from 'next/image';

const AboutFounder = () => {
  return (
    <div className='mt-10 flex justify-center w-full flex-col items-center font-poppins max-w-6xl mx-auto'>
      <p className='text-[64px] px-2 text-center font-bold italic my-12'>
        About the Founder
      </p>
      <div className='w-full'>
        <img
          src={'/founder.jpeg'}
          height={400}
          width={400}
          className='float-left object-contain px-5 py-5'
        />
        <p className='text-[25px] about__para px-5 '>
          Creativity is the core of Tejashree&apos;s personality. Having no
          formal education or a degree in Arts, this fact hasn&apos;t deterred
          her from exploring the artsy world because she had an inherent connect
          with colours, paper, pencils, pens and brushes since childhood. Moreso
          a sharp &apos;eye&apos; for anything and everything creative. Even
          today you&apos;d find her with her sketchbook or her iPad in her spare
          time. This hobby of hers has been a great stress-buster too.
          <br />
          <br />
          The story behind Tej-Dhar is equally unique. It all began with unique
          suggestions to family and friends on gifting ideas. People loved them
          (Ideas) and many even went beyond saying, “Hey why not do it for me?”
          So, I did it for my aunt, my uncle my friend and they all just loved
          it. All I ensured was that it was hand-crafted. One thing led to
          another; people began to take notice. Appreciation followed repeat
          requests, and people began compensating for my efforts too. That is
          when the idea of formalising things began to take shape and I
          conceptualised Tej-Dhar.
          <br />
          <br />
          The <b>“Peti-Box”</b>, concept was an instant hit. With great reviews,
          heart-felt testimonials and repeat orders, Tej-Dhar was in demand. So,
          I began to improvise and added newer product lines. My motto has been
          Quality, Hands-On, Value-for-money and that magical personal touch.
          <br />
          <br />
        </p>
        <p className=' underline text-[48px] font-semibold tagline px-2 text-center'>
          I&apos;m sure you&apos;ll love it too!
        </p>
      </div>
    </div>
  );
};

export default AboutFounder;
