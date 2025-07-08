import Image from 'next/image'
import React from 'react'

const SectionForFunding = ({title , imgSrc}) => {
  return (
    <div className='cursor-pointer text-center flex flex-col justify-center items-center overflow-x-hidden'>
     <Image className='rounded-2xl w-20 md:w-[90px]' src={imgSrc} alt={title} width={90} height={45}/>
      <h3 className='text-[15px] py-4'>
        {title}
      </h3>
    </div>
  )
}

export default SectionForFunding
