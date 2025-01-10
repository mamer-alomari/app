import { describe, it, expect, vi } from 'vitest';
import { authService } from '../../services/api/auth.service';

describe('Auth Service', () => {
  it('successfully logs in user', async () => {
    const credentials = {
      email: 'test@example.com',
      password: 'password123'
    };

    const response = await authService.login(credentials);

    expect(response).toHaveProperty('user');
    expect(response).toHaveProperty('token');
    expect(response.user).toHaveProperty('email', credentials.email);
  });

  it('successfully registers user', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User'
    };

    const response = await authService.register(userData);

    expect(response).toHaveProperty('user');
    expect(response).toHaveProperty('token');
    expect(response.user).toHaveProperty('name', userData.name);
  });

  it('successfully logs out user', async () => {
    const response = await authService.logout();
    expect(response).toBeUndefined();
  });
});