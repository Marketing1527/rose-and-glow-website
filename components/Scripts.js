'use client'
import { useEffect } from 'react'

export default function Scripts() {
  useEffect(() => {
    const script = document.createElement('script')
    script.setAttribute('data-account', 'YOUR_USERWAY_ID')
    script.setAttribute('src', 'https://cdn.userway.org/widget.js')
    script.setAttribute('data-position', '2')
    script.setAttribute('data-color', '#f0d5c8')
    script.setAttribute('data-size', 'medium')
    document.body.appendChild(script)
  }, [])

  return null
}
