import ResourcesData from '../../data/resourceData/resourceData';
import packagesData from '../../data/resourceData/packagesData';

const getResourceById = (id) => ResourcesData.find((r) => r.id === id);

const CheckIcon = () => (
  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
)

function PackagesGrid() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <h4 className="text-2xl font-bold text-gray-800 mb-2">Bundle & Save Big!</h4>
        <p className="text-gray-600">Get multiple resources at a discounted price</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {packagesData.map((pkg) => {
          const includedResources = pkg.includedResourceIds.map(getResourceById).filter(Boolean)
          const discountPct = Math.round((pkg.savings / pkg.originalPrice) * 100)

          return (
            <div key={pkg.id} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 p-6 shadow-lg hover:shadow-xl transition-all">

              <div className="flex items-center justify-between mb-4">
                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">{discountPct}% OFF</span>
                <span className="text-red-600 font-semibold text-sm">Valid till {pkg.expDate}</span>
              </div>

              <h5 className="text-xl font-bold text-gray-800 mb-2">{pkg.title}</h5>
              <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>

              <div className="flex items-center gap-2 mb-4">
                {includedResources.slice(0, 3).map((resource, idx) => (
                  <img key={idx} src={resource.image} alt={resource.title} className="w-20 h-20 object-cover rounded-lg border-2 border-white shadow-md" />
                ))}
                <p className="text-xs text-gray-500 font-medium ml-2">Includes {includedResources.length} resources</p>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-gray-400 line-through">₹{pkg.originalPrice}</span>
                <span className="text-3xl font-bold text-green-600">₹{pkg.discountedPrice}</span>
              </div>

              <a
                href={pkg.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg"
              >
                Get Package Now
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-semibold text-gray-700 hover:text-green-600 transition-colors">
                  What's included?
                </summary>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  {includedResources.map((resource, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckIcon />
                      {resource.title}
                    </li>
                  ))}
                </ul>
              </details>

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PackagesGrid;