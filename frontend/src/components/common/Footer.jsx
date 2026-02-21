import React from 'react'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/company-details', label: 'Job Posting' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact-us', label: 'Contact Us' },
  { href: '/legal-info', label: 'Legal' },
]

const Footer = () => (
  <div className="bg-white border-t-2 border-orange-500 py-6">
    <div className="max-w-7xl mx-auto px-8 flex flex-wrap justify-center items-center gap-6 text-sm">
      {NAV_LINKS.map(({ href, label }, i) => (
        <React.Fragment key={href}>
          <a href={href} className="text-gray-600 hover:text-orange-500 transition-colors">{label}</a>
          {i < NAV_LINKS.length - 1 && <span className="text-gray-300">|</span>}
        </React.Fragment>
      ))}
    </div>
    <p className="text-center mt-4 text-gray-600 text-xs">© 2025 Job Portal. All rights reserved.</p>
  </div>
)

export default Footer