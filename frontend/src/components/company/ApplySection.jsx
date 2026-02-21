import React, { useState } from 'react'

const ApplySection = ({ selectedCompany }) => {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    if (!selectedCompany.email) return
    navigator.clipboard.writeText(selectedCompany.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 300)
  }

  return (
    <div className="border-t pb-8 border-b">
      <div className="pt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3 ml-1">Apply Now</h3>

        {selectedCompany.email && (
          <div className="mt-4 inline-flex items-center gap-2 bg-gray-50 p-3 rounded-lg max-w-fit">
            <span className={`text-sm font-medium transition-colors duration-300 ${copied ? 'text-orange-500' : 'text-gray-700'}`}>
              HR Email:
            </span>
            <span className="text-sm text-gray-600">{selectedCompany.email}</span>
            <button onClick={copyEmail} className="p-1.5 hover:bg-gray-200 rounded transition-colors" title="Copy email">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-colors duration-300 ${copied ? 'text-orange-500' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        )}

        {selectedCompany.hiringLink && (
          <a
            href={selectedCompany.hiringLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors mt-4"
          >
            Visit Career Page →
          </a>
        )}
      </div>
    </div>
  )
}

export default ApplySection