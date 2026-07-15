'use client'
import { useState } from 'react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
   time: '', name: '', email: '', phone: '', service: '', date: '', message: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const getTimeSlots = () => {
    const isBalayage = formData.service === 'Balayage'
    const slots = []
    const start = 10
    const end = isBalayage ? 12 : 15
    for (let h = start; h <= end; h++) {
      if (isBalayage && h === 12) break
      slots.push(`${h === 12 ? 12 : h > 12 ? h - 12 : h}:00 ${h >= 12 ? 'PM' : 'AM'}`)
      if (h !== end - 1 && !(isBalayage && h === 11)) {
        slots.push(`${h === 12 ? 12 : h > 12 ? h - 12 : h}:30 ${h >= 12 ? 'PM' : 'AM'}`)
      }
    }
    return slots
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) setSubmitted(true)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <>
      <div style={{background:'var(--cream)',padding:'8rem 6rem 5rem',textAlign:'center'}}>
        <div className="section-tag">Get In Touch</div>
        <h1 className="section-title" style={{fontSize:'3.5rem',marginTop:'1rem'}}>Book Your <em>Appointment</em></h1>
        <p style={{fontSize:'0.9rem',color:'var(--muted)',maxWidth:'40rem',margin:'1.5rem auto 0',lineHeight:1.9,fontWeight:300}}>
          Ready to glow? Fill out the form below and we&apos;ll confirm your appointment within 24 hours.
        </p>
      </div>

      <section className="booking" style={{background:'var(--cream)'}}>
        <div>
          <div className="booking-tag">Visit Us</div>
          <h2 className="booking-title">Begin your<br /><em>glow</em> journey</h2>
          <p className="booking-body">We&apos;re here to make every visit special. Reach out and let&apos;s create something beautiful together.</p>
          <div className="booking-info" style={{gap:'1.5rem'}}>
            <div className="booking-info-item">
              <span className="booking-info-icon" style={{fontSize:'1.2rem'}}>✦</span>
              <div>
                <div style={{fontSize:'0.62rem',letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--gold)',marginBottom:'0.3rem'}}>Phone</div>
                <a href="tel:17863574958" style={{color:'var(--muted)',textDecoration:'none',fontSize:'0.85rem'}}>(786) 357-4958</a>
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
                <a href="https://maps.google.com/?q=1076+SW+67th+Ave+Suite+201+Miami+FL+33144" target="_blank" rel="noopener noreferrer" style={{color:'var(--muted)',textDecoration:'none',fontSize:'0.85rem'}}>1076 SW 67th Ave, Suite 201<br />Miami, FL 33144</a>
              </div>
            </div>
          </div>
        </div>

        <div className="booking-right">
          {submitted ? (
            <div style={{textAlign:'center',padding:'3rem 0'}}>
              <div style={{fontSize:'2rem',color:'var(--rose)',marginBottom:'1rem'}}>✦</div>
              <h3 style={{fontFamily:'Cormorant Garamond, serif',fontSize:'1.8rem',fontWeight:300,color:'var(--dark)',marginBottom:'1rem'}}>Thank you!</h3>
              <p style={{fontSize:'0.85rem',color:'var(--muted)',lineHeight:1.8}}>We&apos;ve received your request and will confirm your appointment within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-row"><label className="form-label">Full Name *</label><input className="form-input" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required /></div>
              <div className="form-row"><label className="form-label">Email Address *</label><input className="form-input" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required /></div>
              <div className="form-row"><label className="form-label">Phone Number</label><input className="form-input" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="(555) 000-0000" /></div>
              <div className="form-row">
                <label className="form-label">Service *</label>
                <select className="form-select" name="service" value={formData.service} onChange={handleChange} required>
                  <option value="">Select a service...</option>
                  <option>Balayage</option>
                  <option>Custom Color</option>
                  <option>Precision Cut</option>
                  <option>Extensions</option>
                  <option>Luxury Head Spa</option>
                  <option>Styling & Blowout</option>
                </select>
              </div>
              <div className="form-row">
  <label className="form-label">Preferred Date</label>
  <input className="form-input" type="date" name="date" value={formData.date} onChange={handleChange}
    min={new Date().toISOString().split('T')[0]}
  />
  <p style={{fontSize:'0.7rem',color:'var(--muted)',marginTop:'0.4rem'}}>Open Tuesday – Saturday</p>
</div>
<div className="form-row">
  <label className="form-label">Preferred Time</label>
  <select className="form-select" name="time" value={formData.time || ''} onChange={handleChange} required>
    <option value="">Select a time...</option>
    {getTimeSlots().map(slot => (
      <option key={slot} value={slot}>{slot}</option>
    ))}
  </select>
  {formData.service === 'Balayage' && (
    <p style={{fontSize:'0.7rem',color:'var(--rose)',marginTop:'0.4rem'}}>Balayage appointments available 10:00 AM – 12:00 PM only</p>
  )}
</div>
              <div className="form-row"><label className="form-label">Message</label><textarea className="form-input" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your hair goals..." rows={3} style={{resize:'vertical'}} /></div>
              <button type="submit" className="form-submit" disabled={loading}>
                {loading ? 'Sending...' : 'Request Appointment'}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
