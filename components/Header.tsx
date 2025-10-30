
import React from 'react';

const StethoscopeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M11 2a1 1 0 0 1 1 1v2.93a12.012 12.012 0 0 1 7.234 4.336l1.248-1.031a1 1 0 1 1 1.342 1.614l-1.24 1.026A11.96 11.96 0 0 1 22 13a10 10 0 1 1-17.071-7.071A1 1 0 0 1 5 6a1 1 0 0 1 .929.629C6.425 8.165 7 9.88 7 12c0 2.21.895 4.21 2.343 5.657A8.001 8.001 0 0 0 13 4.062V3a1 1 0 0 1 1-1h-3zm2 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
  </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <StethoscopeIcon className="h-8 w-8 text-brand-blue-600" />
            <h1 className="text-2xl font-bold text-slate-800">
              Telehealth EHR
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-slate-500 hidden sm:block">
              Dr. Evelyn Reed
            </span>
            <img
              className="h-9 w-9 rounded-full object-cover"
              src="https://picsum.photos/id/1027/100/100"
              alt="Doctor profile"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
