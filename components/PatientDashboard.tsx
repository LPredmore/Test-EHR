
import React from 'react';
import type { Patient } from '../types';
import { PatientBanner } from './PatientBanner';
import { VitalsCard } from './VitalsCard';
import { AppointmentCard } from './AppointmentCard';
import { MedicationsCard } from './MedicationsCard';
import { HistoryCard } from './HistoryCard';
import { AiSummaryCard } from './AiSummaryCard';

interface PatientDashboardProps {
  patient: Patient;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({ patient }) => {
  return (
    <div className="space-y-6">
      <PatientBanner patient={patient} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
           <AiSummaryCard patient={patient} />
           <MedicationsCard medications={patient.medications} />
           <HistoryCard history={patient.history} />
        </div>
        <div className="space-y-6">
           <AppointmentCard appointment={patient.appointment} />
           <VitalsCard vitals={patient.vitals} />
        </div>
      </div>
    </div>
  );
};
