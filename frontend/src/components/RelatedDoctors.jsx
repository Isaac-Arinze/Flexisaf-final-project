// src/pages/RelatedDoctors.jsx
import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDocs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('speciality:', speciality);
    console.log('docId:', docId);
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
      setRelDocs(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Related doctors</h1>

      <p className='sm:w-1/3 text-center text-sm'>
        Simply browse through our extensive list of trusted doctors
      </p>

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {relDoc.slice(0, 5).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              window.scrollTo(0, 0);
            }}
            className='p-4 border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
          >
            <img src={item.image} alt={item.name} className='bg-blue-50 w-full h-auto rounded' />
            <div>
              <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                <p>Available</p>
              </div>
              <p className='font-semibold'>{item.name}</p>
              <p className='text-sm text-gray-600'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

RelatedDoctors.propTypes = {
  speciality: PropTypes.string.isRequired,
  docId: PropTypes.string.isRequired,
};
