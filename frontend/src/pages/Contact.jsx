import React from 'react';
import { assets } from '../assets/assets';

export const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt='' />
        <div className='flex flex-col justify-center items-start gap-6 md:ml-10'>
          <p className='font-semibold text-lg'>Our OFFICE</p>
          <p>27 Labora Road <br /> Suit 23 Abijo GRA Nigeria</p>
          <p>Tel: 08187422213 <br /> Suit 23 Abijo GRA Nigeria</p>
          <p className='font-semibold text-lg'>Careers at flexiDigiHealth</p>
          <p>Learn more about our teams and job openings</p>
          <button className='bg-primary text-white px-4 py-2 rounded-full'>Explore more</button>
        </div>
      </div>
    </div>
  );
}
