import Image from 'next/image';

const LeftOverlayContent = ({ isAnimated, setIsAnimated }) => {
  return (
    <div className='text-center'>
      <Image
        src={'/create-illustation.png'}
        width={700}
        height={700}
        objectFit='contain'
      />
    </div>
  );
};

export default LeftOverlayContent;