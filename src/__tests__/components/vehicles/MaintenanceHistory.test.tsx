import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MaintenanceHistory from '../../../components/vehicles/MaintenanceHistory';
import { maintenanceService } from '../../../services/api/maintenance.service';
import { Vehicle } from '../../../types/vehicle';
import { toast } from 'react-hot-toast';

// Mock dependencies
vi.mock('react-hot-toast');
vi.mock('../../../services/api/maintenance.service');

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
  maintenanceHistory: [
    {
      id: 'M1',
      serviceType: 'Oil Change',
      serviceDate: '2024-01-15',
      mileage: 5000,
      description: 'Regular oil change and inspection',
      totalCost: 150.00,
      performedBy: 'Service Center A',
      nextServiceMileage: 10000,
      status: 'completed'
    }
  ]
};

describe('MaintenanceHistory Component', () => {
  it('renders maintenance history', () => {
    render(<MaintenanceHistory vehicle={mockVehicle} />);
    
    expect(screen.getByText('Maintenance History')).toBeInTheDocument();
    expect(screen.getByText('Oil Change')).toBeInTheDocument();
    expect(screen.getByText('$150.00')).toBeInTheDocument();
  });

  it('opens add service modal', () => {
    render(<MaintenanceHistory vehicle={mockVehicle} />);
    
    fireEvent.click(screen.getByText('Add Service Record'));
    expect(screen.getByText('Add Service Record')).toBeInTheDocument();
    expect(screen.getByLabelText('Service Type')).toBeInTheDocument();
  });

  it('adds new maintenance record', async () => {
    const mockAddRecord = vi.fn().mockResolvedValue({
      id: 'M2',
      serviceType: 'Tire Rotation',
      status: 'completed'
    });
    
    (maintenanceService.addMaintenanceRecord as any).mockImplementation(mockAddRecord);

    render(<MaintenanceHistory vehicle={mockVehicle} />);
    
    // Open modal
    fireEvent.click(screen.getByText('Add Service Record'));

    // Fill form
    fireEvent.change(screen.getByLabelText('Service Type'), {
      target: { value: 'routine' }
    });
    fireEvent.change(screen.getByLabelText('Service Description'), {
      target: { value: 'Tire Rotation' }
    });

    // Submit form
    fireEvent.click(screen.getByText('Add Record'));

    await waitFor(() => {
      expect(mockAddRecord).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Maintenance record added successfully');
    });
  });

  it('submits new maintenance record through modal', async () => {
    render(<MaintenanceHistory vehicle={mockVehicle} />);
    
    // Open modal
    fireEvent.click(screen.getByText('Add Service Record'));
    
    // Fill form
    fireEvent.change(screen.getByLabelText('Service Type'), {
      target: { value: 'Oil Change' }
    });
    fireEvent.change(screen.getByLabelText('Date'), {
      target: { value: '2024-03-20' }
    });
    fireEvent.change(screen.getByLabelText('Mileage'), {
      target: { value: '5000' }
    });
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'Regular maintenance' }
    });

    // Submit form
    fireEvent.click(screen.getByText('Add Record'));

    await waitFor(() => {
      expect(screen.getByText('Service record added successfully')).toBeInTheDocument();
    });
  });
});