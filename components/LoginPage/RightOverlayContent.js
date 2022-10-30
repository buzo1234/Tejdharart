import Image from 'next/image';

const RightOverlayContent = ({ isAnimated, setIsAnimated }) => {
  return (
    <div className='text-center'>
      <Image
        src={'/log-illustration.png'}
        width={600}
        height={600}
        objectFit='contain'
      />
    </div>
  );
};

export default RightOverlayContent;
