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

        {/* WHATSAPP FLOATING BUTTON */}
        <a href="https://wa.me/17863574958" target="_blank" rel="noopener noreferrer" className="whatsapp-btn" aria-label="Chat on WhatsApp">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" width="30" height="30" />
        </a>

        {/* USERWAY ACCESSIBILITY WIDGET */}
       <script
          dangerouslySetInnerHTML={{
            __html: `(function(d){var s = d.createElement("script");s.setAttribute("data-account", "YOUR_USERWAY_ID");s.setAttribute("src", "https://cdn.userway.org/widget.js");s.setAttribute("data-position", "3");s.setAttribute("data-color", "#f0d5c8");s.setAttribute("data-size", "medium");(d.body || d.head).appendChild(s);})(document)`
          }}
        />

      </body>
    </html>
  )
}
