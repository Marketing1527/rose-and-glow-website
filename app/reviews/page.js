import Link from 'next/link'

export const metadata = { title: 'Reviews | Rose & Glow Hair Salon' }

const reviews = [
  { text: "My balayage looks absolutely natural and stunning. I've never had color that grew out this beautifully. Rose & Glow is the only place I'll trust with my hair.", author: 'Sofia M.', service: 'Balayage' },
  { text: "The luxury head spa was a full transformation — my scalp felt renewed and my hair has never been shinier. The experience itself is worth every penny.", author: 'Camille R.', service: 'Luxury Head Spa' },
  { text: "After years of damage, the restorative treatment gave me my hair back. I walked out feeling like a completely different person. Truly life-changing work.", author: 'Adriana L.', service: 'Restorative Treatment' },
  { text: "I have never felt more beautiful leaving a salon. The team really listened to what I wanted and delivered beyond my expectations. Will be back every month!", author: 'Maria G.', service: 'Custom Color' },
  { text: "The precision cut I got here is the best haircut of my life. My stylist understood my hair texture perfectly and gave me exactly what I envisioned.", author: 'Jasmine T.', service: 'Precision Cut' },
  { text: "Rose & Glow is a true luxury experience from start to finish. The ambiance, the care, the results — everything is exceptional. Highly recommend!", author: 'Elena V.', service: 'Styling & Blowout' },
]

export default function Reviews() {
  return (
    <>
      {/* PAGE HERO */}
      <div style={{background:'var(--cream)',padding:'8rem 6rem 5rem',textAlign:'center'}}>
        <div className="section-tag">Client Love</div>
        <h1 className="section-title" style={{fontSize:'3.5rem',marginTop:'1rem'}}>What Our <em>Guests</em> Say</h1>
        <p style={{fontSize:'0.9rem',color:'var(--muted)',maxWidth:'40rem',margin:'1.5rem auto 0',lineHeight:1.9,fontWeight:300}}>
          Every review is a story of transformation. Here&apos;s what our clients have to say about their Rose &amp; Glow experience.
        </p>
        <div style={{display:'flex',justifyContent:'center',gap:'3rem',marginTop:'3rem',flexWrap:'wrap'}}>
          {[{num:'5★',label:'Average Rating'},{num:'200+',label:'Happy Clients'},{num:'10+',label:'Years of Excellence'}].map(s=>(
            <div key={s.label} style={{textAlign:'center'}}>
              <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:'2.5rem',fontWeight:300,color:'var(--dark)'}}>{s.num}</div>
              <div style={{fontSize:'0.62rem',letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--gold)',marginTop:'0.3rem'}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* REVIEWS GRID */}
      <section className="testimonials">
        <div className="testimonials-grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))'}}>
          {reviews.map((t) => (
            <div className="testimonial" key={t.author}>
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">{t.text}</p>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'0.5rem'}}>
                <div className="testimonial-author">— {t.author}</div>
                <div style={{fontSize:'0.62rem',color:'var(--rose)',letterSpacing:'0.1em',textTransform:'uppercase'}}>{t.service}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{background:'var(--cream)',padding:'5rem 6rem',textAlign:'center'}}>
        <div className="section-tag">Your Turn</div>
        <h2 className="section-title" style={{marginBottom:'1.5rem'}}>Ready for your <em>transformation</em>?</h2>
        <p style={{fontSize:'0.85rem',color:'var(--muted)',marginBottom:'2.5rem',fontWeight:300}}>Join our family of happy clients. Book your appointment today.</p>
        <Link href="/contact" className="btn-primary">Book an Appointment</Link>
      </section>
    </>
  )
}
