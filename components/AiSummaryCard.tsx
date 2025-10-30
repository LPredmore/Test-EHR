
import React, { useState, useCallback } from 'react';
import type { Patient } from '../types';
import { generateClinicalSummary } from '../services/geminiService';

interface AiSummaryCardProps {
  patient: Patient;
}

const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.39-3.423 3.337c-.628.618-.278 1.71.597 1.831l4.753.39 1.83 4.401c.321.772 1.415.772 1.736 0l1.83-4.401 4.753-.39 3.423-3.337c.628-.618.278-1.71-.597-1.831l-4.753-.39L10.868 2.884Z" clipRule="evenodd" />
    </svg>
);


export const AiSummaryCard: React.FC<AiSummaryCardProps> = ({ patient }) => {
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSummary = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setSummary('');
    try {
      const result = await generateClinicalSummary(patient);
      setSummary(result);
    } catch (err) {
      setError('Failed to generate summary.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patient]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
                <div className="bg-brand-blue-100 p-2 rounded-full">
                    <SparklesIcon className="w-6 h-6 text-brand-blue-600"/>
                </div>
                <h3 className="text-xl font-bold text-slate-900">AI Clinical Summary</h3>
            </div>
            <button
                onClick={handleGenerateSummary}
                disabled={isLoading}
                className="bg-brand-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center space-x-2 text-sm"
            >
                {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    <SparklesIcon className="w-5 h-5"/>
                )}
                <span>{isLoading ? 'Generating...' : 'Generate Summary'}</span>
            </button>
        </div>
      
      {error && <p className="text-red-500">{error}</p>}
      
      {summary ? (
        <div className="prose prose-slate max-w-none prose-sm p-4 bg-slate-50 rounded-lg border border-slate-200" dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, '<br />') }} />
      ) : !isLoading && (
        <div className="text-center py-8 px-4 bg-slate-50 rounded-lg">
            <SparklesIcon className="w-12 h-12 text-slate-300 mx-auto"/>
            <p className="mt-2 text-slate-500 font-medium">Click "Generate Summary" to get an AI-powered overview of this patient's record.</p>
        </div>
      )}

      {isLoading && (
         <div className="text-center py-8 px-4 bg-slate-50 rounded-lg">
            <div className="animate-pulse flex flex-col items-center space-y-4">
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
            </div>
         </div>
      )}
    </div>
  );
};
