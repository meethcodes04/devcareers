import React from 'react'
import ApplySection from './ApplySection'
import CompanyDetailDownbar from './CompanyDetailDownbar'
import { Link } from 'react-router-dom'

const CompanyDetailMain = ({ selectedCompany }) => {
  return (
    <div className="flex-1 max-w-3xl bg-white rounded-lg shadow-md p-8">
      <Link
        to="/company-details"
        className="text-[#FA5500] hover:underline mb-4 inline-flex items-center"
      >
        ← Back to Home
      </Link>
      <h2 className="text-3xl font-bold text-gray-800">{selectedCompany.company}</h2>
      <h2 className="mt-2 text-2xl font-bold text-gray-800">
        Role: {selectedCompany.role}
      </h2>
      <p className="text-gray-600 mb-6">{selectedCompany.title}</p>

      <ApplySection selectedCompany={selectedCompany} />

      <div className="flex items-center gap-2 mt-4">
        <span
          style={{
            width: 0,
            height: 0,
            borderTop: '6px solid transparent',
            borderBottom: '6px solid transparent',
            borderLeft: '10px solid orange',
            display: 'inline-block',
            flexShrink: 0,
            marginLeft: 2,
          }}
        />
        <p className="text-gray-700">
          For more details, Visit Official Page by Clicking on career page link above
        </p>
      </div>

      <CompanyDetailDownbar />
    </div>
  )
}

export default CompanyDetailMain