/*
  # Initial Seed Data

  1. Company Data
    - Mock company information
    - Company locations
    - Department structure
    - Company settings

  2. Worker Data
    - Worker roles with permissions
    - Workers with different roles
    - Worker documents and certifications
    - Worker assignments

  3. Vehicle Data
    - Fleet vehicles
    - Vehicle documents
    - Maintenance records
    - Vehicle assignments

  4. Schedule Data
    - Jobs
    - Shifts
    - Time entries
    - Worker availability
*/

-- Insert company data
INSERT INTO companies (id, name, legal_name, tax_id, business_type, registration_number, website, phone, email, status)
VALUES (
  'c0a80121-1234-5678-90ab-cdef12345678',
  'Moove Moving Co.',
  'Moove Moving Company LLC',
  '12-3456789',
  'llc',
  'LLC123456',
  'www.moovemoving.com',
  '(555) 123-4567',
  'info@moovemoving.com',
  'active'
);

-- Insert company locations
INSERT INTO company_locations (company_id, name, address, city, state, zip_code, phone, is_headquarters)
VALUES (
  'c0a80121-1234-5678-90ab-cdef12345678',
  'Main Office',
  '123 Moving St',
  'New York',
  'NY',
  '10001',
  '(555) 123-4567',
  true
);

-- Insert departments
INSERT INTO departments (id, company_id, name, code)
VALUES 
  ('d0a80121-1234-5678-90ab-cdef12345678', 'c0a80121-1234-5678-90ab-cdef12345678', 'Operations', 'OPS'),
  ('d0a80121-2234-5678-90ab-cdef12345678', 'c0a80121-1234-5678-90ab-cdef12345678', 'Fleet Management', 'FLEET');

-- Insert worker roles
INSERT INTO worker_roles (id, name, code, base_hourly_rate, overtime_rate, permissions)
VALUES 
  ('r0a80121-1234-5678-90ab-cdef12345678', 'Manager', 'MGR', 30.00, 45.00, '{"canAssignJobs": true, "canAccessFinancials": true, "canManageWorkers": true, "canManageVehicles": true}'),
  ('r0a80121-2234-5678-90ab-cdef12345678', 'Foreman', 'FMN', 25.00, 37.50, '{"canAssignJobs": true, "canAccessFinancials": false, "canManageWorkers": false, "canManageVehicles": false}'),
  ('r0a80121-3234-5678-90ab-cdef12345678', 'Driver', 'DRV', 22.00, 33.00, '{"canAssignJobs": false, "canAccessFinancials": false, "canManageWorkers": false, "canManageVehicles": false}'),
  ('r0a80121-4234-5678-90ab-cdef12345678', 'Mover', 'MOV', 18.00, 27.00, '{"canAssignJobs": false, "canAccessFinancials": false, "canManageWorkers": false, "canManageVehicles": false}');

