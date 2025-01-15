-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum types
CREATE TYPE equipment_status AS ENUM ('available', 'in-use', 'maintenance', 'retired');
CREATE TYPE vehicle_status AS ENUM ('active', 'maintenance', 'retired');
CREATE TYPE fuel_type AS ENUM ('gasoline', 'diesel', 'electric', 'hybrid');

-- Core Tables
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    role VARCHAR(20) CHECK (role IN ('admin', 'provider', 'customer')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL CHECK (year >= 1900),
    vin VARCHAR(17) UNIQUE NOT NULL,
    license_plate VARCHAR(20),
    status VARCHAR(20) CHECK (status IN ('active', 'maintenance', 'retired', 'out_of_service')),
    mileage INTEGER NOT NULL DEFAULT 0 CHECK (mileage >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vehicle_maintenance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    service_type VARCHAR(50) NOT NULL,
    service_date TIMESTAMP WITH TIME ZONE NOT NULL,
    mileage INTEGER NOT NULL CHECK (mileage >= 0),
    description TEXT,
    performed_by UUID REFERENCES users(id),
    next_service_date TIMESTAMP WITH TIME ZONE,
    next_service_mileage INTEGER CHECK (next_service_mileage > mileage),
    status VARCHAR(20) CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vehicle_fueling (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    driver_id UUID REFERENCES users(id),
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    mileage INTEGER NOT NULL CHECK (mileage >= 0),
    gallons DECIMAL(10,2) NOT NULL CHECK (gallons > 0),
    price_per_gallon DECIMAL(10,2) NOT NULL CHECK (price_per_gallon > 0),
    total_cost DECIMAL(10,2) GENERATED ALWAYS AS (gallons * price_per_gallon) STORED,
    fuel_type VARCHAR(20) NOT NULL,
    location VARCHAR(255),
    full_tank BOOLEAN DEFAULT true,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS equipment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    serial_number VARCHAR(100) UNIQUE,
    status VARCHAR(20) CHECK (status IN ('available', 'in_use', 'maintenance', 'retired')),
    condition VARCHAR(20) CHECK (condition IN ('new', 'good', 'fair', 'poor')),
    last_maintenance_date TIMESTAMP WITH TIME ZONE,
    next_maintenance_date TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better query performance
CREATE INDEX idx_vehicles_provider ON vehicles(provider_id);
CREATE INDEX idx_vehicles_status ON vehicles(status);
CREATE INDEX idx_maintenance_vehicle ON vehicle_maintenance(vehicle_id);
CREATE INDEX idx_maintenance_date ON vehicle_maintenance(service_date);
CREATE INDEX idx_fueling_vehicle ON vehicle_fueling(vehicle_id);
CREATE INDEX idx_fueling_date ON vehicle_fueling(date);
CREATE INDEX idx_equipment_provider ON equipment(provider_id);
CREATE INDEX idx_equipment_status ON equipment(status);

-- Trigger for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vehicles_updated_at
    BEFORE UPDATE ON vehicles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_maintenance_updated_at
    BEFORE UPDATE ON vehicle_maintenance
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fueling_updated_at
    BEFORE UPDATE ON vehicle_fueling
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_equipment_updated_at
    BEFORE UPDATE ON equipment
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 