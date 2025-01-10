import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Welcome from '../../pages/Welcome';
import { ToastProvider } from '../../contexts/ToastContext';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Welcome Page', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <ToastProvider>
          <Welcome />
        </ToastProvider>
      </BrowserRouter>
    );
  });

  it('renders welcome message', () => {
    expect(screen.getByText(/moove/i)).toBeInTheDocument();
    expect(screen.getByText(/let's get you mooving/i)).toBeInTheDocument();
  });

  it('renders Get Started button', () => {
    const button = screen.getByText(/get started/i);
    expect(button).toBeInTheDocument();
  });

  it('renders Login button', () => {
    const button = screen.getByText(/log in/i);
    expect(button).toBeInTheDocument();
  });

  it('navigates to camera page on Get Started click', () => {
    const button = screen.getByText(/get started/i);
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith('/camera');
  });

  it('navigates to login page on Login click', () => {
    const button = screen.getByText(/log in/i);
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});