
import type { Patient } from './types';

export const mockPatient: Patient = {
  id: 'pat-001',
  name: 'Isabella Rossi',
  dateOfBirth: '1985-05-15',
  age: 39,
  gender: 'Female',
  profileImageUrl: 'https://picsum.photos/id/237/200/200',
  vitals: {
    heartRate: { value: 72, unit: 'bpm', trend: 'stable' },
    bloodPressure: {
      systolic: { value: 118, unit: 'mmHg', trend: 'stable' },
      diastolic: { value: 76, unit: 'mmHg', trend: 'stable' },
    },
    temperature: { value: 98.6, unit: '°F', trend: 'stable' },
    oxygenSaturation: { value: 98, unit: '%', trend: 'down' },
  },
  medications: [
    { id: 'med-1', name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
    { id: 'med-2', name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
    { id: 'med-3', name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily at bedtime' },
  ],
  history: [
    {
      id: 'vis-1',
      date: '2024-03-10',
      doctor: 'Dr. Evelyn Reed',
      notes: 'Routine check-up. Blood pressure well-controlled. Discussed diet and exercise.',
    },
    {
      id: 'vis-2',
      date: '2023-09-22',
      doctor: 'Dr. Evelyn Reed',
      notes: 'Patient presented with symptoms of a common cold. Advised rest and hydration.',
    },
     {
      id: 'vis-3',
      date: '2023-01-15',
      doctor: 'Dr. Ben Carter',
      notes: 'Initial consultation. Diagnosed with Type 2 Diabetes and Hypertension. Started on Metformin and Lisinopril.',
    },
  ],
  appointment: {
    id: 'appt-1',
    dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    type: 'Video Consultation',
  },
};
