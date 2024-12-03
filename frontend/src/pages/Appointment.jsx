import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

export const Appointment = () => {
  const { docId } = useParams(); // Correctly destructure docId
  const { doctors, currencySymbol } = useContext(AppContext); // Ensure no duplicate declaration
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT']; // Add 'SAT' for Saturday
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  // Fetch doctor information based on docId
  const fetchDocInfo = async () => {
    const foundDoc = doctors.find(doc => doc._id === docId);
    setDocInfo(foundDoc);
  };

  // Get available slots for the doctor
  const getAvailableSlots = async () => {
    setDocSlots([]); // Clear previous slots

    let today = new Date();
    let timeSlots = [];

    // Loop through the next 7 days
    for (let i = 0; i < 7; i++) {
      // Getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Set the start time to 10:00 AM
      let startTime = new Date(currentDate.setHours(10, 0, 0, 0));
      
      // Set the end time to 9:00 PM
      let endTime = new Date(currentDate.setHours(21, 0, 0, 0));

      // If today, adjust the start time to be after the current time (but no earlier than 10 AM)
      if (i === 0) {
        if (today.getHours() >= 10) {
          // If it's past 10 AM, start from the next available slot
          startTime.setHours(today.getHours(), Math.ceil(today.getMinutes() / 30) * 30, 0, 0);
        }
      }

      // Generate time slots for the day (from 10 AM to 9 PM)
      let currentSlot = new Date(startTime);
      while (currentSlot < endTime) {
        let formattedTime = currentSlot.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        timeSlots.push({
          datetime: new Date(currentSlot),
          time: formattedTime,
        });

        // Increment by 30 minutes
        currentSlot.setMinutes(currentSlot.getMinutes() + 30);
      }
    }

    // After generating all slots, set the slots state
    setDocSlots(timeSlots);
  };

  useEffect(() => {
    if (docId) {
      fetchDocInfo(); // Fetch doctor info when the component mounts or when docId changes
    }
  }, [docId, doctors]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots(); // Fetch available slots when docInfo is set
    }
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots); // Log available slots when docSlots change
  }, [docSlots]);

  return docInfo ? (
    <div className="p-5 max-w-4xl mx-auto"> {/* Center content and limit max width */}
      <div className="flex flex-col md:flex-row gap-6 items-stretch"> {/* Flex container aligned vertically */}
        {/* Doctor's Image Section with Circular Shape */}
        <div className="flex-shrink-0 w-48 h-48 bg-blue-600 rounded-full overflow-hidden shadow-lg flex justify-center items-center">
          <img src={docInfo.image} alt={docInfo.name} className="w-full h-full object-cover rounded-full" />
        </div>

        {/* Doctor's Info Section with increased border width and alignment */}
        <div className="flex flex-col items-start space-y-4 flex-1 rounded-xl border border-blue-600 p-6 shadow-lg bg-blue-50 justify-center md:w-[calc(100%-8rem)]">
          <h2 className="text-2xl font-semibold flex items-center space-x-2">
            <span>{docInfo.name}</span>
            <img src={assets.verified_icon} alt="Verified Icon" className="w-5 h-5" />
          </h2>
          <p className="text-sm text-gray-600">{docInfo.speciality}</p>
          <p className="font-semibold">{docInfo.degree} - {docInfo.experience} years of experience</p>

          {/* About Section */}
          <div>
            <p className="text-gray-600">{docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
            Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
          </p>

          {/* -----Booking slots ----- */}
          <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
            <p>Booking slots</p>
            <div className='flex gap-3 items-center flex-wrap w-full mt-4'>
              {docSlots.length > 0 && docSlots.map((item, index) => {
                const dayOfWeek = daysOfWeek[item.datetime.getDay()]; // Get day of the week
                const dayOfMonth = item.datetime.getDate(); // Get the day of the month
                const time = item.time; // Get the time
                return (
                  <div key={index} className="flex justify-between items-center py-2 px-3 rounded-lg border border-gray-300">
                    <p>{dayOfWeek} {dayOfMonth}</p>
                    <p>{time}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Button Section */}
          <div className="mt-5 flex justify-center w-full">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="p-5 max-w-4xl mx-auto"> {/* Centered loading message */}
      <p classNames="text-center">Loading doctor details...</p>
    </div>
  );    
};
