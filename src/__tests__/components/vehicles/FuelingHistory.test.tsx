import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FuelingHistory from '../../../components/vehicles/FuelingHistory';
import { Vehicle } from '../../../types/vehicle';

const mockVehicle: Vehicle = {
  id: 'V1',
  vehicleId: 'TRK-001',
  make: 'Ford',
  model: 'F-650',
  year: 2022,
  vin: '1HGCM82633A123456',
  licensePlate: 'ABC123',
  registrationExpiry: '2024-12-31',
  insurancePolicyNumber: 'INS123456',
  insuranceExpiry: '2024-12-31',
  capacity: '26ft - 10,000 lbs',
  status: 'active',
  fuelingHistory: [
    {
      id: 'F1',
      date: '2024-02-15',
      location: 'Shell Station #123',
      gallons: 50,
      pricePerGallon: 4.50,
      totalCost: 225.00,
      mileage: 5000,
      driver: 'John Driver'
    }
  ]
};

describe('FuelingHistory Component', () => {
  it('renders fueling history', () => {
    render(<FuelingHistory vehicle={mockVehicle} />);
    
    expect(screen.getByText('Fueling History')).toBeInTheDocument();
    expect(screen.getByText('Shell Station #123')).toBeInTheDocument();
    expect(screen.getByText('$225.00')).toBeInTheDocument();
  });

  it('opens add fuel record modal', () => {
    render(<FuelingHistory vehicle={mockVehicle} />);
    
    fireEvent.click(screen.getByText('Add Fuel Record'));
    expect(screen.getByText('Add Fuel Record')).toBeInTheDocument();
    expect(screen.getByLabelText('Location')).toBeInTheDocument();
  });

  it('displays fuel record details', () => {
    render(<FuelingHistory vehicle={mockVehicle} />);
    
    expect(screen.getByText('50 gal')).toBeInTheDocument();
    expect(screen.getByText('Driver: John Driver')).toBeInTheDocument();
    expect(screen.getByText('$4.50/gal')).toBeInTheDocument();
  });
});