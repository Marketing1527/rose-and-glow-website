import './globals.css'

export const metadata = {
  title: 'Rose & Glow Hair Salon',
  description: 'Luxury hair salon specializing in balayage, custom color, haircuts, restorative treatments, and luxury head spa services.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
