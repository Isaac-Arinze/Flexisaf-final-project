import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

export const MyAppointments = () => {
  const { loadUserAppointments, doctors } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const userAppointments = await loadUserAppointments();
        setAppointments(userAppointments);
      } catch {
        toast.error('Failed to load appointments.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [loadUserAppointments]);

  const getDoctorDetails = (doctorId) => {
    return doctors.find(doc => doc._id === doctorId);
  };

  if (loading) {
    return <p className="text-center py-6">Loading appointments...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <p className="text-2xl font-bold text-gray-800 mb-4">My Appointments</p>
      {appointments.length === 0 ? (
        <p className="text-center text-gray-500">You have no appointments.</p>
      ) : (
        <div className="grid gap-6">
          {appointments.map((appointment) => {
            const doctor = getDoctorDetails(appointment.doctorId);
            if (!doctor) return null;

            return (
              <div
                key={appointment._id}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row gap-4 border border-gray-200"
              >
                <div className="flex-shrink-0">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-24 h-24 object-cover rounded-full border border-gray-300"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-900">{doctor.name}</p>
                  <p className="text-sm text-gray-500 mb-2">{doctor.speciality}</p>
                  <p className="text-sm text-gray-600 font-medium">Address</p>
                  <p className="text-sm text-gray-500">{doctor.address.line1}</p>
                  <p className="text-sm text-gray-500 mb-2">{doctor.address.line2}</p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Date & Time:</span> 
                    {new Date(appointment.date).toLocaleDateString()} | {appointment.time}
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
            );
          })}
        </div>
      )}
    </div>
  );
};
