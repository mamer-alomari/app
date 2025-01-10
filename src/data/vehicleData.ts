import { Vehicle } from '../types/vehicle';

export const mockVehicles: Vehicle[] = [
  {
    id: 'V1',
    vehicleId: 'TRK-001',
    make: 'Ford',
    model: 'F-650',
    year: 2022,
    vin: '1HGCM82633A123456',
    licensePlate: 'ABC123',
    registrationNumber: 'REG123456',
    registrationExpiry: '2024-12-31',
    insurancePolicyNumber: 'INS123456',
    insuranceExpiry: '2024-12-31',
    capacity: '26ft - 10,000 lbs',
    currentMileage: 15000,
    lastServiceMileage: 12000,
    nextServiceMileage: 17000,
    fuelType: 'diesel',
    fuelCapacity: 100,
    currentFuelLevel: 75,
    status: 'active',
    maintenanceHistory: [
      {
        id: 'M1',
        serviceType: 'Oil Change',
        serviceDate: '2024-01-15',
        mileage: 12000,
        description: 'Regular oil change and inspection',
        totalCost: 150.00,
        performedBy: 'Service Center A',
        nextServiceMileage: 17000,
        status: 'completed'
      },
      {
        id: 'M2',
        serviceType: 'Brake Service',
        serviceDate: '2023-12-15',
        mileage: 10000,
        description: 'Front brake pad replacement',
        totalCost: 350.00,
        performedBy: 'Service Center A',
        nextServiceMileage: 25000,
        status: 'completed'
      },
      {
        id: 'M3',
        serviceType: 'Tire Rotation',
        serviceDate: '2023-11-01',
        mileage: 8000,
        description: 'Tire rotation and balance',
        totalCost: 80.00,
        performedBy: 'Service Center B',
        nextServiceMileage: 13000,
        status: 'completed'
      }
    ],
    fuelingHistory: [
      {
        id: 'F1',
        date: '2024-02-15',
        location: 'Shell Station #123',
        gallons: 50,
        pricePerGallon: 4.50,
        totalCost: 225.00,
        mileage: 14500,
        driver: 'John Driver'
      },
      {
        id: 'F2',
        date: '2024-02-10',
        location: 'Mobile Station #456',
        gallons: 45,
        pricePerGallon: 4.45,
        totalCost: 200.25,
        mileage: 14000,
        driver: 'David Wilson'
      },
      {
        id: 'F3',
        date: '2024-02-05',
        location: 'Shell Station #789',
        gallons: 48,
        pricePerGallon: 4.55,
        totalCost: 218.40,
        mileage: 13500,
        driver: 'John Driver'
      }
    ],
    documents: {
      registration: '/docs/vehicles/reg-trk-001.pdf',
      insurance: '/docs/vehicles/ins-trk-001.pdf'
    }
  },
  {
    id: 'V2',
    vehicleId: 'VAN-001',
    make: 'Mercedes-Benz',
    model: 'Sprinter',
    year: 2023,
    vin: '2MGCM82633A789012',
    licensePlate: 'XYZ789',
    registrationNumber: 'REG789012',
    registrationExpiry: '2024-12-31',
    insurancePolicyNumber: 'INS789012',
    insuranceExpiry: '2024-12-31',
    capacity: '16ft - 5,000 lbs',
    currentMileage: 8000,
    lastServiceMileage: 5000,
    nextServiceMileage: 10000,
    fuelType: 'diesel',
    fuelCapacity: 80,
    currentFuelLevel: 60,
    status: 'active',
    maintenanceHistory: [
      {
        id: 'M4',
        serviceType: 'Oil Change',
        serviceDate: '2024-02-01',
        mileage: 5000,
        description: 'Regular oil change and inspection',
        totalCost: 150.00,
        performedBy: 'Service Center B',
        nextServiceMileage: 10000,
        status: 'completed'
      },
      {
        id: 'M5',
        serviceType: 'Tire Replacement',
        serviceDate: '2024-01-15',
        mileage: 4500,
        description: 'All four tires replaced',
        totalCost: 800.00,
        performedBy: 'Service Center A',
        nextServiceMileage: 44500,
        status: 'completed'
      }
    ],
    fuelingHistory: [
      {
        id: 'F4',
        date: '2024-02-14',
        location: 'Shell Station #456',
        gallons: 40,
        pricePerGallon: 4.50,
        totalCost: 180.00,
        mileage: 7800,
        driver: 'David Wilson'
      },
      {
        id: 'F5',
        date: '2024-02-09',
        location: 'Mobile Station #789',
        gallons: 35,
        pricePerGallon: 4.45,
        totalCost: 155.75,
        mileage: 7300,
        driver: 'John Driver'
      }
    ],
    documents: {
      registration: '/docs/vehicles/reg-van-001.pdf',
      insurance: '/docs/vehicles/ins-van-001.pdf'
    }
  }
];