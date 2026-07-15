import { supabaseAdmin } from '../../../../lib/supabase'

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    const { data, error } = await supabaseAdmin
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single()

    if (error || !data) {
      return Response.json({ success: false })
    }

    return Response.json({ success: true, user: { email: data.email } })
  } catch (error) {
    return Response.json({ success: false, error: error.message })
  }
}
