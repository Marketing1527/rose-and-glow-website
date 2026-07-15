import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const { name, email, phone, service, date, time, message } = await request.json()

    const emailTemplate = (title, bodyContent) => `
      <div style="background-color:#fdf8f5;padding:40px 20px;font-family:Georgia,serif;">
        <div style="max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:4px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
          
          <!-- HEADER -->
          <div style="background-color:#f5e8e3;padding:40px 40px 30px;text-align:center;">
            <img src="https://roseglowwebsite.vercel.app/logo.png" alt="Rose & Glow" style="height:100px;width:auto;margin-bottom:10px;" />
            <p style="color:#9a8585;font-size:12px;letter-spacing:3px;text-transform:uppercase;margin:0;">Luxury Hair Salon</p>
          </div>

          <!-- BODY -->
          <div style="padding:40px;">
            <h2 style="color:#7a3030;font-size:26px;font-weight:normal;margin-bottom:8px;">${title}</h2>
            ${bodyContent}
          </div>

          <!-- FOOTER -->
          <div style="background-color:#f5e8e3;padding:30px 40px;text-align:center;">
            <p style="color:#9a8585;font-size:12px;margin:0 0 8px;">1076 SW 67th Ave, Suite 201, Miami, FL 33144</p>
            <p style="margin:0;">
              <a href="tel:17863574958" style="color:#a85b5b;font-size:12px;text-decoration:none;">(786) 357-4958</a>
              &nbsp;&nbsp;·&nbsp;&nbsp;
              <a href="mailto:hello@roseandglow.com" style="color:#a85b5b;font-size:12px;text-decoration:none;">hello@roseandglow.com</a>
            </p>
            <p style="color:#c9a96e;font-style:italic;font-size:13px;margin:16px 0 0;">— The Rose & Glow Team</p>
          </div>

        </div>
      </div>
    `

    // Email to salon owners
    await resend.emails.send({
      from: 'Rose & Glow <hello@roseandglowhair.com>',
to: ['roseli.peraza09@gmail.com', 'dabdullegacy@gmail.com'],
      subject: `New Appointment Request — ${service}`,
      html: emailTemplate(
        `New Appointment Request`,
        `
        <p style="color:#3a2a2a;font-size:15px;line-height:1.8;margin-bottom:24px;">A new client has requested an appointment. Details below:</p>
        <div style="background:#fdf8f5;border-left:3px solid #c9a96e;padding:20px 24px;margin-bottom:24px;border-radius:2px;">
          <p style="margin:0 0 10px;color:#3a2a2a;font-size:14px;"><strong>Name:</strong> ${name}</p>
          <p style="margin:0 0 10px;color:#3a2a2a;font-size:14px;"><strong>Email:</strong> ${email}</p>
          <p style="margin:0 0 10px;color:#3a2a2a;font-size:14px;"><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p style="margin:0 0 10px;color:#3a2a2a;font-size:14px;"><strong>Service:</strong> ${service}</p>
          <p style="margin:0 0 10px;color:#3a2a2a;font-size:14px;"><strong>Preferred Date:</strong> ${date || 'Not specified'} at ${time || 'Not specified'}</p>
          <p style="margin:0;color:#3a2a2a;font-size:14px;"><strong>Message:</strong> ${message || 'No message'}</p>
        </div>
        <a href="mailto:${email}" style="display:inline-block;background-color:#7a3030;color:#ffffff;padding:12px 28px;text-decoration:none;font-size:13px;letter-spacing:2px;text-transform:uppercase;border-radius:2px;">Reply to Client</a>
        `
      )
    })

    // Confirmation email to client
    await resend.emails.send({
      from: 'Rose & Glow <hello@roseandglowhair.com>',
to: email,
      subject: 'Your Appointment Request — Rose & Glow Hair Salon',
      html: emailTemplate(
        `Thank you, ${name}!`,
        `
        <p style="color:#3a2a2a;font-size:15px;line-height:1.8;margin-bottom:24px;">We've received your appointment request and will confirm your booking within 24 hours. We can't wait to see you!</p>
        <div style="background:#fdf8f5;border-left:3px solid #c9a96e;padding:20px 24px;margin-bottom:24px;border-radius:2px;">
          <p style="color:#9a8585;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin:0 0 12px;">Your Request Details</p>
          <p style="margin:0 0 10px;color:#3a2a2a;font-size:14px;"><strong>Service:</strong> ${service}</p>
          <p style="margin:0 0 10<p style="margin:0 0 10px;color:#3a2a2a;font-size:14px;"><strong>Preferred Date:</strong> ${date || 'Not specified'} at ${time || 'Not specified'}</p>
          <p style="margin:0;color:#3a2a2a;font-size:14px;"><strong>Message:</strong> ${message || 'No message'}</p>
        </div>
        <p style="color:#9a8585;font-size:13px;line-height:1.8;">Have questions? We're here for you:</p>
        <p style="font-size:14px;margin:4px 0;">
          <a href="tel:17863574958" style="color:#a85b5b;text-decoration:none;">📞 (786) 357-4958</a>
        </p>
        <p style="font-size:14px;margin:4px 0;">
          <a href="https://maps.google.com/?q=1076+SW+67th+Ave+Suite+201+Miami+FL+33144" style="color:#a85b5b;text-decoration:none;">📍 1076 SW 67th Ave, Suite 201, Miami, FL 33144</a>
        </p>
        `
      )
    })

    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
