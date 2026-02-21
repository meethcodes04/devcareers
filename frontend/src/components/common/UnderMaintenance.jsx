import React from 'react';
import { Wrench, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UnderMaintenance = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white flex items-center justify-center p-4 mt-20">
      <div className="max-w-md w-full">

        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium text-sm mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
            <Wrench className="w-8 h-8 text-amber-600" />
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-3">Under Maintenance</h1>

          <p className="text-slate-600 text-lg mb-6 leading-relaxed">
            We're currently updating our job opportunities page. Check back soon for exciting new positions!
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <Bell className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-900 text-left">
              New job postings will be available here shortly. We appreciate your patience!
            </p>
          </div>

          <p className="text-sm text-slate-500 mt-6">Expected completion: Within 7-10 hours</p>
        </div>

      </div>
    </div>
  );
};

export default UnderMaintenance;