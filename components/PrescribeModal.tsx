
import React, { useState, useCallback } from 'react';
import { getMedicationSuggestions } from '../services/geminiService';
import type { Medication } from '../types';

interface PrescribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMedication: (medication: Omit<Medication, 'id'>) => void;
}

const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.39-3.423 3.337c-.628.618-.278 1.71.597 1.831l4.753.39 1.83 4.401c.321.772 1.415.772 1.736 0l1.83-4.401 4.753-.39 3.423-3.337c.628-.618.278-1.71-.597-1.831l-4.753-.39L10.868 2.884Z" clipRule="evenodd" />
  </svg>
);

export const PrescribeModal: React.FC<PrescribeModalProps> = ({ isOpen, onClose, onAddMedication }) => {
  const [medName, setMedName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (medName && dosage && frequency) {
      onAddMedication({ name: medName, dosage, frequency });
      setMedName('');
      setDosage('');
      setFrequency('');
      onClose();
    }
  };

  const handleGetSuggestions = useCallback(async () => {
    setIsLoading(true);
    setSuggestions('');
    const result = await getMedicationSuggestions(symptoms);
    setSuggestions(result);
    setIsLoading(false);
  }, [symptoms]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all" onClick={e => e.stopPropagation()}>
        <div className="p-6 flex justify-between items-center border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">Prescribe New Medication</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AI Suggestions Section */}
          <div className="space-y-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="font-bold text-lg flex items-center text-slate-800">
                <SparklesIcon className="w-5 h-5 mr-2 text-brand-blue-500"/>
                AI Suggestion Helper
            </h3>
            <div>
              <label htmlFor="symptoms" className="block text-sm font-medium text-slate-700 mb-1">Patient Symptoms</label>
              <textarea
                id="symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows={3}
                placeholder="e.g., persistent dry cough, headache"
                className="w-full border-slate-300 rounded-md shadow-sm focus:ring-brand-blue-500 focus:border-brand-blue-500"
              />
            </div>
            <button
              onClick={handleGetSuggestions}
              disabled={isLoading || !symptoms}
              className="w-full bg-brand-blue-100 text-brand-blue-700 font-semibold py-2 px-4 rounded-lg hover:bg-brand-blue-200 disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
               {isLoading && <svg className="animate-spin h-5 w-5 text-brand-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
              <span>{isLoading ? 'Thinking...' : 'Get Suggestions'}</span>
            </button>
            {suggestions && (
              <div className="prose prose-sm max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: suggestions.replace(/\n/g, '<br />') }}></div>
            )}
          </div>

          {/* Prescription Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="medName" className="block text-sm font-medium text-slate-700">Medication Name</label>
              <input
                type="text"
                id="medName"
                value={medName}
                onChange={(e) => setMedName(e.target.value)}
                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:ring-brand-blue-500 focus:border-brand-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="dosage" className="block text-sm font-medium text-slate-700">Dosage</label>
              <input
                type="text"
                id="dosage"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                placeholder="e.g., 10mg, 500mcg"
                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:ring-brand-blue-500 focus:border-brand-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="frequency" className="block text-sm font-medium text-slate-700">Frequency</label>
              <input
                type="text"
                id="frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                placeholder="e.g., Once daily"
                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:ring-brand-blue-500 focus:border-brand-blue-500"
                required
              />
            </div>
             <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={onClose} className="bg-white py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500">
                    Cancel
                </button>
                <button type="submit" className="bg-brand-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500 transition-colors">
                    Add Medication
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
