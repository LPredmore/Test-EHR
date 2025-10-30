
import React from 'react';
import type { Appointment } from '../types';

interface AppointmentCardProps {
  appointment: Appointment | null;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  if (!appointment) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 text-center">
        <h3 className="text-xl font-bold text-slate-900 mb-2">No Upcoming Appointment</h3>
        <p className="text-slate-500">There are no appointments scheduled for this patient.</p>
      </div>
    );
  }

  const appointmentDate = new Date(appointment.dateTime);
  const formattedDate = appointmentDate.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = appointmentDate.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-green-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18M12 12.75h.008v.008H12v-.008Z" />
            </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-900">Upcoming Appointment</h3>
      </div>
      <div className="text-center bg-slate-50 rounded-lg p-4 mb-4">
        <p className="text-lg font-semibold text-slate-800">{formattedDate}</p>
        <p className="text-3xl font-bold text-brand-blue-600 my-1">{formattedTime}</p>
        <p className="text-sm font-medium text-slate-500 bg-brand-blue-100 text-brand-blue-700 rounded-full inline-block px-3 py-1">{appointment.type}</p>
      </div>
      <button className="w-full bg-brand-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500 transition-colors flex items-center justify-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="m12.75 4.75-1.5 1.5 2.5 2.5H8.25a.75.75 0 0 0 0 1.5h5.5l-2.5 2.5 1.5 1.5 4.5-4.5-4.5-4.5Z" />
            <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25h4.5a.75.75 0 0 1 0 1.5h-4.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h4.5a.75.75 0 0 1 0 1.5h-4.5C4.06 15.5 3.5 14.94 3.5 14.25v-8.5Z" />
        </svg>
        <span>Start Video Call</span>
      </button>
    </div>
  );
};
