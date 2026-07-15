export const metadata = { title: 'Privacy Policy | Rose & Glow Hair Salon' }

export default function Privacy() {
  return (
    <>
      <div style={{background:'var(--cream)',padding:'8rem 6rem 5rem',textAlign:'center'}}>
        <div className="section-tag">Legal</div>
        <h1 className="section-title" style={{fontSize:'3.5rem',marginTop:'1rem'}}>Privacy <em>Policy</em></h1>
        <p style={{fontSize:'0.9rem',color:'var(--muted)',maxWidth:'40rem',margin:'1.5rem auto 0',lineHeight:1.9,fontWeight:300}}>Last updated: July 2025</p>
      </div>

      <section style={{background:'var(--cream)',padding:'3rem 8rem 6rem',maxWidth:'900px',margin:'0 auto'}}>

        <div style={{marginBottom:'2.5rem'}}>
          <h2 style={{fontFamily:'Cormorant Garamond, serif',fontSize:'1.8rem',fontWeight:300,color:'var(--dark)',marginBottom:'1rem'}}>1. Information We Collect</h2>
          <p style={{fontSize:'0.85rem',lineHeight:1.9,color:'var(--muted)',fontWeight:300}}>We collect personal information you provide when booking appointments, including your name, email address, phone number, and service preferences. We may also collect information about your hair history to provide better services.</p>
        </div>

        <div style={{marginBottom:'2.5rem'}}>
          <h2 style={{fontFamily:'Cormorant Garamond, serif',fontSize:'1.8rem',fontWeight:300,color:'var(--dark)',marginBottom:'1rem'}}>2. How We Use Your Information</h2>
          <p style={{fontSize:'0.85rem',lineHeight:1.9,color:'var(--muted)',fontWeight:300}}>We use your information to confirm and manage appointments, send you reminders and updates about your bookings, improve our services, and communicate with you about promotions or special offers (only with your consent).</p>
        </div>

        <div style={{marginBottom:'2.5rem'}}>
          <h2 style={{fontFamily:'Cormorant Garamond, serif',fontSize:'1.8rem',fontWeight:300,color:'var(--dark)',marginBottom:'1rem'}}>3. Data Sharing</h2>
          <p style={{fontSize:'0.85rem',lineHeight:1.9,color:'var(--muted)',fontWeight:300}}>We do not sell, trade, or share your personal information with third parties. Your data is only used internally to provide our services and improve your experience at Rose & Glow Hair Salon.</p>
        </div>

        <div style={{marginBottom:'2.5rem'}}>
          <h2 style={{fontFamily:'Cormorant Garamond, serif',fontSize:'1.8rem',fontWeight:300,color:'var(--dark)',marginBottom:'1rem'}}>4. Data Security</h2>
          <p style={{fontSize:'0.85rem',lineHeight:1.9,color:'var(--muted)',fontWeight:300}}>We implement appropriate security measures to protect your personal information. All data transmitted through our website is encrypted using SSL technology.</p>
        </div>

        <div style={{marginBottom:'2.5rem'}}>
          <h2 style={{fontFamily:'Cormorant Garamond, serif',fontSize:'1.8rem',fontWeight:300,color:'var(--dark)',marginBottom:'1rem'}}>5. Cookies</h2>
          <p style={{fontSize:'0.85rem',lineHeight:1.9,color:'var(--muted)',fontWeight:300}}>Our website may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, though this may affect some website functionality.</p>
        </div>

        <div style={{marginBottom:'2.5rem'}}>
          <h2 style={{fontFamily:'Cormorant Garamond, serif',fontSize:'1.8rem',fontWeight:300,color:'var(--dark)',marginBottom:'1rem'}}>6. Your Rights</h2>
          <p style={{fontSize:'0.85rem',lineHeight:1.9,color:'var(--muted)',fontWeight:300}}>You have the right to access, correct, or delete your personal information at any time. To exercise these rights, please contact us directly and we will respond within 30 days.</p>
        </div>

        <div style={{marginBottom:'2.5rem'}}>
          <h2 style={{fontFamily:'Cormorant Garamond, serif',fontSize:'1.8rem',fontWeight:300,color:'var(--dark)',marginBottom:'1rem'}}>7. Contact Us</h2>
          <p style={{fontSize:'0.85rem',lineHeight:1.9,color:'var(--muted)',fontWeight:300}}>
            For privacy-related questions contact us at:<br/><br/>
            📞 <a href="tel:17863574958" style={{color:'var(--rose)',textDecoration:'none'}}>(786) 357-4958</a><br/>
            📍 1076 SW 67th Ave, Suite 201, Miami, FL 33144<br/>
            ✉️ <a href="mailto:hello@roseandglowhair.com" style={{color:'var(--rose)',textDecoration:'none'}}>hello@roseandglowhair.com</a>
          </p>
        </div>

      </section>
    </>
  )
}
