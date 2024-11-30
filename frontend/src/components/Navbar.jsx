import React, { useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
 export const Navbar = () => {

    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);
    const [token, setToken] = useState(true)

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
        <img onClick={()=> navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="" />
        <ul className='hidden md:flex items-start gap-5 font-medium'>
            <NavLink to='/'>
                <li className='py-1'>HOME</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto' />
            </NavLink>
        </ul>
        <ul>
            <NavLink to='/doctor'>
                <li className='py-1'>ALL DOCTORS</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto' />
            </NavLink>
        </ul>
        <ul>
            <NavLink to='/about'>
                <li className='py-1'>ABOUT</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto' />
            </NavLink>
        </ul>
        <ul>
            <NavLink to='/contact'>
                <li className='py-1'>CONTACT </li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto' />
            </NavLink>
        </ul>

        <div className='flex items-center gap-4'> 
            {
                token
                ? <div className='flex items-center gap-2 cursor-pointer group relative   '>
                    <img className='w-8 rounded-full' src={assets.profile_pic} alt=''/>
                    <img className='w-2.5' src={assets.dropdown_icon} alt=''/>
                    <div className='absolute top-0 right-0 pt-14 text-basefont-medium text-grey-600 z-20 hidden group-hover:block'>
                        <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                            <p onClick={()=>navigate('my-profile')} className='hover:text-black cursor-pointer'>My Pofile</p>
                            <p onClick={()=>navigate('my-appointments')}className='hover:text-black cursor-pointer'>My Appointements</p>
                            <p onClick={()=>setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
                        </div>
                    </div>
                </div>
                : <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>
            }
            
             </div>
    </div>
  );
}
