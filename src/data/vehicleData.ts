import { Vehicle } from '../types/vehicle';

export const mockVehicles: Vehicle[] = [
  {
    id: '44444444-4444-4444-4444-444444444444',
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
    mileage: 15000,
    status: 'active',
    maintenanceHistory: [
      {
        id: 'M1',
        serviceType: 'Oil Change',
        serviceDate: '2024-01-15',
        mileage: 12000,
        description: 'Regular oil change and inspection',
        totalCost: 150.0,
        performedBy: 'Service Center A',
        nextServiceMileage: 17000,
        status: 'completed'
      }
    ],
    fuelingHistory: [
      {
        id: 'F1',
        date: '2024-02-15',
        location: 'Shell Station #123',
        gallons: 50,
        pricePerGallon: 4.5,
        totalCost: 225.0,
        mileage: 14500,
        driver: 'John Doe',
        fuelType: 'diesel'
      }
    ],
    documents: {
      registration: '/docs/vehicles/reg-trk-001.pdf',
      insurance: '/docs/vehicles/ins-trk-001.pdf'
    }
  }
];