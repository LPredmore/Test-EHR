
import React, { useState } from 'react';
import type { Medication } from '../types';
import { PrescribeModal } from './PrescribeModal';

interface MedicationsCardProps {
  medications: Medication[];
}

export const MedicationsCard: React.FC<MedicationsCardProps> = ({ medications: initialMeds }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [medications, setMedications] = useState<Medication[]>(initialMeds);

  const handleAddMedication = (newMed: Omit<Medication, 'id'>) => {
    setMedications(prevMeds => [...prevMeds, { ...newMed, id: `med-${Date.now()}` }]);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 flex justify-between items-center border-b border-slate-100">
            <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Current Medications</h3>
            </div>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-brand-blue-50 text-brand-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-brand-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500 transition-colors flex items-center space-x-2 text-sm"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" /></svg>
                <span>Prescribe New</span>
            </button>
        </div>
        <div className="p-2">
            <ul className="divide-y divide-slate-100">
            {medications.map(med => (
                <li key={med.id} className="p-4 flex justify-between items-start hover:bg-slate-50 rounded-lg">
                <div>
                    <p className="font-bold text-slate-800">{med.name}</p>
                    <p className="text-slate-500 text-sm">{med.dosage} &bull; {med.frequency}</p>
                </div>
                </li>
            ))}
            </ul>
        </div>
      </div>
      <PrescribeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddMedication={handleAddMedication}
      />
    </>
  );
};