-- Insert workers
INSERT INTO workers (id, worker_id, role_id, first_name, last_name, email, phone, ssn, date_of_birth, hire_date, status, department_id, company_id, pay_rate, overtime_rate)
VALUES 
  -- Manager
  ('w0a80121-1234-5678-90ab-cdef12345678', 'M24-00001', 'r0a80121-1234-5678-90ab-cdef12345678', 'James', 'Smith', 'james.smith@moovemoving.com', '(555) 111-1111', '***-**-1111', '1980-01-01', '2024-01-01', 'active', 'd0a80121-1234-5678-90ab-cdef12345678', 'c0a80121-1234-5678-90ab-cdef12345678', 30.00, 45.00),
  
  -- Foremen
  ('w0a80121-2234-5678-90ab-cdef12345678', 'F24-00001', 'r0a80121-2234-5678-90ab-cdef12345678', 'Robert', 'Johnson', 'robert.johnson@moovemoving.com', '(555) 222-2222', '***-**-2222', '1985-02-02', '2024-01-01', 'active', 'd0a80121-1234-5678-90ab-cdef12345678', 'c0a80121-1234-5678-90ab-cdef12345678', 25.00, 37.50),
  ('w0a80121-3234-5678-90ab-cdef12345678', 'F24-00002', 'r0a80121-2234-5678-90ab-cdef12345678', 'Michael', 'Williams', 'michael.williams@moovemoving.com', '(555) 333-3333', '***-**-3333', '1982-03-03', '2024-01-01', 'active', 'd0a80121-1234-5678-90ab-cdef12345678', 'c0a80121-1234-5678-90ab-cdef12345678', 25.00, 37.50),

  -- Drivers
  ('w0a80121-4234-5678-90ab-cdef12345678', 'D24-00001', 'r0a80121-3234-5678-90ab-cdef12345678', 'John', 'Driver', 'john.driver@moovemoving.com', '(555) 444-4444', '***-**-4444', '1988-04-04', '2024-01-01', 'active', 'd0a80121-1234-5678-90ab-cdef12345678', 'c0a80121-1234-5678-90ab-cdef12345678', 22.00, 33.00),
  ('w0a80121-5234-5678-90ab-cdef12345678', 'D24-00002', 'r0a80121-3234-5678-90ab-cdef12345678', 'David', 'Wilson', 'david.wilson@moovemoving.com', '(555) 555-5555', '***-**-5555', '1987-05-05', '2024-01-01', 'active', 'd0a80121-1234-5678-90ab-cdef12345678', 'c0a80121-1234-5678-90ab-cdef12345678', 22.00, 33.00),

  -- Movers
  ('w0a80121-6234-5678-90ab-cdef12345678', 'M24-00001', 'r0a80121-4234-5678-90ab-cdef12345678', 'Mike', 'Brown', 'mike.brown@moovemoving.com', '(555) 666-6666', '***-**-6666', '1990-06-06', '2024-01-01', 'active', 'd0a80121-1234-5678-90ab-cdef12345678', 'c0a80121-1234-5678-90ab-cdef12345678', 18.00, 27.00),
  ('w0a80121-7234-5678-90ab-cdef12345678', 'M24-00002', 'r0a80121-4234-5678-90ab-cdef12345678', 'Chris', 'Davis', 'chris.davis@moovemoving.com', '(555) 777-7777', '***-**-7777', '1992-07-07', '2024-01-01', 'active', 'd0a80121-1234-5678-90ab-cdef12345678', 'c0a80121-1234-5678-90ab-cdef12345678', 18.00, 27.00);

-- Insert worker documents
INSERT INTO worker_documents (worker_id, document_type, document_number, issue_date, expiry_date, file_path)
VALUES 
  -- Driver's licenses for drivers
  ('w0a80121-4234-5678-90ab-cdef12345678', 'drivers_license', 'DL123456', '2023-01-01', '2024-12-31', '/documents/drivers/dl-d24-00001.pdf'),
  ('w0a80121-5234-5678-90ab-cdef12345678', 'drivers_license', 'DL789012', '2023-01-01', '2024-12-31', '/documents/drivers/dl-d24-00002.pdf'),
  
  -- ID and SSN documents for all workers
  ('w0a80121-1234-5678-90ab-cdef12345678', 'identification', 'ID111111', '2023-01-01', '2028-01-01', '/documents/id/m24-00001.pdf'),
  ('w0a80121-1234-5678-90ab-cdef12345678', 'ssn_card', 'SSN111111', '2023-01-01', null, '/documents/ssn/m24-00001.pdf');

-- Insert vehicles
INSERT INTO vehicles (id, company_id, vehicle_id, make, model, year, vin, license_plate, registration_number, registration_expiry, insurance_policy_number, insurance_expiry, capacity, status)
VALUES 
  ('v0a80121-1234-5678-90ab-cdef12345678', 'c0a80121-1234-5678-90ab-cdef12345678', 'TRK-001', 'Ford', 'F-650', 2022, '1HGCM82633A123456', 'ABC123', 'REG123456', '2024-12-31', 'INS123456', '2024-12-31', '26ft - 10,000 lbs', 'active'),
  ('v0a80121-2234-5678-90ab-cdef12345678', 'c0a80121-1234-5678-90ab-cdef12345678', 'VAN-001', 'Mercedes-Benz', 'Sprinter', 2023, '2MGCM82633A789012', 'XYZ789', 'REG789012', '2024-12-31', 'INS789012', '2024-12-31', '16ft - 5,000 lbs', 'active');

