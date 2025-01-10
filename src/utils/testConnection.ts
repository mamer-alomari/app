import { testConnection } from '../lib/supabase';
import { toast } from 'react-hot-toast';

export async function validateSupabaseConnection() {
  try {
    await testConnection();
    toast.success('Successfully connected to Supabase');
    return true;
  } catch (error) {
    toast.error('Failed to connect to Supabase. Please check your configuration.');
    console.error('Supabase connection error:', error);
    return false;
  }
}