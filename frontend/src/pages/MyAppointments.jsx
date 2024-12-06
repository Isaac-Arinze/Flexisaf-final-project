import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const MyAppointments = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="container mx-auto px-4 py-6">
      <p className="text-2xl font-bold text-gray-800 mb-4">My Appointments</p>
      <div className="grid gap-6">
        {doctors.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row gap-4 border border-gray-200"
          >
            <div className="flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-full border border-gray-300"
              />
            </div>
            <div className="flex-1">
              <p className="text-lg font-semibold text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-500 mb-2">{item.speciality}</p>
              <p className="text-sm text-gray-600 font-medium">Address</p>
              <p className="text-sm text-gray-500">{item.address.line1}</p>
              <p className="text-sm text-gray-500 mb-2">{item.address.line2}</p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Date & Time:</span> 10, December, 2024 | 12:20 PM
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:items-center">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-200">
                Pay Online
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition duration-200">
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
