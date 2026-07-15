'use client'
import { useState } from 'react'

export default function AccessibilityBtn() {
  const [open, setOpen] = useState(false)
  const [fontSize, setFontSize] = useState(100)
  const [highContrast, setHighContrast] = useState(false)

  const increaseFontSize = () => {
    const newSize = Math.min(fontSize + 10, 130)
    setFontSize(newSize)
    document.documentElement.style.fontSize = `${newSize}%`
  }

  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize - 10, 80)
    setFontSize(newSize)
    document.documentElement.style.fontSize = `${newSize}%`
  }

  const resetFontSize = () => {
    setFontSize(100)
    document.documentElement.style.fontSize = '100%'
  }

  const toggleContrast = () => {
    setHighContrast(!highContrast)
    if (!highContrast) {
      document.body.style.filter = 'contrast(1.5)'
    } else {
      document.body.style.filter = ''
    }
  }

  return (
    <>
      {/* TOGGLE BUTTON */}
      <button
        className="accessibility-mobile-btn"
        aria-label="Accessibility Options"
        onClick={() => setOpen(!open)}
      >
        ♿
      </button>

      {/* PANEL */}
      {open && (
        <div style={{
          position: 'fixed',
          left: '1rem',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'white',
          border: '1px solid var(--rose-light)',
          borderRadius: '8px',
          padding: '1rem',
          zIndex: 1000,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.8rem',
          minWidth: '160px'
        }}>
          <p style={{fontSize:'0.7rem',letterSpacing:'0.15em',textTransform:'uppercase',color:'var(--gold)',margin:0}}>Accessibility</p>
          
          <button onClick={increaseFontSize} style={{background:'var(--cream)',border:'1px solid var(--rose-light)',padding:'0.5rem',borderRadius:'4px',cursor:'pointer',fontSize:'0.8rem',color:'var(--dark)'}}>
            A+ Increase Text
          </button>
          
          <button onClick={decreaseFontSize} style={{background:'var(--cream)',border:'1px solid var(--rose-light)',padding:'0.5rem',borderRadius:'4px',cursor:'pointer',fontSize:'0.8rem',color:'var(--dark)'}}>
            A- Decrease Text
          </button>
          
          <button onClick={resetFontSize} style={{background:'var(--cream)',border:'1px solid var(--rose-light)',padding:'0.5rem',borderRadius:'4px',cursor:'pointer',fontSize:'0.8rem',color:'var(--dark)'}}>
            Reset Text
          </button>
          
          <button onClick={toggleContrast} style={{background: highContrast ? 'var(--rose-deep)' : 'var(--cream)',border:'1px solid var(--rose-light)',padding:'0.5rem',borderRadius:'4px',cursor:'pointer',fontSize:'0.8rem',color: highContrast ? 'white' : 'var(--dark)'}}>
            {highContrast ? '◑ High Contrast On' : '◑ High Contrast'}
          </button>

          <button onClick={() => setOpen(false)} style={{background:'none',border:'none',cursor:'pointer',fontSize:'0.75rem',color:'var(--muted)',textAlign:'center'}}>
            Close ×
          </button>
        </div>
      )}
    </>
  )
}
