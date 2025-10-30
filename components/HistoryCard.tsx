
import React from 'react';
import type { Visit } from '../types';

interface HistoryCardProps {
  history: Visit[];
}

export const HistoryCard: React.FC<HistoryCardProps> = ({ history }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
       <div className="flex items-center space-x-3 mb-4">
        <div className="bg-amber-100 p-2 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-amber-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-900">Patient History</h3>
      </div>
      <div className="space-y-4">
        {history.map(visit => (
          <div key={visit.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex justify-between items-center mb-1">
              <p className="font-bold text-slate-800">{visit.date}</p>
              <p className="text-sm text-slate-500 font-medium">with {visit.doctor}</p>
            </div>
            <p className="text-slate-600">{visit.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
