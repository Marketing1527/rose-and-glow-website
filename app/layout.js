import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Rose & Glow Hair Salon',
  description: 'Luxury hair salon specializing in balayage, custom color, haircuts, restorative treatments, and luxury head spa services.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
