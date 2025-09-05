import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  // Filter doctors based on speciality
  useEffect(() => {
    const filteredDoctors = speciality && speciality !== 'general-physician'
      ? doctors.filter((doc) => doc.speciality.toLowerCase() === speciality.toLowerCase())
      : doctors;

    setFilterDoc(filteredDoctors);
  }, [doctors, speciality]);

  // Render speciality filter button
  const renderSpecialityButton = (label, value) => (
    <p
      onClick={() => navigate(`/doctors/${value === speciality ? '' : value}`)}
      className={`w-[94vw] sm:w-auto px-3 py-1.5 border rounded transition-all cursor-pointer ${
        speciality === value ? 'bg-blue-100 text-blue-800' : 'text-gray-600'
      }`}
    >
      {label}
    </p>
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <p className="text-lg text-gray-600">Browse through the doctors' specialties.</p>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* Filter Sidebar */}
        <div className="flex-col gap-4 text-sm text-gray-600">
          <button
            className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
              showFilter ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setShowFilter((prev) => !prev)}
          >
            Filters
          </button>
          {showFilter || (
            <div className={`flex flex-col gap-3 ${showFilter ? 'block' : 'hidden sm:block'}`}>
              {renderSpecialityButton('General Physician', 'general-physician')}
              {renderSpecialityButton('Gynecologist', 'gynecologist')}
              {renderSpecialityButton('Dermatologist', 'dermatologist')}
              {renderSpecialityButton('Pediatricians', 'pediatricians')}
              {renderSpecialityButton('Gastroenterologist', 'gastroenterologist')}
              {renderSpecialityButton('Neurologist', 'neurologist')}
            </div>
          )}
        </div>

        {/* Doctors List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-1">
          {filterDoc.length > 0 ? (
            filterDoc.map((doctor) => (
              <div
                key={doctor._id}
                onClick={() => navigate(`/appointment/${doctor._id}`)}
                className="p-4 border rounded-xl cursor-pointer shadow-sm hover:shadow-lg hover:scale-105 transition-all flex flex-col"
              >
                <div className="w-full aspect-[4/3] flex items-center justify-center bg-blue-50 rounded-t-lg overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-2 text-sm text-green-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p>Available</p>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">{doctor.name}</p>
                  <p className="text-sm text-gray-600">{doctor.speciality}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">No doctors found.</p>
          )}
        </div>
      </div>
    </div>
  );
};
