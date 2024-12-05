import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const MyAppointments = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div>
      <p>My appointment</p>
      <div>
        {doctors.slice(0, 2).map((item, index) => (
          <div key={index}>
            <div>
              <img src={item.image} alt={item.name} />
            </div>
            <div>
              <p>{item.name}</p>
              <p>{item.speciality}</p>
              <p>Address</p>
              <p>{item.address.line1}</p>
              <p>{item.address.line2}</p>
              <p><span>Date & Time:</span> 10, December, 2024 | 12:20 PM</p>
            </div>
            <div></div>
            <div>
              <button>Pay Online</button>
              <button>Cancel Appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
