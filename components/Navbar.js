'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <nav style={{ boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none' }}>
        <Link href="/">
          <Image src="/logo.png" alt="Rose & Glow Hair Salon" width={145} height={47} className="nav-logo" style={{ height: '47px', width: 'auto' }} />
        </Link>
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={pathname === link.href ? 'nav-active' : ''}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/contact" className="nav-book">Book Now</Link>
        <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)} aria-label="Close">&times;</button>
        <Link href="/" onClick={() => setMenuOpen(false)}>
          <Image src="/logo.png" alt="Rose & Glow" width={140} height={48} style={{ height: '48px', width: 'auto', marginBottom: '1rem' }} />
        </Link>
        {links.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
            className={pathname === link.href ? 'nav-active' : ''}>
            {link.label}
          </Link>
        ))}
        <Link href="/contact" className="nav-book-mobile" onClick={() => setMenuOpen(false)}>Book Now</Link>
      </div>
    </>
  )
}
