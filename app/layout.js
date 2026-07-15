import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AccessibilityBtn from '../components/AccessibilityBtn'

export const metadata = {
  title: 'Rose & Glow Hair Salon',
  description: 'Luxury hair salon specializing in balayage, custom color, haircuts, restorative treatments, and luxury head spa services.',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />

        <a href="https://wa.me/17863574958" target="_blank" rel="noopener noreferrer" className="whatsapp-btn" aria-label="Chat on WhatsApp">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" width="30" height="30" />
        </a>

        <AccessibilityBtn />
      </body>
    </html>
  )
}
