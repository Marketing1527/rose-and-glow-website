import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <footer>
        <div>
          <Image src="/logo.png" alt="Rose & Glow" width={150} height={50} className="footer-logo" />
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
            <li><a href="tel:5550000000">(555) 000-0000</a></li>
            <li><a href="mailto:hello@roseandglow.com">hello@roseandglow.com</a></li>
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
