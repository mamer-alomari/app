import { supabase } from '../../config/supabaseClient';
import type { Database } from '../../types/database';

type Marketplace = Database['public']['Tables']['marketplace']['Row'];
type MarketplaceInsert = Database['public']['Tables']['marketplace']['Insert'];
type MarketplaceUpdate = Database['public']['Tables']['marketplace']['Update'];

export class MarketplaceService {
  async createBid(bid: MarketplaceInsert) {
    const { data, error } = await supabase
      .from('marketplace')
      .insert(bid)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getBid(id: string) {
    const { data, error } = await supabase
      .from('marketplace')
      .select(`
        *,
        quotes(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async updateBid(id: string, updates: MarketplaceUpdate) {
    const { data, error } = await supabase
      .from('marketplace')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async acceptBid(id: string) {
    const { data, error } = await supabase
      .from('marketplace')
      .update({
        status: 'accepted',
        accepted_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async rejectBid(id: string) {
    const { data, error } = await supabase
      .from('marketplace')
      .update({
        status: 'rejected',
        rejected_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getBidsByQuote(quoteId: string) {
    const { data, error } = await supabase
      .from('marketplace')
      .select(`
        *,
        companies(name)
      `)
      .eq('quote_id', quoteId)
      .order('bid_amount', { ascending: true });

    if (error) throw error;
    return data;
  }

  async getBidsByCompany(companyId: string) {
    const { data, error } = await supabase
      .from('marketplace')
      .select(`
        *,
        quotes(*)
      `)
      .eq('company_id', companyId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async getOpenBids() {
    const { data, error } = await supabase
      .from('marketplace')
      .select(`
        *,
        quotes(*),
        companies(name)
      `)
      .eq('status', 'open')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}

export const marketplaceService = new MarketplaceService(); 