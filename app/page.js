'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* NAV */}
      <nav>
        <Image src="/logo.png" alt="Rose & Glow Hair Salon" width={160} height={54} className="nav-logo" style={{height:'54px',width:'auto'}} />
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#testimonials">Reviews</a></li>
          <li><a href="#booking">Contact</a></li>
        </ul>
        <button className="nav-book">Book Now</button>
        <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>&times;</button>
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
        <a href="#testimonials" onClick={() => setMenuOpen(false)}>Reviews</a>
        <a href="#booking" onClick={() => setMenuOpen(false)}>Contact</a>
        <button className="nav-book-mobile">Book Now</button>
      </div>

      {/* HERO */}
      <section className="hero">
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
            <button className="btn-primary">Book a Session</button>
            <button className="btn-secondary">View Services</button>
          </div>
        </div>
        <div className="hero-right">
          <Image src="/logo.png" alt="Rose & Glow" width={460} height={460} className="hero-logo-big" />
          <div className="hero-floater">
            <div className="hero-floater-label">Specialty</div>
            <div className="hero-floater-val">Balayage &amp; Color</div>
            <div className="hero-floater-sub">Custom · Handcrafted</div>
          </div>
          <div className="hero-badge">
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

      {/* ABOUT */}
      <section className="about" id="about">
        <div>
          <div className="about-tag">Our Philosophy</div>
          <h2 className="about-title">Healthy hair,<br /><em>beautiful</em> results</h2>
          <p className="about-body">
            At Rose &amp; Glow, we believe every client deserves a personalized experience.
            Our passion is creating beautiful, healthy hair through professional techniques
            and premium products. We take the time to understand your lifestyle, goals, and
            vision — then bring them to life.
          </p>
          <Image src="/logo.png" alt="Rose & Glow" width={180} height={60} className="about-logo" style={{width:'180px',height:'auto'}} />
        </div>
        <div className="about-right">
          {[
            { num: '10+', label: 'Years Experience' },
            { num: '5★', label: 'Client Rating' },
            { num: '100%', label: 'Premium Products' },
            { num: '∞', label: 'Personalized Care' },
          ].map((stat) => (
            <div className="about-stat" key={stat.label}>
              <div className="about-stat-num">{stat.num}</div>
              <div className="about-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="services" id="services">
        <div className="section-header">
          <div className="section-tag">What We Offer</div>
          <h2 className="section-title">Our <em>signature</em> services</h2>
        </div>
        <div className="services-grid">
          {[
            { name: 'Balayage', desc: 'Hand-painted, sun-kissed color that grows out beautifully. Fully customized to complement your skin tone and lifestyle.', price: 'Starting at $150' },
            { name: 'Custom Color', desc: 'From rich brunettes to platinum blondes, our color specialists craft a shade uniquely yours using professional-grade formulations.', price: 'Starting at $120' },
            { name: 'Precision Cuts', desc: 'Every cut is a collaboration — shaped and styled with your natural texture and face structure in mind for real-life movement.', price: 'Starting at $65' },
            { name: 'Restorative Treatments', desc: 'Deeply nourishing treatments that repair damage, restore shine, and strengthen hair from within using premium bonding technology.', price: 'Starting at $85' },
            { name: 'Luxury Head Spa', desc: 'A full sensory experience — scalp analysis, deep cleanse, and therapeutic massage designed to nourish both your scalp and spirit.', price: 'Starting at $95' },
            { name: 'Styling & Blowouts', desc: 'Whether for a special occasion or simply because you deserve it — our blowouts are polished, long-lasting, and luxurious.', price: 'Starting at $55' },
          ].map((service) => (
            <div className="service-card" key={service.name}>
              <div className="service-icon">✦</div>
              <div className="service-name">{service.name}</div>
              <p className="service-desc">{service.desc}</p>
              <div className="service-price">{service.price}</div>
            </div>
          ))}
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
        <button className="btn-light">View Our Story</button>
        <div className="experience-pillars">
          {[
            { name: 'Premium Products', text: 'Only the finest color-safe, professional-grade formulations touch your hair.' },
            { name: 'Personalized Care', text: 'Every service tailored to your unique texture, tone, and lifestyle.' },
            { name: '10 Years Mastery', text: 'A decade of dedicated artistry behind every cut, color, and treatment.' },
            { name: 'Restorative Focus', text: 'We never compromise hair health for aesthetics — you get both.' },
          ].map((pillar) => (
            <div className="pillar" key={pillar.name}>
              <div className="pillar-icon">✦</div>
              <div className="pillar-name">{pillar.name}</div>
              <p className="pillar-text">{pillar.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials" id="testimonials">
        <div className="section-header">
          <div className="section-tag">Client Love</div>
          <h2 className="section-title">Words from our <em>guests</em></h2>
        </div>
        <div className="testimonials-grid">
          {[
            { text: "My balayage looks absolutely natural and stunning. I've never had color that grew out this beautifully. Rose & Glow is the only place I'll trust with my hair.", author: 'Sofia M.' },
            { text: "The luxury head spa was a full transformation — my scalp felt renewed and my hair has never been shinier. The experience itself is worth every penny.", author: 'Camille R.' },
            { text: "After years of damage, the restorative treatment gave me my hair back. I walked out feeling like a completely different person. Truly life-changing work.", author: 'Adriana L.' },
          ].map((t) => (
            <div className="testimonial" key={t.author}>
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">— {t.author}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING */}
      <section className="booking" id="booking">
        <div>
          <div className="booking-tag">Reserve Your Visit</div>
          <h2 className="booking-title">Begin your<br /><em>glow</em> journey</h2>
          <p className="booking-body">
            Ready to experience the Rose &amp; Glow difference? Book your appointment today
            and let us create something beautiful — just for you.
          </p>
          <div className="booking-info">
            <div className="booking-info-item"><span className="booking-info-icon">✦</span><span>Complimentary consultation with every first visit</span></div>
            <div className="booking-info-item"><span className="booking-info-icon">✦</span><span>Flexible scheduling Monday through Saturday</span></div>
            <div className="booking-info-item"><span className="booking-info-icon">✦</span><span>Premium product recommendations personalized to your hair</span></div>
          </div>
        </div>
        <div className="booking-right">
          <div className="form-row"><label className="form-label">Full Name</label><input className="form-input" type="text" placeholder="Your name" /></div>
          <div className="form-row"><label className="form-label">Email Address</label><input className="form-input" type="email" placeholder="your@email.com" /></div>
          <div className="form-row"><label className="form-label">Phone Number</label><input className="form-input" type="tel" placeholder="(555) 000-0000" /></div>
          <div className="form-row">
            <label className="form-label">Service</label>
            <select className="form-select">
              <option>Balayage</option>
              <option>Custom Color</option>
              <option>Precision Cut</option>
              <option>Restorative Treatment</option>
              <option>Luxury Head Spa</option>
              <option>Styling &amp; Blowout</option>
            </select>
          </div>
          <div className="form-row"><label className="form-label">Preferred Date</label><input className="form-input" type="date" /></div>
          <button className="form-submit">Request Appointment</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div>
          <Image src="/logo.png" alt="Rose & Glow" width={150} height={50} className="footer-logo" />
          <p className="footer-tagline">A luxury hair salon dedicated to beautiful, healthy hair and personalized care. Every visit leaves you feeling confident and glowing.</p>
        </div>
        <div>
          <div className="footer-col-title">Services</div>
          <ul className="footer-links">
            <li><a href="#">Balayage</a></li>
            <li><a href="#">Custom Color</a></li>
            <li><a href="#">Precision Cuts</a></li>
            <li><a href="#">Head Spa</a></li>
            <li><a href="#">Treatments</a></li>
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Studio</div>
          <ul className="footer-links">
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Gallery</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Gift Cards</a></li>
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Contact</div>
          <ul className="footer-links">
            <li><a href="#">Book Appointment</a></li>
            <li><a href="#">(555) 000-0000</a></li>
            <li><a href="#">hello@roseandglow.com</a></li>
            <li><a href="#">Find Us</a></li>
          </ul>
        </div>
      </footer>
      <div className="footer-bottom">
        <div className="footer-copy">© 2025 Rose &amp; Glow Hair Salon. All rights reserved.</div>
        <div className="footer-social">
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
          <a href="#">TikTok</a>
        </div>
      </div>
    </>
  )
}
