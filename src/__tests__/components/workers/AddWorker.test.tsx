import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddWorker from '../../../components/workers/AddWorker';
import { workerService } from '../../../services/api/worker.service';
import { toast } from 'react-hot-toast';

// Mock dependencies
vi.mock('react-hot-toast');
vi.mock('../../../services/api/worker.service');

describe('AddWorker Component', () => {
  it('renders add worker modal when open', () => {
    render(<AddWorker isOpen={true} onClose={() => {}} onSuccess={() => {}} />);
    
    expect(screen.getByText('Add New Worker')).toBeInTheDocument();
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
  });

  it('handles form submission correctly', async () => {
    const mockAddWorker = vi.fn().mockResolvedValue({
      id: 'W1',
      firstName: 'John',
      lastName: 'Doe'
    });
    
    (workerService.addWorker as any).mockImplementation(mockAddWorker);
    
    const onSuccessMock = vi.fn();
    const onCloseMock = vi.fn();

    render(
      <AddWorker 
        isOpen={true} 
        onClose={onCloseMock} 
        onSuccess={onSuccessMock} 
      />
    );

    // Fill form
    fireEvent.change(screen.getByLabelText('First Name'), {
      target: { value: 'John' }
    });
    fireEvent.change(screen.getByLabelText('Last Name'), {
      target: { value: 'Doe' }
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john.doe@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Phone'), {
      target: { value: '1234567890' }
    });

    // Submit form
    fireEvent.click(screen.getByText('Add Worker'));

    await waitFor(() => {
      expect(mockAddWorker).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890'
      });
      expect(onSuccessMock).toHaveBeenCalled();
      expect(onCloseMock).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Worker added successfully');
    });
  });

  it('validates required fields', async () => {
    render(<AddWorker isOpen={true} onClose={() => {}} onSuccess={() => {}} />);

    // Submit without filling required fields
    fireEvent.click(screen.getByText('Add Worker'));

    await waitFor(() => {
      expect(screen.getByText('First name is required')).toBeInTheDocument();
      expect(screen.getByText('Last name is required')).toBeInTheDocument();
    });
  });
}); 