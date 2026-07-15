import { supabaseAdmin } from '../../../../lib/supabase'

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('admin_users')
    .select('id, email, created_at')
    .order('created_at', { ascending: true })

  return Response.json({ users: data || [] })
}

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    const { error } = await supabaseAdmin
      .from('admin_users')
      .insert({ email, password })

    if (error) return Response.json({ success: false, error: error.message })
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ success: false, error: error.message })
  }
}

export async function PATCH(request) {
  try {
    const { id, email, password } = await request.json()

    const updates = {}
    if (email) updates.email = email
    if (password) updates.password = password

    const { error } = await supabaseAdmin
      .from('admin_users')
      .update(updates)
      .eq('id', id)

    if (error) return Response.json({ success: false, error: error.message })
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ success: false, error: error.message })
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json()

    const { error } = await supabaseAdmin
      .from('admin_users')
      .delete()
      .eq('id', id)

    if (error) return Response.json({ success: false, error: error.message })
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ success: false, error: error.message })
  }
}
