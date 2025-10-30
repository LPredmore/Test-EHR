
import React from 'react';
import type { Vitals, VitalMetric } from '../types';

interface VitalsCardProps {
  vitals: Vitals;
}

const TrendArrow: React.FC<{ trend: 'up' | 'down' | 'stable' }> = ({ trend }) => {
  if (trend === 'up') return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-red-500"><path fillRule="evenodd" d="M10 17a.75.75 0 0 1-.75-.75V5.612L6.22 8.64a.75.75 0 1 1-1.06-1.06l4.25-4.25a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10.75 5.612V16.25A.75.75 0 0 1 10 17Z" clipRule="evenodd" /></svg>;
  if (trend === 'down') return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-500"><path fillRule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.638l3.03-3.03a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 12.44a.75.75 0 1 1 1.06-1.06l3.03 3.03V3.75A.75.75 0 0 1 10 3Z" clipRule="evenodd" /></svg>;
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-400"><path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" /></svg>;
};

const VitalDisplay: React.FC<{ label: string; metric: VitalMetric | string; trend?: VitalMetric['trend'] }> = ({ label, metric, trend }) => {
  const value = typeof metric === 'string' ? metric : metric.value;
  const unit = typeof metric === 'string' ? '' : metric.unit;

  return (
    <div className="flex justify-between items-center py-3">
      <span className="text-slate-500 font-medium">{label}</span>
      <div className="flex items-center space-x-2">
        <span className="text-lg font-bold text-slate-800">{value}</span>
        <span className="text-sm text-slate-400">{unit}</span>
        {trend && <TrendArrow trend={trend} />}
      </div>
    </div>
  );
}

export const VitalsCard: React.FC<VitalsCardProps> = ({ vitals }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-brand-blue-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-brand-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-900">Vitals</h3>
      </div>
      <div className="space-y-1 divide-y divide-slate-100">
        <VitalDisplay label="Heart Rate" metric={vitals.heartRate} trend={vitals.heartRate.trend} />
        <VitalDisplay 
            label="Blood Pressure" 
            metric={`${vitals.bloodPressure.systolic.value}/${vitals.bloodPressure.diastolic.value}`} 
            trend={vitals.bloodPressure.systolic.trend}
        />
        <VitalDisplay label="Temperature" metric={vitals.temperature} trend={vitals.temperature.trend} />
        <VitalDisplay label="O₂ Saturation" metric={vitals.oxygenSaturation} trend={vitals.oxygenSaturation.trend} />
      </div>
    </div>
  );
};
