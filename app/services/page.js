import Link from 'next/link'

export const metadata = { title: 'Services | Rose & Glow Hair Salon' }

const services = [
  {
    name: 'Balayage',
    desc: 'Hand-painted, sun-kissed color that grows out beautifully. Fully customized to complement your skin tone and lifestyle for a natural, radiant look.',
    price: 'Starting at $150',
    duration: '2–3 hours',
  },
  {
    name: 'Custom Color',
    desc: 'From rich brunettes to platinum blondes, our color specialists craft a shade uniquely yours using professional-grade, color-safe formulations.',
    price: 'Starting at $120',
    duration: '1.5–2.5 hours',
  },
  {
    name: 'Precision Cuts',
    desc: 'Every cut is a collaboration — shaped and styled with your natural texture and face structure in mind to create movement that works for your real life.',
    price: 'Starting at $65',
    duration: '45–60 min',
  },
  {
    name: 'Restorative Treatments',
    desc: 'Deeply nourishing treatments that repair damage, restore shine, and strengthen hair from within using the finest bonding and moisturizing technology.',
    price: 'Starting at $85',
    duration: '60–90 min',
  },
  {
    name: 'Luxury Head Spa',
    desc: 'A full sensory experience — scalp analysis, deep cleanse, and therapeutic massage designed to nourish both your scalp and your spirit.',
    price: 'Starting at $95',
    duration: '60–75 min',
  },
  {
    name: 'Styling & Blowouts',
    desc: 'Whether for a special occasion or simply because you deserve it — our blowouts and styles are polished, long-lasting, and utterly luxurious.',
    price: 'Starting at $55',
    duration: '45–60 min',
  },
]

export default function Services() {
  return (
    <>
      {/* PAGE HERO */}
      <div style={{background:'var(--cream)',padding:'8rem 6rem 5rem',textAlign:'center'}}>
        <div className="section-tag">What We Offer</div>
        <h1 className="section-title" style={{fontSize:'3.5rem',marginTop:'1rem'}}>Our <em>Signature</em> Services</h1>
        <p style={{fontSize:'0.9rem',color:'var(--muted)',maxWidth:'40rem',margin:'1.5rem auto 0',lineHeight:1.9,fontWeight:300}}>
          Every service is tailored to you — your hair, your lifestyle, your vision. Explore what we offer below.
        </p>
      </div>

      {/* SERVICES FULL */}
      <section className="services" style={{paddingTop:'4rem'}}>
        <div className="services-grid">
          {services.map((service) => (
            <div className="service-card" key={service.name} style={{position:'relative'}}>
              <div className="service-icon">✦</div>
              <div className="service-name">{service.name}</div>
              <p className="service-desc">{service.desc}</p>
              <div style={{marginTop:'1.5rem',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'0.5rem'}}>
                <div className="service-price">{service.price}</div>
                <div style={{fontSize:'0.68rem',color:'var(--muted)',letterSpacing:'0.1em'}}>{service.duration}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{background:'var(--dark)',padding:'5rem 6rem',textAlign:'center'}}>
        <div className="experience-tag">Ready to Book?</div>
        <h2 className="experience-title" style={{fontSize:'2.8rem',marginBottom:'1.5rem'}}>Let&apos;s create something <em>beautiful</em></h2>
        <p style={{fontSize:'0.85rem',color:'rgba(253,248,245,0.55)',marginBottom:'2.5rem',fontWeight:300,maxWidth:'35rem',margin:'0 auto 2.5rem'}}>
          Prices may vary based on hair length and complexity. Consultation is always complimentary.
        </p>
        <Link href="/contact" className="btn-light">Book an Appointment</Link>
      </section>
    </>
  )
}
