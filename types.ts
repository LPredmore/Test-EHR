
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  profileImageUrl: string;
  vitals: Vitals;
  medications: Medication[];
  history: Visit[];
  appointment: Appointment | null;
}

export interface Vitals {
  heartRate: VitalMetric;
  bloodPressure: {
    systolic: VitalMetric;
    diastolic: VitalMetric;
  };
  temperature: VitalMetric;
  oxygenSaturation: VitalMetric;
}

export interface VitalMetric {
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
}

export interface Visit {
  id: string;
  date: string;
  doctor: string;
  notes: string;
}

export interface Appointment {
  id: string;
  dateTime: string;
  type: 'Video Consultation' | 'In-Person';
}
