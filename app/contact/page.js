'use client'
import { useState } from 'react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      {/* PAGE HERO */}
      <div style={{background:'var(--cream)',padding:'8rem 6rem 5rem',textAlign:'center'}}>
        <div className="section-tag">Get In Touch</div>
        <h1 className="section-title" style={{fontSize:'3.5rem',marginTop:'1rem'}}>Book Your <em>Appointment</em></h1>
        <p style={{fontSize:'0.9rem',color:'var(--muted)',maxWidth:'40rem',margin:'1.5rem auto 0',lineHeight:1.9,fontWeight:300}}>
          Ready to glow? Fill out the form below and we&apos;ll confirm your appointment within 24 hours.
        </p>
      </div>

      {/* CONTACT SECTION */}
      <section className="booking" style={{background:'var(--cream)'}}>
        <div>
          <div className="booking-tag">Visit Us</div>
          <h2 className="booking-title">Begin your<br /><em>glow</em> journey</h2>
          <p className="booking-body">
            We&apos;re here to make every visit special. Reach out and let&apos;s create something beautiful together.
          </p>
          <div className="booking-info" style={{gap:'1.5rem'}}>
            <div className="booking-info-item">
              <span className="booking-info-icon" style={{fontSize:'1.2rem'}}>✦</span>
              <div>
                <div style={{fontSize:'0.62rem',letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--gold)',marginBottom:'0.3rem'}}>Phone</div>
                <a href="tel:5550000000" style={{color:'var(--muted)',textDecoration:'none',fontSize:'0.85rem'}}>(555) 000-0000</a>
              </div>
            </div>
            <div className="booking-info-item">
              <span className="booking-info-icon" style={{fontSize:'1.2rem'}}>✦</span>
              <div>
                <div style={{fontSize:'0.62rem',letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--gold)',marginBottom:'0.3rem'}}>Email</div>
                <a href="mailto:hello@roseandglow.com" style={{color:'var(--muted)',textDecoration:'none',fontSize:'0.85rem'}}>hello@roseandglow.com</a>
              </div>
            </div>
            <div className="booking-info-item">
              <span className="booking-info-icon" style={{fontSize:'1.2rem'}}>✦</span>
              <div>
                <div style={{fontSize:'0.62rem',letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--gold)',marginBottom:'0.3rem'}}>Hours</div>
                <div style={{color:'var(--muted)',fontSize:'0.85rem'}}>Mon–Sat: 9am – 7pm</div>
              </div>
            </div>
            <div className="booking-info-item">
              <span className="booking-info-icon" style={{fontSize:'1.2rem'}}>✦</span>
              <div>
                <div style={{fontSize:'0.62rem',letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--gold)',marginBottom:'0.3rem'}}>Location</div>
                <div style={{color:'var(--muted)',fontSize:'0.85rem'}}>123 Glow Street, Miami FL</div>
              </div>
            </div>
          </div>
        </div>

        <div className="booking-right">
          {submitted ? (
            <div style={{textAlign:'center',padding:'3rem 0'}}>
              <div style={{fontSize:'2rem',color:'var(--rose)',marginBottom:'1rem'}}>✦</div>
              <h3 style={{fontFamily:'Cormorant Garamond, serif',fontSize:'1.8rem',fontWeight:300,color:'var(--dark)',marginBottom:'1rem'}}>Thank you!</h3>
              <p style={{fontSize:'0.85rem',color:'var(--muted)',lineHeight:1.8}}>
                We&apos;ve received your request and will confirm your appointment within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-row"><label className="form-label">Full Name *</label><input className="form-input" type="text" placeholder="Your name" required /></div>
              <div className="form-row"><label className="form-label">Email Address *</label><input className="form-input" type="email" placeholder="your@email.com" required /></div>
              <div className="form-row"><label className="form-label">Phone Number</label><input className="form-input" type="tel" placeholder="(555) 000-0000" /></div>
              <div className="form-row">
                <label className="form-label">Service *</label>
                <select className="form-select" required>
                  <option value="">Select a service...</option>
                  <option>Balayage</option>
                  <option>Custom Color</option>
                  <option>Precision Cut</option>
                  <option>Restorative Treatment</option>
                  <option>Luxury Head Spa</option>
                  <option>Styling & Blowout</option>
                </select>
              </div>
              <div className="form-row"><label className="form-label">Preferred Date</label><input className="form-input" type="date" /></div>
              <div className="form-row">
                <label className="form-label">Message</label>
                <textarea className="form-input" placeholder="Tell us about your hair goals..." rows={3} style={{resize:'vertical'}} />
              </div>
              <button type="submit" className="form-submit">Request Appointment</button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
