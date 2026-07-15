'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function Dashboard() {
  const [appointments, setAppointments] = useState([])
  const [subscribers, setSubscribers] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('appointments')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [campaignSubject, setCampaignSubject] = useState('')
  const [campaignBody, setCampaignBody] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    const [apptRes, subRes] = await Promise.all([
      fetch('/api/admin/appointments'),
      fetch('/api/admin/subscribers')
    ])
    const apptData = await apptRes.json()
    const subData = await subRes.json()
    setAppointments(apptData.appointments || [])
    setSubscribers(subData.subscribers || [])
    setLoading(false)
  }

  const updateStatus = async (id, status) => {
    await fetch('/api/admin/appointments', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    })
    fetchData()
  }

  const sendCampaign = async () => {
    setSending(true)
    await fetch('/api/admin/campaigns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject: campaignSubject, body: campaignBody })
    })
    setSending(false)
    setSent(true)
    setCampaignSubject('')
    setCampaignBody('')
    setTimeout(() => setSent(false), 3000)
  }

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    return { firstDay, daysInMonth }
  }

  const getAppointmentsForDay = (day) => {
    const year = selectedDate.getFullYear()
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
    const dayStr = String(day).padStart(2, '0')
    const dateStr = `${year}-${month}-${dayStr}`
    return appointments.filter(a => a.date === dateStr)
  }

  const { firstDay, daysInMonth } = getDaysInMonth(selectedDate)

  const statusColor = (status) => {
    if (status === 'confirmed') return '#4caf50'
    if (status === 'cancelled') return '#f44336'
    return '#c9a96e'
  }

  const pendingCount = appointments.filter(a => a.status === 'pending').length
  const confirmedCount = appointments.filter(a => a.status === 'confirmed').length

  return (
    <div className="admin-page" style={{ minHeight: '100vh', background: '#faf8f6', fontFamily: 'Jost, sans-serif' }}>
      {/* ADMIN NAV */}
      <nav style={{ background: 'white', padding: '0.8rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f5e8e3', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Image src="/logo.png" alt="Rose & Glow" width={120} height={40} style={{ height: '40px', width: 'auto' }} />
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e' }}>Admin</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link href="/" style={{ fontSize: '0.75rem', color: '#9a8585', textDecoration: 'none' }}>View Site</Link>
          <button onClick={() => router.push('/admin')} style={{ fontSize: '0.75rem', background: '#7a3030', color: 'white', border: 'none', padding: '0.4rem 1rem', cursor: 'pointer', borderRadius: '2px' }}>Sign Out</button>
        </div>
      </nav>

      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>

        {/* STATS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total Appointments', value: appointments.length, color: '#7a3030' },
            { label: 'Pending', value: pendingCount, color: '#c9a96e' },
            { label: 'Confirmed', value: confirmedCount, color: '#4caf50' },
            { label: 'Subscribers', value: subscribers.length, color: '#a85b5b' },
          ].map(stat => (
            <div key={stat.label} style={{ background: 'white', padding: '1.5rem', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', borderLeft: `3px solid ${stat.color}` }}>
              <div style={{ fontSize: '2rem', fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9a8585', marginTop: '0.3rem' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div style={{ display: 'flex', gap: '0', marginBottom: '1.5rem', borderBottom: '1px solid #f5e8e3' }}>
          {['appointments', 'calendar', 'subscribers', 'campaigns'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '0.8rem 1.5rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab ? '2px solid #7a3030' : '2px solid transparent',
              color: activeTab === tab ? '#7a3030' : '#9a8585',
              cursor: 'pointer',
              fontSize: '0.72rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontFamily: 'Jost, sans-serif'
            }}>
              {tab}
            </button>
          ))}
        </div>

        {loading && <p style={{ color: '#9a8585', fontSize: '0.85rem' }}>Loading...</p>}

        {/* APPOINTMENTS TAB */}
        {!loading && activeTab === 'appointments' && (
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 300, color: '#1a1210', marginBottom: '1rem' }}>All Appointments</h2>
            {appointments.length === 0 && <p style={{ color: '#9a8585' }}>No appointments yet.</p>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {appointments.map(apt => (
                <div key={apt.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', borderLeft: `3px solid ${statusColor(apt.status)}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: '#1a1210', marginBottom: '0.3rem' }}>{apt.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#9a8585', marginBottom: '0.2rem' }}>📧 {apt.email} · 📞 {apt.phone || 'N/A'}</div>
                      <div style={{ fontSize: '0.8rem', color: '#9a8585', marginBottom: '0.2rem' }}>✦ {apt.service} · 📅 {apt.date} at {apt.time}</div>
                      {apt.message && <div style={{ fontSize: '0.8rem', color: '#9a8585' }}>💬 {apt.message}</div>}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: statusColor(apt.status), background: `${statusColor(apt.status)}15`, padding: '0.3rem 0.8rem', borderRadius: '20px' }}>
                        {apt.status}
                      </span>
                      {apt.status === 'pending' && (
                        <>
                          <button onClick={() => updateStatus(apt.id, 'confirmed')} style={{ fontSize: '0.72rem', background: '#4caf50', color: 'white', border: 'none', padding: '0.4rem 1rem', cursor: 'pointer', borderRadius: '2px' }}>Confirm</button>
                          <button onClick={() => updateStatus(apt.id, 'cancelled')} style={{ fontSize: '0.72rem', background: '#f44336', color: 'white', border: 'none', padding: '0.4rem 1rem', cursor: 'pointer', borderRadius: '2px' }}>Cancel</button>
                        </>
                      )}
                      {apt.status === 'confirmed' && (
                        <button onClick={() => updateStatus(apt.id, 'cancelled')} style={{ fontSize: '0.72rem', background: '#f44336', color: 'white', border: 'none', padding: '0.4rem 1rem', cursor: 'pointer', borderRadius: '2px' }}>Cancel</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CALENDAR TAB */}
        {!loading && activeTab === 'calendar' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 300, color: '#1a1210' }}>
                {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h2>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))} style={{ background: '#f5e8e3', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '2px', color: '#7a3030' }}>← Prev</button>
                <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))} style={{ background: '#f5e8e3', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '2px', color: '#7a3030' }}>Next →</button>
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', background: '#7a3030' }}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} style={{ padding: '0.8rem', textAlign: 'center', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'white', textTransform: 'uppercase' }}>{day}</div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', background: '#f5e8e3' }}>
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} style={{ background: '#faf8f6', minHeight: '80px' }} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1
                  const dayApts = getAppointmentsForDay(day)
                  const isToday = new Date().getDate() === day && new Date().getMonth() === selectedDate.getMonth() && new Date().getFullYear() === selectedDate.getFullYear()
                  return (
                    <div key={day} style={{ background: 'white', minHeight: '80px', padding: '0.5rem', position: 'relative' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: isToday ? 'bold' : 'normal', color: isToday ? '#7a3030' : '#3a2a2a', marginBottom: '0.3rem' }}>{day}</div>
                      {dayApts.map(apt => (
                        <div key={apt.id} style={{ fontSize: '0.65rem', background: `${statusColor(apt.status)}20`, color: statusColor(apt.status), padding: '0.2rem 0.4rem', borderRadius: '2px', marginBottom: '0.2rem', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                          {apt.time} {apt.name}
                        </div>
                      ))}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* SUBSCRIBERS TAB */}
        {!loading && activeTab === 'subscribers' && (
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 300, color: '#1a1210', marginBottom: '1rem' }}>Subscribers ({subscribers.length})</h2>
            {subscribers.length === 0 && <p style={{ color: '#9a8585' }}>No subscribers yet.</p>}
            <div style={{ background: 'white', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f5e8e3' }}>
                    <th style={{ padding: '0.8rem 1rem', textAlign: 'left', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9a8585' }}>Name</th>
                    <th style={{ padding: '0.8rem 1rem', textAlign: 'left', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9a8585' }}>Email</th>
                    <th style={{ padding: '0.8rem 1rem', textAlign: 'left', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9a8585' }}>Joined</th>
                    <th style={{ padding: '0.8rem 1rem', textAlign: 'left', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9a8585' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((sub, i) => (
                    <tr key={sub.id} style={{ borderBottom: '1px solid #f5e8e3', background: i % 2 === 0 ? 'white' : '#faf8f6' }}>
                      <td style={{ padding: '0.8rem 1rem', fontSize: '0.85rem', color: '#3a2a2a' }}>{sub.name || '—'}</td>
                      <td style={{ padding: '0.8rem 1rem', fontSize: '0.85rem', color: '#3a2a2a' }}>{sub.email}</td>
                      <td style={{ padding: '0.8rem 1rem', fontSize: '0.8rem', color: '#9a8585' }}>{new Date(sub.created_at).toLocaleDateString()}</td>
                      <td style={{ padding: '0.8rem 1rem' }}>
                        <span style={{ fontSize: '0.65rem', background: sub.subscribed ? '#4caf5020' : '#f4433620', color: sub.subscribed ? '#4caf50' : '#f44336', padding: '0.2rem 0.6rem', borderRadius: '20px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                          {sub.subscribed ? 'Active' : 'Unsubscribed'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CAMPAIGNS TAB */}
        {!loading && activeTab === 'campaigns' && (
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 300, color: '#1a1210', marginBottom: '1rem' }}>Email Campaign</h2>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', maxWidth: '700px' }}>
              <p style={{ fontSize: '0.8rem', color: '#9a8585', marginBottom: '1.5rem' }}>Send an email to all {subscribers.filter(s => s.subscribed).length} active subscribers.</p>
              <div className="form-row">
                <label className="form-label">Subject</label>
                <input className="form-input" type="text" value={campaignSubject} onChange={e => setCampaignSubject(e.target.value)} placeholder="e.g. Summer Special at Rose & Glow!" />
              </div>
              <div className="form-row">
                <label className="form-label">Message</label>
                <textarea className="form-input" rows={8} value={campaignBody} onChange={e => setCampaignBody(e.target.value)} placeholder="Write your email message here..." style={{ resize: 'vertical' }} />
              </div>
              {sent && <p style={{ color: '#4caf50', fontSize: '0.85rem', marginBottom: '1rem' }}>✓ Campaign sent successfully!</p>}
              <button onClick={sendCampaign} disabled={sending || !campaignSubject || !campaignBody} className="form-submit">
                {sending ? 'Sending...' : `Send to ${subscribers.filter(s => s.subscribed).length} Subscribers`}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
