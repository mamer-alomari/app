import { companyService } from '../services/supabase/company.service';
import { workerService } from '../services/supabase/worker.service';
import { vehicleService } from '../services/supabase/vehicle.service';

export async function seedSupabaseData() {
  try {
    console.log('Starting Supabase data seeding...');

    // Create test company
    const company = await companyService.createCompany({
      name: 'Test Moving Company'
    });
    console.log('Created company:', company);

    // Create test worker
    const worker = await workerService.createWorker({
      company_id: company.id,
      worker_id: 'W001',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      phone: '555-0123',
      ssn: '123-45-6789',
      role: 'mover',
      status: 'active',
      hire_date: '2024-01-01',
      documents: {},
      pay_rate: { hourly: 15.00, overtime: 22.50 },
      work_hours: [],
      pay_stubs: [],
      permissions: {
        canAssignJobs: false,
        canAccessFinancials: false,
        canManageWorkers: false,
        canManageVehicles: false
      }
    });
    console.log('Created worker:', worker);

    // Create test vehicle
    const vehicle = await vehicleService.createVehicle({
      company_id: company.id,
      vehicle_id: 'V001',
      make: 'Ford',
      model: 'Transit',
      year: 2022,
      vin: '1FTBW2CM5NKA12345',
      license_plate: 'ABC123',
      registration_expiry: '2025-12-31',
      insurance_policy_number: 'INS123456',
      insurance_expiry: '2025-06-30',
      capacity: { weight: 3500, volume: 246 },
      mileage: 25000,
      status: 'active',
      maintenance_history: [],
      fueling_history: [],
      documents: {}
    });
    console.log('Created vehicle:', vehicle);

    console.log('Supabase data seeding completed successfully!');
    return { company, worker, vehicle };
  } catch (error) {
    console.error('Error seeding Supabase data:', error);
    throw error;
  }
} 