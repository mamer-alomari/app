import { describe, it, expect, vi, beforeEach } from 'vitest';
import { supabase, testConnection } from '../../lib/supabase';
import { AppError } from '../../utils/errorHandler';

describe('Supabase Client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates a Supabase client', () => {
    expect(supabase).toBeDefined();
    expect(supabase.from).toBeDefined();
  });

  it('successfully tests connection', async () => {
    // Mock successful response
    vi.spyOn(supabase, 'from').mockImplementation(() => ({
      select: () => ({
        limit: () => Promise.resolve({ data: [], error: null })
      })
    } as any));

    const result = await testConnection();
    expect(result).toBe(true);
  });

  it('handles connection error', async () => {
    // Mock error response
    vi.spyOn(supabase, 'from').mockImplementation(() => ({
      select: () => ({
        limit: () => Promise.resolve({ 
          data: null, 
          error: { message: 'Connection failed' } 
        })
      })
    } as any));

    await expect(testConnection()).rejects.toThrow(AppError);
    await expect(testConnection()).rejects.toThrow('Failed to connect to Supabase');
  });
});