-- Insert vehicle documents
INSERT INTO vehicle_documents (vehicle_id, document_type, document_number, issue_date, expiry_date, file_path)
VALUES 
  ('v0a80121-1234-5678-90ab-cdef12345678', 'registration', 'REG123456', '2024-01-01', '2024-12-31', '/documents/vehicles/reg-trk-001.pdf'),
  ('v0a80121-1234-5678-90ab-cdef12345678', 'insurance', 'INS123456', '2024-01-01', '2024-12-31', '/documents/vehicles/ins-trk-001.pdf'),
  ('v0a80121-2234-5678-90ab-cdef12345678', 'registration', 'REG789012', '2024-01-01', '2024-12-31', '/documents/vehicles/reg-van-001.pdf'),
  ('v0a80121-2234-5678-90ab-cdef12345678', 'insurance', 'INS789012', '2024-01-01', '2024-12-31', '/documents/vehicles/ins-van-001.pdf');

-- Insert vehicle maintenance records
INSERT INTO vehicle_maintenance (vehicle_id, service_type, service_date, mileage, description, cost, performed_by, next_service_date, next_service_mileage)
VALUES 
  ('v0a80121-1234-5678-90ab-cdef12345678', 'Oil Change', '2024-01-15', 5000, 'Regular oil change and inspection', 150.00, 'Service Center A', '2024-04-15', 10000),
  ('v0a80121-2234-5678-90ab-cdef12345678', 'Oil Change', '2024-02-01', 3000, 'Regular oil change and inspection', 150.00, 'Service Center B', '2024-05-01', 8000);

-- Insert shifts
INSERT INTO shifts (company_id, name, start_time, end_time, break_duration)
VALUES 
  ('c0a80121-1234-5678-90ab-cdef12345678', 'Morning Shift', '08:00', '16:00', '01:00'),
  ('c0a80121-1234-5678-90ab-cdef12345678', 'Afternoon Shift', '12:00', '20:00', '01:00');

-- Insert jobs
INSERT INTO jobs (job_number, company_id, customer_name, customer_email, customer_phone, pickup_address, pickup_city, pickup_state, pickup_zip, delivery_address, delivery_city, delivery_state, delivery_zip, scheduled_date, scheduled_time, estimated_duration)
VALUES 
  ('MOV-001', 'c0a80121-1234-5678-90ab-cdef12345678', 'John Smith', 'john.smith@example.com', '(555) 123-4567', '123 Main St', 'New York', 'NY', '10001', '456 Park Ave', 'New York', 'NY', '10002', '2024-02-20', '09:00', '04:00'),
  ('MOV-002', 'c0a80121-1234-5678-90ab-cdef12345678', 'Sarah Johnson', 'sarah.johnson@example.com', '(555) 234-5678', '789 Broadway', 'New York', 'NY', '10003', '321 Oak St', 'New York', 'NY', '10004', '2024-02-20', '14:00', '03:00');

-- Insert job items
INSERT INTO job_items (job_id, name, category, quantity, dimensions, weight)
VALUES 
  ((SELECT id FROM jobs WHERE job_number = 'MOV-001'), 'Arm Chairs', 'Furniture', 2, '{"length": 30, "width": 30, "height": 36}', 50.00),
  ((SELECT id FROM jobs WHERE job_number = 'MOV-001'), '3 Seater Sofa', 'Furniture', 1, '{"length": 84, "width": 38, "height": 34}', 150.00),
  ((SELECT id FROM jobs WHERE job_number = 'MOV-002'), 'Dining Table', 'Furniture', 1, '{"length": 72, "width": 42, "height": 30}', 100.00),
  ((SELECT id FROM jobs WHERE job_number = 'MOV-002'), 'Dining Chairs', 'Furniture', 4, '{"length": 20, "width": 20, "height": 36}', 15.00);