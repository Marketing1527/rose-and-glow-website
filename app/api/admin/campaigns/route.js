import { supabaseAdmin } from '../../../../lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const { subject, body } = await request.json()

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
        html: `
          <div style="background-color:#fdf8f5;padding:40px 20px;font-family:Georgia,serif;">
            <div style="max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:4px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
              <div style="background-color:#f5e8e3;padding:40px;text-align:center;">
                <img src="https://roseandglowhair.com/logo.png" alt="Rose & Glow" style="height:80px;width:auto;" />
              </div>
              <div style="padding:40px;">
                <p style="color:#3a2a2a;font-size:15px;line-height:1.9;white-space:pre-wrap;">${body}</p>
              </div>
              <div style="background-color:#f5e8e3;padding:30px 40px;text-align:center;">
                <a href="https://roseandglowhair.com/contact" style="display:inline-block;background:#7a3030;color:white;padding:12px 28px;text-decoration:none;font-size:13px;letter-spacing:2px;text-transform:uppercase;margin-bottom:16px;">Book Now</a>
                <p style="color:#9a8585;font-size:12px;margin:8px 0;">1076 SW 67th Ave, Suite 201, Miami, FL 33144</p>
                <p style="color:#9a8585;font-size:11px;margin:8px 0;">
                  <a href="https://roseandglowhair.com/unsubscribe?email=${sub.email}" style="color:#9a8585;">Unsubscribe</a>
                </p>
              </div>
            </div>
          </div>
        `
      })
      sentCount++
    }

    await supabaseAdmin.from('campaigns').insert({
      subject, body, sent_at: new Date().toISOString(), sent_count: sentCount
    })

    return Response.json({ success: true, sentCount })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
