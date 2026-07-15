import { supabaseAdmin } from '../../../../lib/supabase'

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('appointments')
    .select('*')
    .order('created_at', { ascending: false })

  return Response.json({ appointments: data || [] })
}

export async function PATCH(request) {
  const { id, status } = await request.json()

  const { error } = await supabaseAdmin
    .from('appointments')
    .update({ status })
    .eq('id', id)

  return Response.json({ success: !error })
}
