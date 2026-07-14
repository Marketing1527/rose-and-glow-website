import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const { name, email, phone, service, date, message } = await request.json()

    // Send notification to salon owners
    await resend.emails.send({
      from: 'Rose & Glow <onboarding@resend.dev>',
      to: ['roseli.peraza09@gmail.com', 'dabdullegacy@gmail.com'],
      subject: `New Appointment Request — ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7a3030;">New Appointment Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Preferred Date:</strong> ${date}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>
      `
    })

    // Send confirmation email to client
    await resend.emails.send({
      from: 'Rose & Glow <onboarding@resend.dev>',
      to: email,
      subject: 'Your Appointment Request — Rose & Glow Hair Salon',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7a3030;">Thank you, ${name}!</h2>
          <p>We've received your appointment request and will confirm your booking within 24 hours.</p>
          <hr style="border: 1px solid #f5e8e3; margin: 20px 0;" />
          <h3 style="color: #7a3030;">Your Request Details</h3>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Preferred Date:</strong> ${date}</p>
          <p><strong>Message:</strong> ${message}</p>
          <hr style="border: 1px solid #f5e8e3; margin: 20px 0;" />
          <p>If you have any questions, feel free to reach out:</p>
          <p>📞 <a href="tel:17863574958">(786) 357-4958</a></p>
          <p>📍 1076 SW 67th Ave, Suite 201, Miami, FL 33144</p>
          <br/>
          <p style="color: #9a8585; font-size: 0.85rem;">We look forward to seeing you soon!</p>
          <p style="color: #7a3030; font-style: italic;">— The Rose & Glow Team</p>
        </div>
      `
    })

    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
