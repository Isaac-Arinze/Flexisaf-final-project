import React from 'react'
import { assets } from '../assets/assets'

export const About = () => {
  return (
    <div>
        <div className='text-center text-2xl pt-10 text-gray-500'>
            <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
        </div>
        <div className='my-10 flex flex-col md:flex-row gap-12'>
            <img className='w-full md:max-w-[360px]' src={assets.about_image} alt='' />
            <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi pariatur corrupti dicta perspiciatis officia tempora praesentium quas deserunt vel labore sit, recusandae cumque molestiae ipsum alias! Labore, quidem? Accusantium?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni error quidem, exercitationem iusto perspiciatis libero facilis ut ipsum? Ea officiis iste porro quisquam nemo sapiente labore cupiditate facilis eum sit?</p>
                <b className='text-gray-800'>Our Values</b>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium excepturi reiciendis facere, at porro, illo, repellat dicta nesciunt distinctio cumque nobis! Rem modi odit reiciendis?</p>

            </div>
        </div>

        <div className='text-xl my-4'>
            <p>MY<span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
        </div>

        
        <div className='flex flex-col md:flex-row mb-20 '>
            <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer' >
                <b>Efficiency:</b>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam voluptate, eius iure obcaecati odio impedit. Voluptatum reiciendis totam nihil mollitia?</p>
            </div>
     
        
            <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
                <b>Convenience</b>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, voluptatibus. Libero expedita numquam laborum hic ipsam exercitationem dignissimos!</p>
            </div>
        
        
            <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
                <b>Personalization</b>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati sapiente corporis mollitia laborum id.</p>
            </div>

        </div>
    </div>
  )
}
