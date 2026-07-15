'use client'

export default function AccessibilityBtn() {
  return (
    <button
      className="accessibility-mobile-btn"
      aria-label="Accessibility Options"
      onClick={() => {
        if (window.UserWay) window.UserWay.open()
      }}
    >
      ♿
    </button>
  )
}
