import { createClient } from '@supabase/supabase-js';
import { AppError } from '../utils/errorHandler';

// Validate environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new AppError(
    'Missing Supabase configuration. Please check your environment variables.',
    'SUPABASE_CONFIG_ERROR'
  );
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test connection function
export async function testConnection() {
  try {
    const { error } = await supabase.from('companies').select('id').limit(1);
    
    if (error) {
      throw new AppError(
        'Failed to connect to Supabase: ' + error.message,
        'SUPABASE_CONNECTION_ERROR'
      );
    }
    
    return true;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Failed to establish Supabase connection',
      'SUPABASE_CONNECTION_ERROR'
    );
  }
}