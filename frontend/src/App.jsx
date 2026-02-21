import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
const ResourceDetailToPurchase = lazy(() => import('./components/resource/ResourceDetailToPurchase'))
const Companies_details = lazy(() => import('./pages/Companies_details'))

// import Companies_details from './pages/Companies_details'
// import ResourceDetailToPurchase from './components/resource/ResourceDetailToPurchase'

import Home from './pages/Home'
import Contact_us from './pages/Contact_us'
import Legal_info from './pages/Legal_info'
import SubscribeUs from './pages/Subscribe_us'
import Resources from './pages/Resources'
import PurchaseQueryPage from './pages/Purchase_query'
import Header from './components/common/Header'
import Header1 from './components/common/Header1'
import ScrollToTop from './components/common/ScrollToTop';
import UnderMaintenance from './components/common/UnderMaintenance'
import { Analytics } from "@vercel/analytics/react"


const App = () => {
  return (

    <div>
      <Header1 />
      <Header />
      <ScrollToTop/>
      <Suspense  fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/company-details" element={<Companies_details />} />
        <Route
          path="/company-details/:companyName/:role"
          element={<Companies_details />}
        />

        {/* <Route path="/company-details" element={<UnderMaintenance />} /> */}
        <Route path="/resource/:id" element={<ResourceDetailToPurchase />} />

        <Route path="/resources" element={<Resources />} />
        <Route path="/contact-us" element={<Contact_us />} />
        <Route path="/legal-info" element={<Legal_info />} />
        <Route path="/subscribe-us" element={<SubscribeUs/>}/>
        <Route path='/purchase-query' element={<PurchaseQueryPage/>}/>
      </Routes>
      </Suspense>
      <Analytics />
    </div>
  )
}

export default App
