import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

export const Appointment = () => {
  const { docId } = useParams();  // Correctly destructure docId from URL params
  const { doctors } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);

  // Fetch doctor information based on docId
  const fetchDocInfo = async () => {
    const foundDoc = doctors.find(doc => doc._id === docId);
    setDocInfo(foundDoc);
    console.log(foundDoc); // Logging the fetched doctor info
  };

  useEffect(() => {
    if (docId) {
      fetchDocInfo();  // Fetch doctor info when the component mounts or when docId changes
    }
  }, [docId, doctors]);  // Corrected the dependencies array to avoid unnecessary re-renders

  return docInfo ? (
    <div className="p-5 max-w-4xl mx-auto"> {/* Center content and limit max width */}
      <div className="flex flex-col md:flex-row gap-6 items-start">

        {/* Doctor's Image Section with Background */}
        <div className="flex-shrink-0 w-48 h-48 bg-blue-600 rounded-lg overflow-hidden shadow-lg flex justify-center items-center">
          <img src={docInfo.image} alt={docInfo.name} className="w-full h-full object-cover" />
        </div>

        {/* Doctor's Info Section */}
        <div className="flex flex-col items-start space-y-4 flex-1">
          <h2 className="text-3xl font-bold flex items-center space-x-2">
            <span>{docInfo.name}</span>
            <img src={assets.verified_icon} alt="Verified Icon" className="w-5 h-5" />
          </h2>
          
          <p className="text-sm text-gray-600">{docInfo.speciality}</p>

          <div className="flex items-center space-x-4">
            <p className="font-semibold">{docInfo.degree} ~ {docInfo.speciality}</p>
            <p>{docInfo.experience} years of experience</p>
          </div>

          <div className="mt-4 text-lg">
            <p className="font-semibold">About</p>
            <p>{docInfo.about}</p>
          </div>

          <div className="mt-4">
            <p>{docInfo.description || "No description available."}</p>
          </div>

          {/* Button Section */}
          <div className="mt-5 flex justify-end">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
              Book Appointment
            </button>
          </div>
        </div>

      </div>
    </div>
  ) : (
    <div className="p-5 max-w-4xl mx-auto"> {/* Centered loading message */}
      <p className="text-center">Loading doctor details...</p>
    </div>
  );
};
