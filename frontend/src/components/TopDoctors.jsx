import React, { useContext } from 'react';
// import { doctors } from '../assets/assets'; 
import { AppContext } from '../context/AppContext';
import {useNavigate} from 'react-router-dom'// Assuming doctors is an array

export const TopDoctors = () => {

    const navigate =useNavigate();
    const {doctors} = useContext(AppContext)

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>

      <p className='sm:w-1/3 text-center text-sm'>
        Simply browse through our extensive list of trusted doctors
      </p>

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-5 gap-y-6 px-3 sm:px-0'>

        {doctors.slice(0, 10).map((item, index) => (
        
          <div key={index} onClick={() => {navigate(`/appointment/${item._id}`); 
          scrollTo(0,0)}} className='p-4 border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                    
            <img src={item.image} alt={item.name} className='bg-blue-50 w-full h-auto rounded ' />
            <div>
            <div className='flex items-center gap-2 text-sm text-center text-green-500'>
            <p className='w-2 h-2 bg-green-500 rounded-full'>   </p><p>Available</p>
            </div>
            <p className='font-semibold'>{item.name}</p>
            <p className='text-sm text-gray-600'>{item.speciality}</p>
            </div>
          </div>
        ))} 
      </div>

      <button onClick={()=>{ navigate('/doctors'); scrollTo(0,0)}} className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md'> More </button>
    </div>
  );
};
