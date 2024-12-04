import React, { useState } from 'react';
import { assets } from '../assets/assets';

export const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Edward Vincent",
    image: assets.profile_pic,
    email: 'skytecomputer@gmail.com',
    phone: "+2348187422213",
    address: {
      line1: "Baale street",
      line2: "Church road GRA",
    },
    gender: "Male",
    dob: "2004-03-02",
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        <img src={userData.image} alt="Profile" className="w-24 h-24 rounded-full object-cover mb-4" />
        {
          isEdit ? (
            <input
              type="text"
              value={userData.name}
              onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 border rounded mb-4"
            />
          ) : (
            <p className="text-lg font-semibold">{userData.name}</p>
          )
        }
      </div>
      <hr className="my-4" />
      <div className="mb-4">
        <p className="text-xl font-semibold mb-2">CONTACT INFORMATION</p>
        <div className="mb-2">
          <p className="font-semibold">Email</p>
          <p>{userData.email}</p>
        </div>
        <div className="mb-2">
          <p className="font-semibold">Phone</p>
          {
            isEdit ? (
              <input
                type="text"
                value={userData.phone}
                onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full p-2 border rounded mb-2"
              />
            ) : (
              <p>{userData.phone}</p>
            )
          }
        </div>
        <div>
          <p className="font-semibold">Address</p>
          {
            isEdit ? (
              <div>
                <input
                  onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                  value={userData.address.line1}
                  type="text"
                  className="w-full p-2 border rounded mb-2"
                />
                <input
                  onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                  value={userData.address.line2}
                  type="text"
                  className="w-full p-2 border rounded"
                />
              </div>
            ) : ( 
              <p>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )
          }
        </div>
      </div>
      <div className="mb-4">
        <p className="text-xl font-semibold mb-2">BASIC INFORMATION</p>
        <div className="mb-2">
          <p className="font-semibold">Gender</p>
          {
            isEdit ? (
              <select
                onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                value={userData.gender}
                className="w-full p-2 border rounded mb-2"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p>{userData.gender}</p>
            )
          }
        </div>
        <div>
          <p className="font-semibold">Birthday</p>
          {
            isEdit ? (
              <input
                type="date"
                onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                value={userData.dob}
                className="w-full p-2 border rounded"
              />
            ) : (
              <p>{userData.dob}</p>
            )
          }
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {
          isEdit ? (
            <button
              onClick={() => setIsEdit(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
            >Save Information</button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
            >Edit</button>
          )
        }
      </div>
    </div>
  );
}
