import '../globals.css'

export const metadata = {
  title: 'Admin | Rose & Glow Hair Salon',
}

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
