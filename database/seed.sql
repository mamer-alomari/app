-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Insert sample users
INSERT INTO users (id, email, password_hash, first_name, last_name, phone, role) VALUES
('11111111-1111-1111-1111-111111111111', 'admin@example.com', 'hashed_password', 'Admin', 'User', '123-456-7890', 'admin'),
('22222222-2222-2222-2222-222222222222', 'provider@example.com', 'hashed_password', 'Provider', 'User', '123-456-7891', 'provider'),
('33333333-3333-3333-3333-333333333333', 'driver@example.com', 'hashed_password', 'Driver', 'User', '123-456-7892', 'provider');

-- Insert sample vehicles
INSERT INTO vehicles (id, provider_id, make, model, year, vin, license_plate, status, mileage) VALUES
('44444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 'Ford', 'F-150', 2022, '1FTEW1EG5NFB09876', 'ABC123', 'active', 15000),
('55555555-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222222', 'Chevrolet', 'Silverado', 2021, '3GCUDED12MG123456', 'XYZ789', 'active', 25000);

-- Insert sample maintenance records
INSERT INTO vehicle_maintenance (vehicle_id, service_type, service_date, mileage, description, performed_by, next_service_mileage) VALUES
('44444444-4444-4444-4444-444444444444', 'oil_change', CURRENT_TIMESTAMP - INTERVAL '1 month', 12000, 'Regular oil change', '33333333-3333-3333-3333-333333333333', 15000),
('55555555-5555-5555-5555-555555555555', 'tire_rotation', CURRENT_TIMESTAMP - INTERVAL '2 weeks', 24000, 'Tire rotation and balance', '33333333-3333-3333-3333-333333333333', 29000);

-- Insert sample fueling records
INSERT INTO vehicle_fueling (vehicle_id, driver_id, date, mileage, gallons, price_per_gallon, fuel_type, location) VALUES
('44444444-4444-4444-4444-444444444444', '33333333-3333-3333-3333-333333333333', CURRENT_TIMESTAMP - INTERVAL '1 week', 14500, 25.5, 3.45, 'regular', 'Shell Station #123'),
('55555555-5555-5555-5555-555555555555', '33333333-3333-3333-3333-333333333333', CURRENT_TIMESTAMP - INTERVAL '2 days', 24800, 30.2, 3.55, 'regular', 'Mobil Station #456');

-- Insert sample equipment
INSERT INTO equipment (provider_id, name, type, serial_number, status, condition) VALUES
('22222222-2222-2222-2222-222222222222', 'Dolly #1', 'dolly', 'DOL001', 'available', 'good'),
('22222222-2222-2222-2222-222222222222', 'Moving Blanket Set', 'blankets', 'BLK001', 'in_use', 'good'); 