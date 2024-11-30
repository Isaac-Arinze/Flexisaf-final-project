import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'


export const Doctors = () => {

    const {speciality}   = useParams()
    const {filterDoc,setFilterDoc} = useState()
    // console.log(speciality)()
    const {doctors} = useContext(AppContext)
    const applyFilter = () =>{
        if (speciality){
            setFilterDoc(doctors.filter (doc => doc.speciality === speciality))
        }else{
            setFilterDoc(doctors)
        }
    }
  return (
    <div>
        <p>Browse through the doctors specialist.</p>
    
    <div>
        <p>General physician</p>
        <p>Gynecologist</p>
        <p>Dermatologist</p>
        <p>Pediatricians</p>
        <p>Gastroenterologist</p>
    </div>
    <div>
        {
            filterDoc.map((item, index) => (
        
                <div key={index} onClick={()=>navigate(`/appointment/${item._id}`)} className='p-4 border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                          
                  <img src={item.image} alt={item.name} className='bg-blue-50 w-full h-auto rounded ' />
                  <div>
                  <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                  <p className='w-2 h-2 bg-green-500 rounded-full'>   </p><p>Available</p>
                  </div>
                  <p className='font-semibold'>{item.name}</p>
                  <p className='text-sm text-gray-600'>{item.speciality}</p>
                  </div>
                </div>
              ))
        }
    </div>
    </div>
  )
}
