import booksIcon from "../../assets/svg/books.svg";

function ResourcesHeader() {
  return (
    <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
      <h3 className="text-3xl font-semibold text-amber-600 flex items-center gap-2">
        <img src={booksIcon} className="inline w-7 h-7" alt="Books" />
        Resources (Interview Tips and Complete Guide)
      </h3>
      <a
        href="https://razorpay.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 bg-green-50 text-green-700 text-sm font-semibold px-3 py-1.5 rounded-full border border-green-200 hover:bg-green-100 hover:border-green-300 transition-colors cursor-pointer shadow-sm"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        Verified by Razorpay
      </a>
    </div>
  );
}

export default ResourcesHeader;
