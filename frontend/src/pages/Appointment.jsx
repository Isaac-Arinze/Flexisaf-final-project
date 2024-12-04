import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { RelatedDoctors } from '../components/RelatedDoctors'; // Ensure this path is correct

const doctorAvailability = {
  SUN: [],
  MON: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'],
  TUE: ['10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM'],
  WED: ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'],
  THUR: ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM'],
  FRI: ['08:00 AM', '09:00 AM', '10:00 AM', '02:00 PM', '03:00 PM'],
  SAT: []
};

export const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);

  // Fetch doctor information based on docId
  const fetchDocInfo = async () => {
    const foundDoc = doctors.find(doc => doc._id === docId);
    setDocInfo(foundDoc);
  };

  // Generate available time slots for the selected day
  const generateTimeSlots = (date) => {
    const day = moment(date).format('ddd').toUpperCase();
    const slots = doctorAvailability[day] || [];
    setTimeSlots(slots);
  };

  useEffect(() => {
    if (docId) {
      fetchDocInfo(); // Fetch doctor info when the component mounts or when docId changes
    }
  }, [docId, doctors]);

  useEffect(() => {
    generateTimeSlots(selectedDate); // Generate time slots for the selected date
  }, [selectedDate]);

  useEffect(() => {
    console.log('docId:', docId);
    console.log('docInfo:', docInfo);
  }, [docId, docInfo]);

  return docInfo ? (
    <>
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

            {/* -----Date and Time Picker ----- */}
            <div className='mt-4 font-medium text-gray-700'>
              <p>Select Date and Time</p>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="MMMM d, yyyy"
                className="mt-2 p-2 border border-gray-300 rounded"
              />
              <div className='mt-4 flex flex-wrap gap-3'>
                {timeSlots.length > 0 ? timeSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTime(slot)}
                    className={`py-2 px-3 rounded-lg border ${
                      selectedTime === slot ? 'bg-blue-600 text-white' : 'border-gray-300'
                    }`}
                  >
                    {slot}
                  </button>
                )) : <p>No available slots for this day.</p>}
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

      {/* Listing related doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </>
  ) : (
    <div className="p-5 max-w-4xl mx-auto"> {/* Centered loading message */}
      <p className="text-center">Loading doctor details...</p>
      </div>
  )}