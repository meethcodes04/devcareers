import React from 'react'
import Footer from '../components/common/Footer'
import StatsCounter from '../components/home/StatsCounter'
import Hero from '../components/home/Hero'
const Home = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white to-orange-50">
        <Hero/>
        <StatsCounter />
        <Footer />
      </div>
    </>
  )
}

export default Home