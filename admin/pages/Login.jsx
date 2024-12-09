import React, { useState } from 'react';

const Login = () => {
  const [state, setState] = useState('Admin');

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 py-20'>
      <form className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
        <h2 className='text-2xl font-semibold text-center text-green-400 mb-6'>
          {state} Login
        </h2>

        <div className='space-y-6'>
          <div>
            <label htmlFor="email" className='block text-sm font-medium text-gray-600 mb-1'>
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
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
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <button
            type="submit"
            className='w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            Login
          </button>
          {state === 'Admin'
            ? <p>Doctor Login? <span onClick={() => setState('Doctor')} className='text-blue-500 cursor-pointer'>Click here</span></p>
            : <p>Admin Login? <span onClick={() => setState('Admin')} className='text-blue-500 cursor-pointer'>Click here</span></p>
          }
        </div>
      </form>
    </div>
  );
};

export default Login;
