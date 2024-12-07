import React, { useState } from 'react';
import { assets } from '../assets/assets';

const Login = () => {
    const [state, setState] = useState('Admin');

    return (
        <form className='min-h-screen flex items-center justify-center bg-gray-50'>
            <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
                <h2 className='text-2xl font-semibold text-center text-gray-700 mb-6'>
                    {state} Login
                </h2>

                <div className='space-y-4'>
                    <div>
                        <label htmlFor="email" className='block text-sm font-medium text-gray-600 mb-1'>
                            Email
                        </label>
                        <input 
                            id="email" 
                            type="email" 
                            required 
                            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className='block text-sm font-medium text-gray-600 mb-1'>
                            Password
                        </label>
                        <input 
                            id="password" 
                            type="password" 
                            required 
                            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <button 
                        type="submit" 
                        className='w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        Login
                    </button>
                </div>
            </div>
        </form>
    );
}

export default Login;
