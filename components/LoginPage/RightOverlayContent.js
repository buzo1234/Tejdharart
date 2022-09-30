import Image from 'next/image';

const RightOverlayContent = ({ isAnimated, setIsAnimated }) => {
  return (
    <div className='text-center'>
      <Image
        src={'/log-illustration.png'}
        width={700}
        height={700}
        objectFit='contain'
      />
    </div>
  );
};

export default RightOverlayContent;
