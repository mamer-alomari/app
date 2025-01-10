import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Dashboard Page', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
  });

  it('renders welcome message', () => {
    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
  });

  it('renders all dashboard buttons', () => {
    expect(screen.getByText(/retrieve quote/i)).toBeInTheDocument();
    expect(screen.getByText(/track my job/i)).toBeInTheDocument();
    expect(screen.getByText(/billing/i)).toBeInTheDocument();
    expect(screen.getByText(/job schedule/i)).toBeInTheDocument();
    expect(screen.getByText(/customer information/i)).toBeInTheDocument();
  });

  it('navigates to correct routes when buttons are clicked', () => {
    const retrieveQuoteButton = screen.getByText(/retrieve quote/i).closest('button');
    fireEvent.click(retrieveQuoteButton!);
    expect(mockNavigate).toHaveBeenCalledWith('/retrieve-quote');

    const trackJobButton = screen.getByText(/track my job/i).closest('button');
    fireEvent.click(trackJobButton!);
    expect(mockNavigate).toHaveBeenCalledWith('/track-job/MOV-1234');

    const billingButton = screen.getByText(/billing/i).closest('button');
    fireEvent.click(billingButton!);
    expect(mockNavigate).toHaveBeenCalledWith('/billing');
  });

  it('handles logout', () => {
    const logoutButton = screen.getByText(/logout/i);
    fireEvent.click(logoutButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});