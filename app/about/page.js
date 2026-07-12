import Image from 'next/image'
import Link from 'next/link'

export const metadata = { title: 'About Us | Rose & Glow Hair Salon' }

export default function About() {
  return (
    <>
      {/* PAGE HERO */}
      <div className="page-hero" style={{background:'var(--peach)',padding:'8rem 6rem 5rem',textAlign:'center'}}>
        <div className="section-tag">Our Story</div>
        <h1 className="section-title" style={{fontSize:'3.5rem',marginTop:'1rem'}}>About <em>Rose &amp; Glow</em></h1>
        <p style={{fontSize:'0.9rem',color:'var(--muted)',maxWidth:'40rem',margin:'1.5rem auto 0',lineHeight:1.9,fontWeight:300}}>
          A luxury hair salon built on passion, expertise, and the belief that every client deserves to feel their most beautiful.
        </p>
      </div>

      {/* ABOUT MAIN */}
      <section className="about">
        <div>
          <div className="about-tag">Who We Are</div>
          <h2 className="about-title">Healthy hair,<br /><em>beautiful</em> results</h2>
          <p className="about-body">
            At Rose &amp; Glow, we believe every client deserves a personalized experience.
            Our passion is creating beautiful, healthy hair through professional techniques
            and premium products. We take the time to understand your lifestyle, goals, and
            vision — then bring them to life.
          </p>
          <p className="about-body">
            With over 10 years of experience in the industry, our team has mastered the art
            of balayage, custom color, restorative treatments, and luxury head spa services.
            We are committed to using only the finest products and staying at the forefront
            of the latest hair trends and techniques.
          </p>
          <Image src="/logo.png" alt="Rose & Glow" width={180} height={60} className="about-logo" style={{ width: '180px', height: 'auto' }} />
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

      {/* OUR VALUES */}
      <section className="experience">
        <div className="experience-tag">What Drives Us</div>
        <h2 className="experience-title">Our <em>values</em></h2>
        <p className="experience-body">
          Everything we do is rooted in a commitment to excellence, integrity, and the
          wellbeing of every guest who walks through our doors.
        </p>
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

      {/* CTA */}
      <section style={{background:'var(--cream)',padding:'5rem 6rem',textAlign:'center'}}>
        <div className="section-tag">Come Visit Us</div>
        <h2 className="section-title" style={{marginBottom:'1.5rem'}}>Ready to experience the <em>difference</em>?</h2>
        <p style={{fontSize:'0.85rem',color:'var(--muted)',marginBottom:'2.5rem',fontWeight:300}}>Book your appointment today and let us create something beautiful.</p>
        <div style={{display:'flex',gap:'1.5rem',justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/contact" className="btn-primary">Book Appointment</Link>
          <Link href="/services" className="btn-secondary">View Services</Link>
        </div>
      </section>
    </>
  )
}
