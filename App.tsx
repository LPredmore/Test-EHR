
import React, { useState } from 'react';
import { PatientDashboard } from './components/PatientDashboard';
import { Header } from './components/Header';
import { mockPatient } from './constants';
import type { Patient } from './types';


const App: React.FC = () => {
  const [patient] = useState<Patient>(mockPatient);

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">
        <PatientDashboard patient={patient} />
      </main>
    </div>
  );
};

export default App;
