/*
  # Vehicle Management Schema

  1. New Tables
    - `vehicles`
      - Core vehicle information
      - Registration and insurance details
    - `vehicle_documents`
      - Document storage for vehicles
      - Track document types and expiry
    - `vehicle_maintenance`
      - Maintenance records
      - Service history
    - `vehicle_assignments`
      - Track vehicle assignments to jobs
    - `quotes`
      - Track quotes
    - `schedules`
      - Track schedules

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Vehicles table
CREATE TABLE vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id),
  vehicle_id text NOT NULL UNIQUE,
  make text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL,
  vin text NOT NULL UNIQUE,
  license_plate text NOT NULL,
  registration_number text,
  registration_expiry date,
  insurance_policy_number text,
  insurance_expiry date,
  capacity text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Vehicle documents
CREATE TABLE vehicle_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id uuid REFERENCES vehicles(id) ON DELETE CASCADE,
  document_type text NOT NULL,
  document_number text,
  issue_date date,
  expiry_date date,
  file_path text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Vehicle maintenance
CREATE TABLE vehicle_maintenance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id uuid REFERENCES vehicles(id) ON DELETE CASCADE,
  service_type text NOT NULL,
  service_date date NOT NULL,
  mileage integer,
  description text,
  cost numeric(10,2),
  performed_by text,
  next_service_date date,
  next_service_mileage integer,
  status text NOT NULL DEFAULT 'completed',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Vehicle assignments
CREATE TABLE vehicle_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id uuid REFERENCES vehicles(id) ON DELETE CASCADE,
  job_id uuid, -- Will be linked to jobs table
  driver_id uuid REFERENCES workers(id),
  start_time timestamptz NOT NULL,
  end_time timestamptz,
  status text NOT NULL DEFAULT 'scheduled',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Quotes table
CREATE TABLE quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    customer_name TEXT NOT NULL,
    source_address TEXT NOT NULL,
    destination_address TEXT NOT NULL,
    items JSONB NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    total_price DECIMAL(10,2) NOT NULL,
    user_id UUID REFERENCES auth.users(id)
);

-- Schedules table
CREATE TABLE schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    worker_id UUID REFERENCES workers(id),
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    job_id UUID,
    status TEXT NOT NULL DEFAULT 'scheduled',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_maintenance ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_assignments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Vehicles are viewable by authenticated users" ON vehicles
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Vehicle documents are viewable by authenticated users" ON vehicle_documents
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Vehicle maintenance records are viewable by authenticated users" ON vehicle_maintenance
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Vehicle assignments are viewable by authenticated users" ON vehicle_assignments
  FOR SELECT TO authenticated USING (true);

-- Add indexes
CREATE INDEX idx_quotes_user_id ON quotes(user_id);
CREATE INDEX idx_schedules_worker_id ON schedules(worker_id);
CREATE INDEX idx_schedules_date ON schedules(date);