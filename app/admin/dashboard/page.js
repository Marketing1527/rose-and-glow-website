'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function Dashboard() {
  const [appointments, setAppointments] = useState([])
  const [subscribers, setSubscribers] = useState([])
  const [adminUsers, setAdminUsers] = useState([])
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('appointments')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [campaignSubject, setCampaignSubject] = useState('')
  const [campaignPreview, setCampaignPreview] = useState('')
  const [campaignBody, setCampaignBody] = useState('')
  const [campaignCta, setCampaignCta] = useState('')
  const [campaignCoupon, setCampaignCoupon] = useState('')
  const [campaignTheme, setCampaignTheme] = useState('gold')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [activeSubTab, setActiveSubTab] = useState('compose')
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [addingUser, setAddingUser] = useState(false)
  const [userAdded, setUserAdded] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [editEmail, setEditEmail] = useState('')
  const [editPassword, setEditPassword] = useState('')
  const [settingsMsg, setSettingsMsg] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    const [apptRes, subRes, usersRes, campRes] = await Promise.all([
      fetch('/api/admin/appointments'),
      fetch('/api/admin/subscribers'),
      fetch('/api/admin/settings'),
      fetch('/api/admin/campaigns')
    ])
    const apptData = await apptRes.json()
    const subData = await subRes.json()
    const usersData = await usersRes.json()
    const campData = await campRes.json()
    setAppointments(apptData.appointments || [])
    setSubscribers(subData.subscribers || [])
    setAdminUsers(usersData.users || [])
    setCampaigns(campData.campaigns || [])
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
      body: JSON.stringify({
        subject: campaignSubject,
        preview: campaignPreview,
        body: campaignBody,
        cta: campaignCta,
        coupon: campaignCoupon,
        theme: campaignTheme
      })
    })
    setSending(false)
    setSent(true)
    setCampaignSubject('')
    setCampaignPreview('')
    setCampaignBody('')
    setCampaignCta('')
    setCampaignCoupon('')
    fetchData()
    setTimeout(() => setSent(false), 3000)
  }

  const addUser = async () => {
    setAddingUser(true)
    const res = await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: newEmail, password: newPassword })
    })
    const data = await res.json()
    if (data.success) {
      setUserAdded(true)
      setNewEmail('')
      setNewPassword('')
      fetchData()
      setTimeout(() => setUserAdded(false), 3000)
    }
    setAddingUser(false)
  }

  const updateUser = async (id) => {
    const res = await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, email: editEmail, password: editPassword })
    })
    const data = await res.json()
    if (data.success) {
      setSettingsMsg('Updated successfully!')
      setEditingUser(null)
      setEditEmail('')
      setEditPassword('')
      fetchData()
      setTimeout(() => setSettingsMsg(''), 3000)
    }
  }

  const deleteUser = async (id) => {
    if (!confirm('Are you sure you want to remove this admin user?')) return
    await fetch('/api/admin/settings', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    fetchData()
  }

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Joined', 'Status']
    const rows = subscribers.map(s => [
      s.name || '',
      s.email,
      new Date(s.created_at).toLocaleDateString(),
      s.subscribed ? 'Active' : 'Unsubscribed'
    ])
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'subscribers.csv'
    a.click()
  }

  const themeColors = {
    gold: { primary: '#c9a96e', bg: '#fdf8f5', header: '#f5e8e3' },
    blush: { primary: '#a85b5b', bg: '#fff5f5', header: '#f5e8e3' },
    ivory: { primary: '#7a3030', bg: '#fffff0', header: '#f5f5dc' },
    midnight: { primary: '#ffffff', bg: '#1a1a2e', header: '#2a2a3a' }
  }

  const getEmailPreview = () => {
    const t = themeColors[campaignTheme]
    return `
      <div style="background:${t.bg};padding:40px 20px;font-family:Georgia,serif;">
        <div style="max-width:600px;margin:0 auto;background:white;border-radius:4px;overflow:hidden;">
          <div style="background:${t.header};padding:40px;text-align:center;">
            <img src="https://roseandglowhair.com/logo.png" alt="Rose & Glow" style="height:80px;width:auto;" />
          </div>
          <div style="padding:40px;">
            <p style="color:#3a2a2a;font-size:15px;line-height:1.9;white-space:pre-wrap;">${campaignBody || 'Your message will appear here...'}</p>
            ${campaignCoupon ? `<div style="background:${t.header};border:2px dashed ${t.primary};padding:16px;text-align:center;margin:24px 0;border-radius:4px;"><p style="margin:0;font-size:12px;color:#9a8585;letter-spacing:2px;text-transform:uppercase;">Your Coupon Code</p><p style="margin:8px 0 0;font-size:24px;font-weight:bold;color:${t.primary};letter-spacing:4px;">${campaignCoupon}</p></div>` : ''}
            ${campaignCta ? `<div style="text-align:center;margin-top:24px;"><a href="https://roseandglowhair.com/contact" style="display:inline-block;background:${t.primary};color:white;padding:14px 32px;text-decoration:none;font-size:13px;letter-spacing:2px;text-transform:uppercase;">${campaignCta}</a></div>` : ''}
          </div>
          <div style="background:${t.header};padding:24px;text-align:center;">
            <p style="color:#9a8585;font-size:12px;margin:0;">1076 SW 67th Ave, Suite 201, Miami, FL 33144</p>
            <p style="color:#9a8585;font-size:11px;margin:8px 0 0;"><a href="#" style="color:#9a8585;">Unsubscribe</a></p>
          </div>
        </div>
      </div>
    `
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

  const inputStyle = {
    width: '100%',
    border: 'none',
    borderBottom: '1px solid #f5e8e3',
    padding: '0.6rem 0',
    fontFamily: 'Jost, sans-serif',
    fontSize: '0.85rem',
    color: '#3a2a2a',
    background: 'transparent',
    outline: 'none',
    marginBottom: '1rem'
  }

  const btnStyle = (color = '#7a3030') => ({
    fontSize: '0.72rem',
    background: color,
    color: color === '#f5e8e3' ? '#7a3030' : 'white',
    border: 'none',
    padding: '0.5rem 1.2rem',
    cursor: 'pointer',
    borderRadius: '2px',
    fontFamily: 'Jost, sans-serif',
    letterSpacing: '0.1em'
  })

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
          <button onClick={() => router.push('/admin')} style={btnStyle()}>Sign Out</button>
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
        <div style={{ display: 'flex', gap: '0', marginBottom: '1.5rem', borderBottom: '1px solid #f5e8e3', overflowX: 'auto' }}>
          {['appointments', 'calendar', 'subscribers', 'campaigns', 'settings'].map(tab => (
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
              fontFamily: 'Jost, sans-serif',
              whiteSpace: 'nowrap'
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
                          <button onClick={() => updateStatus(apt.id, 'confirmed')} style={btnStyle('#4caf50')}>Confirm</button>
                          <button onClick={() => updateStatus(apt.id, 'cancelled')} style={btnStyle('#f44336')}>Cancel</button>
                        </>
                      )}
                      {apt.status === 'confirmed' && (
                        <button onClick={() => updateStatus(apt.id, 'cancelled')} style={btnStyle('#f44336')}>Cancel</button>
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
                <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))} style={btnStyle('#f5e8e3')}>← Prev</button>
                <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))} style={btnStyle('#f5e8e3')}>Next →</button>
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
                    <div key={day} style={{ background: 'white', minHeight: '80px', padding: '0.5rem' }}>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 300, color: '#1a1210', margin: 0 }}>Subscribers ({subscribers.length})</h2>
              <button onClick={exportCSV} style={btnStyle('#c9a96e')}>Export to CSV</button>
            </div>
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
                        <span style={{ fontSize: '0.65rem', background: sub.subscribed ? '#4caf5020' : '#f4433620', color: sub.subscribed ? '#4caf50' : '#f44336', padding: '0.2rem 0.6rem', borderRadius: '20px' }}>
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { label: 'Total Subscribers', value: subscribers.length, color: '#7a3030' },
                { label: 'Active', value: subscribers.filter(s => s.subscribed).length, color: '#4caf50' },
                { label: 'Campaigns Sent', value: campaigns.length, color: '#c9a96e' },
              ].map(stat => (
                <div key={stat.label} style={{ background: 'white', padding: '1.5rem', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', borderLeft: `3px solid ${stat.color}` }}>
                  <div style={{ fontSize: '2rem', fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9a8585', marginTop: '0.3rem' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0', marginBottom: '1.5rem', borderBottom: '1px solid #f5e8e3' }}>
              {['compose', 'history', 'subscribers'].map(t => (
                <button key={t} onClick={() => setActiveSubTab(t)} style={{
                  padding: '0.6rem 1.2rem', background: 'none', border: 'none',
                  borderBottom: activeSubTab === t ? '2px solid #7a3030' : '2px solid transparent',
                  color: activeSubTab === t ? '#7a3030' : '#9a8585',
                  cursor: 'pointer', fontSize: '0.72rem', letterSpacing: '0.15em',
                  textTransform: 'uppercase', fontFamily: 'Jost, sans-serif'
                }}>{t}</button>
              ))}
            </div>

            {activeSubTab === 'compose' && (
              <div style={{ display: 'grid', gridTemplateColumns: showPreview ? '1fr 1fr' : '1fr', gap: '2rem' }}>
                <div style={{ background: 'white', padding: '2rem', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 300, color: '#1a1210', margin: 0 }}>Compose Email</h3>
                    <button onClick={() => setShowPreview(!showPreview)} style={{ ...btnStyle('#f5e8e3'), fontSize: '0.7rem' }}>
                      {showPreview ? 'Hide Preview' : 'Preview Email'}
                    </button>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9a8585', display: 'block', marginBottom: '0.4rem' }}>Subject Line *</label>
                    <input style={inputStyle} type="text" value={campaignSubject} onChange={e => setCampaignSubject(e.target.value)} placeholder="e.g. Summer Special at Rose & Glow!" />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9a8585', display: 'block', marginBottom: '0.4rem' }}>Preview Text <span style={{ color: '#c9a96e' }}>(shown in inbox)</span></label>
                    <input style={inputStyle} type="text" value={campaignPreview} onChange={e => setCampaignPreview(e.target.value)} placeholder="Short preview shown before email is opened..." />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9a8585', display: 'block', marginBottom: '0.4rem' }}>Message Body *</label>
                    <textarea style={{ ...inputStyle, resize: 'vertical', height: '180px' }} value={campaignBody} onChange={e => setCampaignBody(e.target.value)} placeholder="Write your email message here..." />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9a8585', display: 'block', marginBottom: '0.4rem' }}>Call-to-Action Button <span style={{ color: '#c9a96e' }}>(optional)</span></label>
                    <input style={inputStyle} type="text" value={campaignCta} onChange={e => setCampaignCta(e.target.value)} placeholder="e.g. Book Now, Claim Offer..." />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9a8585', display: 'block', marginBottom: '0.4rem' }}>Coupon Code <span style={{ color: '#c9a96e' }}>(optional)</span></label>
                    <input style={inputStyle} type="text" value={campaignCoupon} onChange={e => setCampaignCoupon(e.target.value)} placeholder="e.g. GLOW20" />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9a8585', display: 'block', marginBottom: '0.8rem' }}>Email Theme</label>
                    <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                      {[
                        { key: 'gold', label: 'Gold', color: '#c9a96e' },
                        { key: 'blush', label: 'Blush Pink', color: '#a85b5b' },
                        { key: 'ivory', label: 'Ivory', color: '#7a3030' },
                        { key: 'midnight', label: 'Midnight', color: '#1a1210' },
                      ].map(t => (
                        <button key={t.key} onClick={() => setCampaignTheme(t.key)} style={{
                          padding: '0.5rem 1rem',
                          border: `2px solid ${campaignTheme === t.key ? t.color : '#f5e8e3'}`,
                          background: campaignTheme === t.key ? `${t.color}15` : 'white',
                          cursor: 'pointer', borderRadius: '4px', fontSize: '0.75rem',
                          color: t.color, fontFamily: 'Jost, sans-serif',
                          display: 'flex', alignItems: 'center', gap: '0.4rem'
                        }}>
                          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: t.color, display: 'inline-block' }} />
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {sent && <p style={{ color: '#4caf50', fontSize: '0.85rem', marginBottom: '1rem' }}>✓ Campaign sent successfully to {subscribers.filter(s => s.subscribed).length} subscribers!</p>}

                  <button onClick={sendCampaign} disabled={sending || !campaignSubject || !campaignBody} style={{ ...btnStyle(), width: '100%', padding: '1rem', letterSpacing: '0.2em', opacity: (!campaignSubject || !campaignBody) ? 0.6 : 1 }}>
                    {sending ? 'Sending...' : `Send to ${subscribers.filter(s => s.subscribed).length} Active Subscribers`}
                  </button>
                </div>

                {showPreview && (
                  <div style={{ background: 'white', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
                    <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #f5e8e3', background: '#faf8f6' }}>
                      <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9a8585', margin: 0 }}>Email Preview</p>
                      {campaignSubject && <p style={{ fontSize: '0.85rem', color: '#3a2a2a', margin: '0.3rem 0 0', fontWeight: 'bold' }}>{campaignSubject}</p>}
                      {campaignPreview && <p style={{ fontSize: '0.75rem', color: '#9a8585', margin: '0.2rem 0 0' }}>{campaignPreview}</p>}
                    </div>
                    <div style={{ height: '500px', overflow: 'auto' }} dangerouslySetInnerHTML={{ __html: getEmailPreview() }} />
                  </div>
                )}
              </div>
            )}

            {activeSubTab === 'history' && (
              <div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 300, color: '#1a1210', marginBottom: '1rem' }}>Campaign History ({campaigns.length})</h3>
                {campaigns.length === 0 && <p style={{ color: '#9a8585' }}>No campaigns sent yet.</p>}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {campaigns.map(c => (
                    <div key={c.id} style={{ background: 'white', padding: '1.2rem 1.5rem', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', borderLeft: '3px solid #c9a96e', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                      <div>
                        <div style={{ fontSize: '0.9rem', color: '#1a1210', fontWeight: 500, marginBottom: '0.2rem' }}>{c.subject}</div>
                        <div style={{ fontSize: '0.75rem', color: '#9a8585' }}>Sent {new Date(c.sent_at).toLocaleDateString()} · {c.sent_count} recipients</div>
                      </div>
                      <span style={{ fontSize: '0.65rem', background: '#4caf5015', color: '#4caf50', padding: '0.3rem 0.8rem', borderRadius: '20px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Sent</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSubTab === 'subscribers' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 300, color: '#1a1210', margin: 0 }}>Subscriber List ({subscribers.length})</h3>
                  <button onClick={exportCSV} style={btnStyle('#c9a96e')}>Export to CSV</button>
                </div>
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
                            <span style={{ fontSize: '0.65rem', background: sub.subscribed ? '#4caf5020' : '#f4433620', color: sub.subscribed ? '#4caf50' : '#f44336', padding: '0.2rem 0.6rem', borderRadius: '20px' }}>
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
          </div>
        )}

        {/* SETTINGS TAB */}
        {!loading && activeTab === 'settings' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 300, color: '#1a1210', marginBottom: '1rem' }}>Admin Users</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {adminUsers.map(user => (
                  <div key={user.id} style={{ background: 'white', padding: '1.2rem 1.5rem', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', borderLeft: '3px solid #c9a96e' }}>
                    {editingUser === user.id ? (
                      <div>
                        <input style={inputStyle} type="email" value={editEmail} onChange={e => setEditEmail(e.target.value)} placeholder="New email" />
                        <input style={inputStyle} type="password" value={editPassword} onChange={e => setEditPassword(e.target.value)} placeholder="New password" />
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => updateUser(user.id)} style={btnStyle('#4caf50')}>Save</button>
                          <button onClick={() => { setEditingUser(null); setEditEmail(''); setEditPassword('') }} style={btnStyle('#9a8585')}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '0.85rem', color: '#3a2a2a', marginBottom: '0.2rem' }}>{user.email}</div>
                          <div style={{ fontSize: '0.72rem', color: '#9a8585' }}>Added {new Date(user.created_at).toLocaleDateString()}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => { setEditingUser(user.id); setEditEmail(user.email) }} style={btnStyle('#c9a96e')}>Edit</button>
                          <button onClick={() => deleteUser(user.id)} style={btnStyle('#f44336')}>Remove</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {settingsMsg && <p style={{ color: '#4caf50', fontSize: '0.85rem' }}>✓ {settingsMsg}</p>}
              </div>
            </div>

            <div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 300, color: '#1a1210', marginBottom: '1rem' }}>Add New Admin</h2>
              <div style={{ background: 'white', padding: '2rem', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div>
                  <label style={{ fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9a8585', display: 'block', marginBottom: '0.4rem' }}>Email</label>
                  <input style={inputStyle} type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="admin@email.com" />
                </div>
                <div>
                  <label style={{ fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9a8585', display: 'block', marginBottom: '0.4rem' }}>Password</label>
                  <input style={inputStyle} type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Create a password" />
                </div>
                {userAdded && <p style={{ color: '#4caf50', fontSize: '0.85rem', marginBottom: '1rem' }}>✓ Admin user added!</p>}
                <button onClick={addUser} disabled={addingUser || !newEmail || !newPassword} style={{ ...btnStyle(), width: '100%', padding: '1rem', letterSpacing: '0.2em' }}>
                  {addingUser ? 'Adding...' : 'Add Admin User'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
