import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <footer>
        <div>
          <Image src="/logo.png" alt="Rose & Glow" width={180} height={60} className="footer-logo" style={{ width: '180px', height: 'auto' }} />
          <p className="footer-tagline">A luxury hair salon dedicated to beautiful, healthy hair and personalized care. Every visit leaves you feeling confident and glowing.</p>
        </div>
        <div>
          <div className="footer-col-title">Services</div>
          <ul className="footer-links">
            <li><Link href="/services">Balayage</Link></li>
            <li><Link href="/services">Custom Color</Link></li>
            <li><Link href="/services">Precision Cuts</Link></li>
            <li><Link href="/services">Head Spa</Link></li>
            <li><Link href="/services">Treatments</Link></li>
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Studio</div>
          <ul className="footer-links">
            <li><Link href="/about">Our Story</Link></li>
            <li><Link href="/reviews">Reviews</Link></li>
            <li><Link href="/services">Pricing</Link></li>
            <li><Link href="/contact">Gift Cards</Link></li>
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Contact</div>
          <ul className="footer-links">
            <li><Link href="/contact">Book Appointment</Link></li>
            <li><a href="tel:17863574958">(786) 357-4958</a></li>
            <li><a href="mailto:hello@roseandglow.com">hello@roseandglow.com</a></li>
            <li><a href="https://maps.google.com/?q=1076+SW+67th+Ave+Suite+201+Miami+FL+33144" target="_blank" rel="noopener noreferrer">1076 SW 67th Ave, Suite 201<br />Miami, FL 33144</a></li>
          </ul>
        </div>
      </footer>
      <div className="footer-bottom">
        <div className="footer-copy">© 2025 Rose & Glow Hair Salon. All rights reserved. &nbsp;·&nbsp; <Link href="/terms" className="footer-terms">Terms & Conditions</Link></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div className="footer-social">
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">TikTok</a>
          </div>
          <a href="https://marketingsvc.com" target="_blank" rel="noopener noreferrer" className="footer-credit">Created by Essential Marketing</a>
        </div>
      </div>
    </>
  )
}
