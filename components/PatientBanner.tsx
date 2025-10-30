
import React from 'react';
import type { Patient } from '../types';

interface PatientBannerProps {
  patient: Patient;
}

export const PatientBanner: React.FC<PatientBannerProps> = ({ patient }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex items-center space-x-6">
      <img
        className="h-24 w-24 rounded-full object-cover border-4 border-brand-blue-100"
        src={patient.profileImageUrl}
        alt={`${patient.name}'s profile`}
      />
      <div>
        <h2 className="text-3xl font-bold text-slate-900">{patient.name}</h2>
        <p className="text-slate-500 font-medium mt-1">
          {patient.age} years old &bull; {patient.gender} &bull; DOB: {patient.dateOfBirth}
        </p>
      </div>
    </div>
  );
};
