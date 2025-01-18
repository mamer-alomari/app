# Types

## Equipment Types

- **equipment.ts**
  - **Equipment**: Represents a piece of equipment in the system.
    - **Fields**:
      - `id`: Unique identifier for the equipment.
      - `providerId`: ID of the provider who owns the equipment.
      - `name`: Name of the equipment.
      - `type`: Type/category of the equipment.
      - `serialNumber`: Optional serial number for the equipment.
      - `status`: Current status of the equipment (e.g., available, in use).
      - `condition`: Current condition of the equipment (e.g., new, good).
      - `lastMaintenanceDate`: Date of the last maintenance performed.
      - `nextMaintenanceDate`: Scheduled date for the next maintenance.
      - `notes`: Additional notes about the equipment.
      - `createdAt`: Timestamp when the equipment was created.
      - `updatedAt`: Timestamp when the equipment was last updated.

  - **EquipmentAssignment**: Represents an assignment of equipment to a job.
    - **Fields**:
      - `id`: Unique identifier for the assignment.
      - `equipmentId`: ID of the assigned equipment.
      - `jobId`: ID of the job to which the equipment is assigned.
      - `assignedBy`: ID of the user who assigned the equipment.
      - `assignedAt`: Timestamp when the equipment was assigned.
      - `unassignedBy`: ID of the user who unassigned the equipment.
      - `unassignedAt`: Timestamp when the equipment was unassigned.

  - **EquipmentMaintenance**: Represents a maintenance record for equipment.
    - **Fields**:
      - `id`: Unique identifier for the maintenance record.
      - `equipmentId`: ID of the equipment being maintained.
      - `maintenanceDate`: Date when the maintenance was performed.
      - `maintenanceType`: Type of maintenance performed.
      - `description`: Description of the maintenance work.
      - `performedBy`: ID of the user who performed the maintenance.
      - `notes`: Additional notes about the maintenance.
      - `createdAt`: Timestamp when the maintenance record was created.
      - `updatedAt`: Timestamp when the maintenance record was last updated.

## Worker Types

- **worker.ts**
  - **Worker**: Represents a worker in the system.
    - **Fields**:
      - `id`: Unique identifier for the worker.
      - `workerId`: Custom identifier for the worker.
      - `firstName`: First name of the worker.
      - `lastName`: Last name of the worker.
      - `email`: Email address of the worker.
      - `phone`: Phone number of the worker.
      - `ssn`: Social Security Number of the worker.
      - `role`: Role of the worker (e.g., mover, driver).
      - `status`: Employment status of the worker (e.g., active, inactive).
      - `hireDate`: Date when the worker was hired.
      - `documents`: Collection of document paths related to the worker.
      - `payRate`: Pay rate details for the worker.
      - `workHours`: Array of work hours records.
      - `payStubs`: Array of pay stub records.
      - `permissions`: Permissions assigned to the worker.
      - `supervisor`: ID of the worker's supervisor.

  - **WorkerRole**: Enum type representing possible roles for a worker.
    - **Values**: 'mover', 'driver', 'foreman', 'manager'.

  - **WorkerStatus**: Enum type representing possible employment statuses for a worker.
    - **Values**: 'active', 'inactive'.

  - **WorkerDocuments**: Represents document paths related to a worker.
    - **Fields**:
      - `identification`: Path to the identification document.
      - `ssnCard`: Path to the Social Security Number card.
      - `driversLicense`: Optional path to the driver's license.

  - **PayRate**: Represents pay rate details for a worker.
    - **Fields**:
      - `hourly`: Hourly pay rate.
      - `overtime`: Overtime pay rate.

  - **WorkerPermissions**: Represents permissions assigned to a worker.
    - **Fields**:
      - `canAssignJobs`: Whether the worker can assign jobs.
      - `canAccessFinancials`: Whether the worker can access financial information.
      - `canManageWorkers`: Whether the worker can manage other workers.
      - `canManageVehicles`: Whether the worker can manage vehicles.

## Vehicle Types

- **vehicle.ts**
  - **Vehicle**: Represents a vehicle in the system.
    - **Fields**:
      - `id`: Unique identifier for the vehicle.
      - `vehicleId`: Custom identifier for the vehicle.
      - `make`: Make of the vehicle.
      - `model`: Model of the vehicle.
      - `year`: Year of manufacture.
      - `vin`: Vehicle Identification Number.
      - `licensePlate`: License plate number.
      - `registrationExpiry`: Expiry date of the vehicle's registration.
      - `insurancePolicyNumber`: Insurance policy number.
      - `insuranceExpiry`: Expiry date of the vehicle's insurance.
      - `capacity`: Capacity details of the vehicle.
      - `mileage`: Current mileage of the vehicle.
      - `status`: Current status of the vehicle (e.g., active, maintenance).
      - `maintenanceHistory`: Array of maintenance records.
      - `fuelingHistory`: Array of fueling records.
      - `documents`: Collection of document paths related to the vehicle.

  - **MaintenanceRecord**: Represents a maintenance record for a vehicle.
    - **Fields**:
      - `id`: Unique identifier for the maintenance record.
      - `serviceType`: Type of service performed.
      - `serviceDate`: Date when the service was performed.
      - `mileage`: Mileage at the time of service.
      - `description`: Description of the service.
      - `totalCost`: Total cost of the service.
      - `performedBy`: Name of the service provider.
      - `nextServiceMileage`: Mileage for the next scheduled service.
      - `status`: Status of the maintenance (e.g., scheduled, completed).

  - **FuelingRecord**: Represents a fueling record for a vehicle.
    - **Fields**:
      - `id`: Unique identifier for the fueling record.
      - `date`: Date of fueling.
      - `location`: Location where fueling occurred.
      - `gallons`: Number of gallons fueled.
      - `pricePerGallon`: Price per gallon.
      - `totalCost`: Total cost of fueling.
      - `mileage`: Mileage at the time of fueling.
      - `driver`: Name of the driver who fueled the vehicle.
      - `fuelType`: Type of fuel used.

  - **VehicleDocuments**: Represents document paths related to a vehicle.
    - **Fields**:
      - `registration`: Path to the registration document.
      - `insurance`: Path to the insurance document.

## Schedule Types

- **schedule.ts**
  - **WorkerShift**: Represents a work shift for a worker.
    - **Fields**:
      - `date`: Date of the shift.
      - `startTime`: Start time of the shift.
      - `endTime`: End time of the shift.
      - `jobId`: Optional ID of the job associated with the shift.

  - **WorkerSchedule**: Represents a schedule for a worker.
    - **Fields**:
      - `workerId`: ID of the worker.
      - `shifts`: Array of shifts assigned to the worker.

  - **VehicleSchedule**: Represents a schedule for a vehicle.
    - **Fields**:
      - `id`: Unique identifier for the schedule.
      - `vehicleId`: ID of the vehicle.
      - `date`: Date of the scheduled tasks.
      - `tasks`: Array of tasks scheduled for the vehicle.

## Resource Types

- **resource.ts**
  - **Resource**: Represents a resource in the system.
    - **Fields**:
      - `id`: Unique identifier for the resource.
      - `name`: Name of the resource.
      - `type`: Type/category of the resource.
      - `quantity`: Quantity available.

  - **MockItem**: Represents a mock item for testing purposes.
    - **Fields**:
      - `id`: Unique identifier for the mock item.
      - `name`: Name of the mock item.
      - `type`: Type/category of the mock item.
      - `available`: Availability status of the mock item. 