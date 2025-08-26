import { supabase } from '../../config/supabaseClient';
import type { Database } from '../../types/database';

type Worker = Database['public']['Tables']['workers']['Row'];
type WorkerInsert = Database['public']['Tables']['workers']['Insert'];
type WorkerUpdate = Database['public']['Tables']['workers']['Update'];

export class WorkerService {
  async createWorker(worker: WorkerInsert) {
    const { data, error } = await supabase
      .from('workers')
      .insert(worker)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getWorker(id: string) {
    const { data, error } = await supabase
      .from('workers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async updateWorker(id: string, updates: WorkerUpdate) {
    const { data, error } = await supabase
      .from('workers')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteWorker(id: string) {
    const { error } = await supabase
      .from('workers')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async getWorkersByCompany(companyId: string) {
    const { data, error } = await supabase
      .from('workers')
      .select('*')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async getAllWorkers() {
    const { data, error } = await supabase
      .from('workers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}

export const workerService = new WorkerService(); 