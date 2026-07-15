import { supabaseAdmin } from '../../../../lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET() {
  const { data } = await supabaseAdmin
    .from('campaigns')
    .select('*')
    .order('created_at', { ascending: false })

  return Response.json({ campaigns: data || [] })
}

export async function POST(request) {
  try {
    const { subject, preview, body, cta, coupon, theme } = await request.json()

    const themeColors = {
      gold: { primary: '#c9a96e', bg: '#fdf8f5', header: '#f5e8e3' },
      blush: { primary: '#a85b5b', bg: '#fff5f5', header: '#f5e8e3' },
      ivory: { primary: '#7a3030', bg: '#fffff0', header: '#f5f5dc' },
      midnight: { primary: '#ffffff', bg: '#1a1a2e', header: '#2a2a3a' }
    }

    const t = themeColors[theme] || themeColors.gold

    const { data: subscribers } = await supabaseAdmin
      .from('subscribers')
      .select('email, name')
      .eq('subscribed', true)

    let sentCount = 0

    for (const sub of subscribers) {
      await resend.emails.send({
        from: 'Rose & Glow <hello@roseandglowhair.com>',
        to: sub.email,
        subject,
        ...(preview && { headers: { 'X-Preview-Text': preview } }),
        html: `
          <div style="background:${t.bg};padding:40px 20px;font-family:Georgia,serif;">
            <div style="max-width:600px;margin:0 auto;background:white;border-radius:4px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
              <div style="background:${t.header};padding:40px;text-align:center;">
                <img src="https://roseandglowhair.com/logo.png" alt="Rose & Glow" style="height:80px;width:auto;" />
              </div>
              <div style="padding:40px;">
                <p style="color:#3a2a2a;font-size:15px;line-height:1.9;white-space:pre-wrap;">${body}</p>
                ${coupon ? `
                  <div style="background:${t.header};border:2px dashed ${t.primary};padding:16px;text-align:center;margin:24px 0;border-radius:4px;">
                    <p style="margin:0;font-size:12px;color:#9a8585;letter-spacing:2px;text-transform:uppercase;">Your Coupon Code</p>
                    <p style="margin:8px 0 0;font-size:24px;font-weight:bold;color:${t.primary};letter-spacing:4px;">${coupon}</p>
                  </div>
                ` : ''}
                ${cta ? `
                  <div style="text-align:center;margin-top:28px;">
                    <a href="https://roseandglowhair.com/contact" style="display:inline-block;background:${t.primary};color:white;padding:14px 32px;text-decoration:none;font-size:13px;letter-spacing:2px;text-transform:uppercase;border-radius:2px;">${cta}</a>
                  </div>
                ` : ''}
              </div>
              <div style="background:${t.header};padding:24px 40px;text-align:center;">
                <p style="color:#9a8585;font-size:12px;margin:0;">1076 SW 67th Ave, Suite 201, Miami, FL 33144</p>
                <p style="margin:8px 0 0;">
                  <a href="tel:17863574958" style="color:#9a8585;font-size:12px;text-decoration:none;">(786) 357-4958</a>
                </p>
                <p style="color:#9a8585;font-size:11px;margin:12px 0 0;">
                  <a href="https://roseandglowhair.com/unsubscribe?email=${sub.email}" style="color:#9a8585;">Unsubscribe</a>
                </p>
                <p style="color:${t.primary};font-style:italic;font-size:13px;margin:12px 0 0;">— The Rose & Glow Team</p>
              </div>
            </div>
          </div>
        `
      })
      sentCount++
    }

    await supabaseAdmin.from('campaigns').insert({
      subject,
      body,
      sent_at: new Date().toISOString(),
      sent_count: sentCount
    })

    return Response.json({ success: true, sentCount })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
