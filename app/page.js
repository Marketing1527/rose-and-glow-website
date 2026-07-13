import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-left">
          <div className="hero-eyebrow">Luxury Hair Salon</div>
          <h1 className="hero-headline">
            Where beauty<br />meets <em>artistry</em><br />&amp; intention
          </h1>
          <p className="hero-sub">
            With over 10 years of experience, we specialize in balayage, custom color,
            and restorative treatments. Every visit is designed to leave you feeling
            confident, refreshed, and glowing.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="btn-primary">Book a Session</Link>
            <Link href="/services" className="btn-secondary">View Services</Link>
          </div>
        </div>

        <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--peach)' }}>
          <Image
            src="/hero-image.png"
            alt="Beautiful balayage hair at Rose & Glow salon"
            fill
            sizes="50vw"
            style={{ objectFit: 'cover', objectPosition: 'center center' }}
            priority
          />
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(to right, var(--cream) 0%, rgba(253,248,245,0.6) 8%, rgba(253,248,245,0.1) 25%, transparent 50%)'
          }} />
          <div style={{
            position: 'absolute', bottom: 0, right: 0,
            width: '60%', height: '42%',
            background: 'rgba(232,196,181,0.82)',
            borderRadius: '55% 0 0 0 / 65% 0 0 0',
            zIndex: 2
          }} />
          <div className="hero-floater" style={{ zIndex: 3, left: 'auto', right: '3rem', top: '3rem' }}>
            <div className="hero-floater-label">Specialty</div>
            <div className="hero-floater-val">Balayage &amp; Color</div>
            <div className="hero-floater-sub">Custom · Handcrafted</div>
          </div>
          <div className="hero-badge" style={{ zIndex: 3 }}>
            <div className="hero-badge-num">10+</div>
            <div className="hero-badge-text">Years of<br />Excellence</div>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="divider">
        <div className="divider-line" />
        <span className="divider-star">✦</span>
        <div className="divider-line right" />
      </div>

      {/* SERVICES PREVIEW */}
      <section className="services" style={{ paddingBottom: '3rem' }}>
        <div className="section-header">
          <div className="section-tag">What We Offer</div>
          <h2 className="section-title">Our <em>signature</em> services</h2>
        </div>
        <div className="services-grid">
          {[
            { name: 'Balayage', desc: 'Hand-painted, sun-kissed color customized for you.', price: 'From $150' },
            { name: 'Custom Color', desc: 'Professional-grade color crafted uniquely for your tone.', price: 'From $120' },
            { name: 'Precision Cuts', desc: 'Shaped for your face structure and real-life movement.', price: 'From $65' },
            { name: 'Restorative Treatments', desc: 'Repair, restore, and strengthen from within.', price: 'From $85' },
            { name: 'Luxury Head Spa', desc: 'A full sensory scalp and hair wellness experience.', price: 'From $95' },
            { name: 'Styling & Blowouts', desc: 'Polished, long-lasting styles for any occasion.', price: 'From $55' },
          ].map((s) => (
            <div className="service-card" key={s.name}>
              <div className="service-icon">✦</div>
              <div className="service-name">{s.name}</div>
              <p className="service-desc">{s.desc}</p>
              <div className="service-price">{s.price}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/services" className="btn-primary">View All Services</Link>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="experience">
        <div className="experience-tag">The Rose &amp; Glow Difference</div>
        <h2 className="experience-title">More than a salon —<br />an <em>experience</em></h2>
        <p className="experience-body">
          From the moment you walk in, every detail is curated for your comfort, confidence,
          and beauty. Premium products and techniques refined over a decade of expertise.
        </p>
        <Link href="/about" className="btn-light">View Our Story</Link>
        <div className="experience-pillars">
          {[
            { name: 'Premium Products', text: 'Only the finest color-safe, professional-grade formulations.' },
            { name: 'Personalized Care', text: 'Every service tailored to your texture, tone, and lifestyle.' },
            { name: '10 Years Mastery', text: 'A decade of artistry behind every cut, color, and treatment.' },
            { name: 'Restorative Focus', text: 'We never compromise hair health for aesthetics.' },
          ].map((p) => (
            <div className="pillar" key={p.name}>
              <div className="pillar-icon">✦</div>
              <div className="pillar-name">{p.name}</div>
              <p className="pillar-text">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS PREVIEW */}
      <section className="testimonials">
        <div className="section-header">
          <div className="section-tag">Client Love</div>
          <h2 className="section-title">Words from our <em>guests</em></h2>
        </div>
        <div className="testimonials-grid">
          {[
            { text: "My balayage looks absolutely natural and stunning. Rose & Glow is the only place I'll trust with my hair.", author: 'Sofia M.' },
            { text: "The luxury head spa was a full transformation — my scalp felt renewed and my hair has never been shinier.", author: 'Camille R.' },
            { text: "After years of damage, the restorative treatment gave me my hair back. Truly life-changing work.", author: 'Adriana L.' },
          ].map((t) => (
            <div className="testimonial" key={t.author}>
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">— {t.author}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/reviews" className="btn-primary">Read All Reviews</Link>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{ background: 'var(--rose-light)', padding: '5rem 6rem', textAlign: 'center' }}>
        <div className="section-tag">Ready to Glow?</div>
        <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
          Begin your <em>journey</em> today
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '2rem', fontWeight: 300 }}>
          Book your appointment and let us create something beautiful — just for you.
        </p>
        <Link href="/contact" className="btn-primary">Book an Appointment</Link>
      </section>
    </>
  )
}
