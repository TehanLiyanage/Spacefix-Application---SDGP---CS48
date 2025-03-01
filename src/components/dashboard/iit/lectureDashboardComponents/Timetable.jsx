import React from 'react';

const Timetable = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => setCurrentPage('dashboard')}
          className="mb-6 text-gray-600 hover:text-gray-900"
        >
          Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Timetable</h1>
      </div>
    </div>
  );
};

export default Timetable;