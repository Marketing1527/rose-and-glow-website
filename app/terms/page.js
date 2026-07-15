export const metadata = { title: 'Terms & Conditions | Rose & Glow Hair Salon' }

export default function Terms() {
  return (
    <>
      <div style={{background:'var(--cream)',padding:'8rem 6rem 5rem',textAlign:'center'}}>
        <div className="section-tag">Legal</div>
        <h1 className="section-title" style={{fontSize:'3.5rem',marginTop:'1rem'}}>Terms & <em>Conditions</em></h1>
        <p style={{fontSize:'0.9rem',color:'var(--muted)',maxWidth:'40rem',margin:'1.5rem auto 0',lineHeight:1.9,fontWeight:300}}>
          Last updated: July 2025
        </p>
      </div>

      <section style={{background:'var(--cream)',padding:'3rem 8rem 6rem',maxWidth:'900px',margin:'0 auto'}}>
        
        <div style={{marginBottom:'2.5rem'}}>
          <h2 style={{fontFamily:'Cormorant Garamond, serif',fontSize:'1.8rem',fontWeight:300,color:'var(--dark)',marginBottom:'1rem'}}>1. Appointment Policy</h2>
          <p style={{fontSize:'0.85rem',lineHeight:1.9,color:'var(--muted)',fontWeight:300}}>All appointments must be booked in advance. We require at least 24 hours notice for cancellations or rescheduling. Late cancellations or no-shows may be subject to a cancellation fee.</p>
        </div>

        <div style={{marginBottom:'2.5rem'}}>
          <h2 style={{fontFamily:'Cormorant Garamond, serif',fontSize:'1.8rem',fontWeight:300,color:'var(--dark)',marginBottom:'1rem'}}>2. Late Arrivals</h2>
          <p style={{fontSize:'0.85rem',lineHeight:1.9,color:'var(--muted)',fontWeight:300}}>We kindly ask that you arrive on time for your appointment. Clients arriving more than 15 minutes late may need to be rescheduled to ensure the best service experience for all guests.</p>
        </div>

        <div style={{marginBottom:'2.5rem'}}>
          <h2 style={{fontFamily:'Cormorant Garamond, serif',fontSize:'1.8rem',fontWeight:300,color:'var(--dark)',marginBottom:'1rem'}}>3. Service Results</h2>
          <p style={{fontSize:'0.85rem',lineHeight:1.9,color:'var(--muted)',fontWeight:300}}>Results may vary based on individual hair type, condition, and history. Our team will conduct a thorough consultation before any service. We are not responsible for results that differ from expectations due to undisclosed hair history or conditions.</p>
        </div>

        <div style={{marginBottom:'2.5rem'}}>
          <h2 style={{fontFamily:'Cormorant Garamond, serif',fontSize:'1.8rem',fontWeight:300,color:'var(--dark)',marginBottom:'1rem'}}>4. Payments</h2>
          <p style={{fontSize:'0.85rem',lineHeight:1.9,color:'var(--muted)',fontWeight:300}}>Payment is due at the time of service. We accept cash, credit cards, and digital payments. Prices are subject to change without notice.</p>
        </div>

        <div style={{marginBottom:'2.5rem'}}>
          <h2 style={{fontFamily:'Cormorant Garamond, serif',fontSize:'1.8rem',fontWeight:300,color:'var(--dark)',marginBottom:'1rem'}}>5. Refund Policy</h2>
          <p style={{fontSize:'0.85rem',lineHeight:1.9,color:'var(--muted)',fontWeight:300}}>We do not offer refunds on services rendered. If you are unsatisfied with your service, please contact us within 7 days and we will do our best to make it right with a complimentary adjustment.</p>
        </div>

        <div style={{marginBottom:'2.5rem'}}>
          <h2 style={{fontFamily:'Cormorant Garamond, serif',fontSize:'1.8rem',fontWeight:300,color:'var(--dark)',marginBottom:'1rem'}}>6. Privacy Policy</h2>
          <p style={{fontSize:'0.85rem',lineHeight:1.9,color:'var(--muted)',fontWeight:300}}>We collect personal information solely for the purpose of providing our services and communicating with you about your appointments. We do not sell or share your personal information with third parties. Your data is kept secure and confidential.</p>
        </div>

        <div style={{marginBottom:'2.5rem'}}>
          <h2 style={{fontFamily:'Cormorant Garamond, serif',fontSize:'1.8rem',fontWeight:300,color:'var(--dark)',marginBottom:'1rem'}}>7. Photography</h2>
          <p style={{fontSize:'0.85rem',lineHeight:1.9,color:'var(--muted)',fontWeight:300}}>Rose & Glow Hair Salon may photograph completed services for marketing and social media purposes. If you prefer not to be photographed, please notify your stylist before your service begins.</p>
        </div>

        <div style={{marginBottom:'2.5rem'}}>
          <h2 style={{fontFamily:'Cormorant Garamond, serif',fontSize:'1.8rem',fontWeight:300,color:'var(--dark)',marginBottom:'1rem'}}>8. Contact Us</h2>
          <p style={{fontSize:'0.85rem',lineHeight:1.9,color:'var(--muted)',fontWeight:300}}>If you have any questions about these Terms & Conditions, please contact us at:</p>
          <p style={{fontSize:'0.85rem',lineHeight:1.9,color:'var(--muted)',fontWeight:300,marginTop:'0.5rem'}}>
            📞 <a href="tel:17863574958" style={{color:'var(--rose)',textDecoration:'none'}}>(786) 357-4958</a><br/>
            📍 1076 SW 67th Ave, Suite 201, Miami, FL 33144<br/>
            ✉️ <a href="mailto:hello@roseandglowhair.com" style={{color:'var(--rose)',textDecoration:'none'}}>hello@roseandglowhair.com</a>
          </p>
        </div>

      </section>
    </>
  )
}
