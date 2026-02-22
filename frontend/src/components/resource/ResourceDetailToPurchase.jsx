import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ResourcesData from '../../data/resourceData/resourceData';
import PaymentButton from './PaymentButton';
import { notifyPurchase } from '../../services/notifyService';
import HelpCTA from '../common/HelpCTA'
import Faq from '../common/Faq'
import DriveLinkBanner from './DriveLinkBanner'
// ── Shared sub-components ─────────────────────────────────────────

const RazorpayBadge = () => (
  <a href="https://razorpay.com/" target="_blank" rel="noopener noreferrer"
    className="flex items-center gap-1 bg-green-50 text-green-700 text-xs font-semibold px-2 py-1 rounded-full border border-green-200 hover:bg-green-100 transition-colors"
  >
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
    Verified by Razorpay
  </a>
  
)

const LevelBadges = ({ resource }) => (
  <div className="flex flex-wrap gap-2">
    {resource.isPlacementFocused && (
      <span className="flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full border border-blue-200">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" /></svg>
        Placement Focused
      </span>
    )}
    {resource.isAdvancedLevel && (
      <span className="flex items-center gap-1 bg-red-50 text-red-700 text-xs font-semibold px-2 py-1 rounded-full border border-red-200">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
        Advanced Level
      </span>
    )}
  </div>
)

const WhatsIncluded = ({ resource }) => {
  const lines = (resource.longDescription ||
    `Complete ${resource.title} guide\n📚 Detailed explanations and examples\n💡 Interview questions and answers\n🎯 Best practices and tips\n✅ Ready to use templates\n📝 Printable PDF format`)
    .split('\n').filter(l => l.trim())

  return (
    <div>
      <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
        <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        What's Included
      </h2>
      <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 space-y-1.5">
        {lines.map((line, i) => (
          <div key={i} className="flex items-start gap-2 text-gray-700 text-sm leading-relaxed">
            <span className="text-amber-500 font-bold mt-0.5 flex-shrink-0">•</span>
            <span>{line.trim()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const PriceCard = ({ resource, numericPrice, onSuccess, onError }) => (
  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border-2 border-amber-300 shadow-md">
    <div className="flex items-center justify-between mb-4">
      <div>
        <p className="text-xs text-gray-500 mb-0.5">Price</p>
        <p className="text-4xl font-bold text-amber-600">{resource.price}</p>
      </div>
      <RazorpayBadge />
    </div>
    <PaymentButton
      amount={numericPrice}
      resourceTitle={resource.title}
      resourceId={resource.id}
      driveLink={resource.link}
      onSuccess={onSuccess}
      onError={onError}
    />
    <div className="mt-3 flex items-start gap-2 text-xs text-gray-500">
      <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
      </svg>
      Secure payment powered by Razorpay. Your payment information is encrypted and secure.
    </div>
  </div>
)

// ── Main Component ────────────────────────────────────────────────

function ResourceDetailToPurchase() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasedLink, setPurchasedLink] = useState(null);
  const [buyerName, setBuyerName] = useState('');

  useEffect(() => {
    const found = ResourcesData.find(r => r.id === parseInt(id));
    if (found) setResource(found);
    setLoading(false);
    window.scrollTo(0, 0);
  }, [id]);

  const handlePaymentSuccess = (result) => {
    const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
    purchases.push({
      resourceId: resource.id,
      resourceTitle: resource.title,
      amount: parseFloat(resource.price.replace(/[^0-9.]/g, '')),
      purchaseDate: new Date().toISOString(),
      paymentId: result.paymentId,
      orderId: result.orderId,
    });
    localStorage.setItem('purchases', JSON.stringify(purchases));

    notifyPurchase({
      resourceId: resource.id,
      resourceTitle: resource.title,
      buyerName: result.userName || '',
      buyerEmail: result.userEmail || '',
      amount: parseFloat(resource.price.replace(/[^0-9.]/g, '')),
    }).catch(err => console.error('EmailJS notify failed:', err));

    setBuyerName(result.userName || '');
    setPurchasedLink(result.driveLink || resource.link);
    setTimeout(() => {
      document.getElementById('drive-link-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  };

  const handlePaymentError = (error) => {
    console.error('Payment failed:', error);
    alert(`Payment failed: ${error}. Please try again.`);
  };

  // const handleCopy = () => {
  //   navigator.clipboard.writeText(purchasedLink);
  //   setCopied(true);
  //   setTimeout(() => setCopied(false), 3000);
  // };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600" />
    </div>
  );

  if (!resource) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Resource Not Found</h2>
        <p className="text-gray-600 mb-6">The resource you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/resources')} className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
          Back to Resources
        </button>
      </div>
    </div>
  );

  const numericPrice = parseFloat(resource.price.replace(/[^0-9.]/g, ''));
  const buyReasons = Array.isArray(resource.shouldYouBuyFor)
    ? resource.shouldYouBuyFor
    : (resource.shouldYouBuyFor || '').split('\n').map(l => l.trim()).filter(Boolean);

  const paymentProps = { resource, numericPrice, onSuccess: handlePaymentSuccess, onError: handlePaymentError };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        <button onClick={() => navigate('/resources')} className="flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-6 font-medium transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Resources
        </button>

        {/* Drive Link Banner */}
        {/* {purchasedLink && ( <div id="drive-link-section"> ... </div> )} block with: */}
        {purchasedLink && <DriveLinkBanner purchasedLink={purchasedLink} buyerName={buyerName} />}

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">

            {/* LEFT COLUMN */}
            <div className="p-8 space-y-5 border-r border-gray-100">

              {/* Mobile: Title + badges */}
              <div className="md:hidden">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{resource.title}</h1>
                <LevelBadges resource={resource} />
              </div>

              {/* Image */}
              <div className={`relative bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center h-[320px] ${(!resource.copiesSold || resource.copiesSold === '' || resource.copiesSold === 0) ? 'md:h-[440px]' : 'md:h-[340px]'}`}>
                <img src={resource.image} alt={resource.title} className="w-full h-full object-contain p-2" />
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  {resource.isPopular && (
                    <span className="flex items-center gap-1 bg-purple-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      Popular
                    </span>
                  )}
                  {resource.isBestSeller && (
                    <span className="flex items-center gap-1 bg-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" /></svg>
                      Best Seller
                    </span>
                  )}
                </div>
              </div>

              {/* Copies Sold */}
              {resource.copiesSold && resource.copiesSold !== '' && resource.copiesSold !== 0 && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Copies Sold</p>
                        <p className="text-2xl font-bold text-green-700">{resource.copiesSold || '500+'}+</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Trusted by</p>
                      <p className="text-sm font-semibold text-gray-700">Students & Professionals</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile: What's Included */}
              <div className="md:hidden"><WhatsIncluded resource={resource} /></div>

              {/* Why Buy (always visible) */}
              {buyReasons.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                  <h3 className="text-sm font-bold text-blue-800 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Why Should You Buy This?
                  </h3>
                  <div className="space-y-2">
                    {buyReasons.map((reason, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-sm text-blue-900 leading-relaxed">{reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mobile: Price */}
              <div className="md:hidden"><PriceCard {...paymentProps} /></div>
            </div>

            {/* RIGHT COLUMN — desktop only */}
            <div className="hidden md:block p-8 space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{resource.title}</h1>
                <LevelBadges resource={resource} />
              </div>
              <WhatsIncluded resource={resource} />
              <PriceCard {...paymentProps} />
            </div>
          </div>
        </div>

        <Faq />
        <HelpCTA />
      </div>
    </div>
  );
}

export default ResourceDetailToPurchase;