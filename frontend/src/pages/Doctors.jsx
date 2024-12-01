import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export const Doctors = () => {
  const { speciality } = useParams();  // Get speciality from URL params
  const [filterDoc, setFilterDoc] = useState([]);  // Filtered doctor list
  const { doctors } = useContext(AppContext);  // Get doctors data from AppContext
  const navigate = useNavigate();  // Hook for navigation

  useEffect(() => {
    // If no speciality is selected, show all doctors
    if (!speciality || speciality === 'general-physician') {
      setFilterDoc(doctors);  // Display all doctors when no speciality is provided
    } else {
      // Filter the doctors based on the selected speciality
      setFilterDoc(doctors.filter(doc => doc.speciality.toLowerCase() === speciality.toLowerCase()));
    }
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors' specialties.</p>
      
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <div className="flex-col gap-4 text-sm text-gray-600">
          {/* Navigation with dynamic classes */}
          <p
            onClick={() => navigate(speciality === 'general-physician' ? '/doctors' : '/doctors/general-physician')}
            className={`w-[94vw] sm:w-auto p-1.5 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'general-physician' ? 'bg-blue-100' : ''}`}
          >
            General Physician
          </p>

          <p
            onClick={() => navigate(speciality === 'gynecologist' ? '/doctors' : '/doctors/gynecologist')}
            className={`w-[94vw] sm:w-auto p-1.5 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'gynecologist' ? 'bg-blue-100' : ''}`}
          >
            Gynecologist
          </p>

          <p
            onClick={() => navigate(speciality === 'dermatologist' ? '/doctors' : '/doctors/dermatologist')}
            className={`w-[94vw] sm:w-auto p-1.5 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'dermatologist' ? 'bg-blue-100' : ''}`}
          >
            Dermatologist
          </p>

          <p
            onClick={() => navigate(speciality === 'pediatricians' ? '/doctors' : '/doctors/pediatricians')}
            className={`w-[94vw] sm:w-auto p-1.5 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'pediatricians' ? 'bg-blue-100' : ''}`}
          >
            Pediatricians
          </p>

          <p
            onClick={() => navigate(speciality === 'gastroenterologist' ? '/doctors' : '/doctors/gastroenterologist')}
            className={`w-[94vw] sm:w-auto p-1.5 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'gastroenterologist' ? 'bg-blue-100' : ''}`}
          >
            Gastroenterologist
          </p>

          <p
            onClick={() => navigate(speciality === 'neurologist' ? '/doctors' : '/doctors/neurologist')}
            className={`w-[94vw] sm:w-auto p-1.5 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'neurologist' ? 'bg-blue-100' : ''}`}
          >
            Neurologist
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {filterDoc.length > 0 ? (
            filterDoc.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="p-4 border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="bg-blue-50 w-full h-auto rounded"
                />
                <div>
                  <div className="flex items-center gap-2 text-sm text-center text-green-500">
                    <p className="w-2 h-2 bg-green-500 rounded-full"></p><p>Available</p>
                  </div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.speciality}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No doctors found.</p>
          )}
        </div>
      </div>
    </div>
  );
};
