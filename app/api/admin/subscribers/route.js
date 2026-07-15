import { supabaseAdmin } from '../../../../lib/supabase'

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('subscribers')
    .select('*')
    .order('created_at', { ascending: false })

  return Response.json({ subscribers: data || [] })
}
