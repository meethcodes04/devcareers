import React, { useState, useEffect } from 'react'
import banner from '../../assets/banner.avif'

// Mobile sub-component
const MobileBanner = ({ referralLink, timeLeft }) => (
  <div className="flex sm:hidden" style={{
    alignItems: 'center',
    padding: '12px',
    gap: '10px',
    position: 'relative',
    minHeight: '110px',
  }}>
    {/* Same bg image as desktop */}
    <div style={{
      position: 'absolute',
      inset: 0,
      backgroundImage: `url("https://static.naukimg.com/s/8/801/i/src/app/contestFlow/careerVerse/mainContent/topSec/assets/bg.4057f74a.png")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }} />

    {/* LEFT: Image */}
    <img
      src="https://static.naukimg.com/s/8/801/i/src/app/contestFlow/careerVerse/mainContent/assets/banner-date.e414f12e.png"
      alt="CareerVerse by Naukri Campus"
      style={{
        width: '100px',
        height: '100px',
        objectFit: 'contain',
        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
        animation: 'floatImg 3s ease-in-out infinite',
        flexShrink: 0,
        position: 'relative',
      }}
    />

    {/* RIGHT: Date + Title + Timer + Enrol */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, position: 'relative' }}>
      <span style={{
        background: 'rgba(0,0,0,0.25)',
        color: '#fff',
        fontSize: '10px',
        fontWeight: 700,
        padding: '3px 8px',
        borderRadius: '20px',
        alignSelf: 'flex-start',
      }}>11–15 March 2026</span>

      <p style={{
        color: '#fff',
        fontWeight: 800,
        fontSize: '15px',
        margin: 0,
        lineHeight: 1.3,
        textShadow: '0 1px 4px rgba(0,0,0,0.3)',
      }}>
        25,000+ Job Opportunities Await!
      </p>

      {/* Small countdown */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '2px',
        background: 'rgba(0,0,0,0.35)',
        borderRadius: '8px',
        padding: '4px 8px',
        alignSelf: 'flex-start',

      }}>
        {[
          { v: timeLeft.days, l: 'Days' },
          { v: timeLeft.hours, l: 'Hrs' },
          { v: timeLeft.mins, l: 'Mins' },
          { v: timeLeft.secs, l: 'Secs' },
        ].map(({ v, l }, i, arr) => (
          <React.Fragment key={l}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#fbbf24', fontWeight: 900, fontSize: '13px', lineHeight: 1 }}>
                {String(v).padStart(2, '0')}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{l}</div>
            </div>
            {i < arr.length - 1 && (
              <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 700, fontSize: '12px', margin: '0 2px', lineHeight: 1, paddingBottom: '6px' }}>|</span>
            )}
          </React.Fragment>
        ))}
      </div>

      <a
        href={referralLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          background: '#111',
          color: '#fff',
          fontWeight: 800,
          fontSize: '13px',
          padding: '8px 20px',
          borderRadius: '999px',
          textDecoration: 'none',
          alignSelf: 'flex-start',
          letterSpacing: '-0.01em',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        Enrol now →
      </a>
    </div>
  </div>
)

const NaukriCareerVerseBanner = ({ referralLink = "https://www.naukri.com/campus/contests/career-fair-2026?action=enrol&referral=e2000084-rEKBRXA-pses&uapp=801&utm_source=share_desktop&utm_medium=referral" }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 })
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    const target = new Date('2026-03-16T00:00:00')
    const interval = setInterval(() => {
      const now = new Date()
      const diff = target - now
      if (diff <= 0) { clearInterval(interval); return }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      })
      setPulse(p => !p)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 40%, #15803d 100%)',
      borderRadius: '20px',
      padding: '0',
      overflow: 'hidden',
      position: 'relative',
      fontFamily: "'Trebuchet MS', sans-serif",
      boxShadow: '0 8px 32px rgba(34,197,94,0.4), 0 2px 8px rgba(0,0,0,0.2)',
      border: '2px solid rgba(255,255,255,0.2)',
      marginBottom: '18px'
    }}>
      {/* Star burst background pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("https://static.naukimg.com/s/8/801/i/src/app/contestFlow/careerVerse/mainContent/topSec/assets/bg.4057f74a.png")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* DESKTOP layout */}
      <div className="hidden sm:flex" style={{
        alignItems: 'stretch',
        minHeight: '160px',
        position: 'relative',
      }}>
        {/* LEFT: Image */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px 8px 8px 8px',
          flexShrink: 0,
          width: '240px',
        }}>
          <img
            src="https://static.naukimg.com/s/8/801/i/src/app/contestFlow/careerVerse/mainContent/assets/banner-date.e414f12e.png"
            alt="CareerVerse by Naukri Campus"
            style={{
              width: '180px',
              height: '180px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
              animation: 'floatImg 3s ease-in-out infinite',
            }}
          />
        </div>

        {/* MIDDLE: Text content */}
        <div style={{
          flex: 1,
          padding: '20px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '8px',
        }}>
          {/* Urgency badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              background: 'rgba(0,0,0,0.25)',
              color: '#fff',
              fontSize: '10px',
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: '20px',
            }}>11–15 March 2026</span>
          </div>

          <div>
            <p style={{
              color: '#fff',
              fontWeight: 800,
              fontSize: '22px',
              margin: 0,
              lineHeight: 1.3,
              textShadow: '0 1px 4px rgba(0,0,0,0.3)',
            }}>
              25,000+ Job Opportunities Await!
            </p>
            <p style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: '12px',
              margin: '4px 0 0',
              lineHeight: 1.4,
            }}>
              India's biggest campus hiring fest. Top companies. Real offers. Don't miss out!
            </p>
          </div>

          {/* Merged Countdown + Enrol Now pill */}
          <a
            href={referralLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#fff',
              borderRadius: '50px',
              padding: '6px 6px 6px 14px',
              gap: '10px',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              marginTop: '4px',
              alignSelf: 'flex-start',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.03)'
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)'
            }}
          >
            {/* Countdown ticks */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              {[
                { v: timeLeft.days, l: 'Days' },
                { v: timeLeft.hours, l: 'Hrs' },
                { v: timeLeft.mins, l: 'Mins' },
                { v: timeLeft.secs, l: 'Secs' },
              ].map(({ v, l }, i, arr) => (
                <React.Fragment key={l}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#111', fontWeight: 900, fontSize: '17px', lineHeight: 1 }}>
                      {String(v).padStart(2, '0')}
                    </div>
                    <div style={{ color: '#555', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{l}</div>
                  </div>
                  {i < arr.length - 1 && (
                    <span style={{ color: '#ccc', fontWeight: 700, fontSize: '16px', margin: '0 3px', lineHeight: 1, paddingBottom: '8px' }}>|</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Enrol Now pill button */}
            <div style={{
              background: '#111',
              color: '#fff',
              fontWeight: 800,
              fontSize: '13px',
              padding: '10px 18px',
              borderRadius: '999px',
              whiteSpace: 'nowrap',
              letterSpacing: '-0.01em',
            }}>
              Enrol now
            </div>
          </a>
        </div>
      </div>

      {/* MOBILE layout */}
      <MobileBanner referralLink={referralLink} timeLeft={timeLeft} />

      <style>{`
        @keyframes floatImg {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  )
}

export default NaukriCareerVerseBanner