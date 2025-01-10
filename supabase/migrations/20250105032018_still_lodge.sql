/*
  # Complete Database Schema for Moove Moving App

  This file contains all DDL statements required to build the database schema.
  
  ## Tables Overview:
  1. Core Business
    - companies
    - company_locations
    - company_settings
    - departments
  
  2. Workers Management
    - worker_roles
    - workers
    - worker_documents
    - worker_certifications
    - worker_assignments
    - time_entries
    - availability
  
  3. Vehicle Management
    - vehicles
    - vehicle_documents
    - vehicle_maintenance
    - vehicle_assignments
    - vehicle_fueling
  
  4. Job Management
    - jobs
    - job_items
    - job_status_history
  
  5. Schedule Management
    - shifts
    - shift_assignments
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Core Business Tables --

CREATE TABLE companies (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  legal_name text,
  tax_id text,
  business_type text NOT NULL,
  registration_number text,
  registration_date date,
  website text,
  phone text,
  email text,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE company_locations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
  name text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  phone text,
  email text,
  is_headquarters boolean DEFAULT false,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE company_settings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
  setting_key text NOT NULL,
  setting_value jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, setting_key)
);

CREATE TABLE departments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
  name text NOT NULL,
  code text,
  parent_id uuid REFERENCES departments(id),
  manager_id uuid, -- Will be linked to workers table
  description text,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Worker Management Tables --

CREATE TABLE worker_roles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  code text NOT NULL UNIQUE,
  base_hourly_rate numeric(10,2) NOT NULL,
  overtime_rate numeric(10,2) NOT NULL,
  permissions jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE workers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  worker_id text NOT NULL UNIQUE, -- Employee ID (e.g., M24-00001)
  role_id uuid REFERENCES worker_roles(id),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text,
  ssn text NOT NULL,
  date_of_birth date NOT NULL,
  hire_date date NOT NULL,
  termination_date date,
  status text NOT NULL DEFAULT 'active',
  supervisor_id uuid REFERENCES workers(id),
  department_id uuid REFERENCES departments(id),
  company_id uuid REFERENCES companies(id),
  pay_rate numeric(10,2) NOT NULL,
  overtime_rate numeric(10,2) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE worker_documents (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  worker_id uuid REFERENCES workers(id) ON DELETE CASCADE,
  document_type text NOT NULL,
  document_number text,
  issue_date date,
  expiry_date date,
  file_path text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE worker_certifications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  worker_id uuid REFERENCES workers(id) ON DELETE CASCADE,
  certification_type text NOT NULL,
  certification_number text,
  issuing_authority text,
  issue_date date NOT NULL,
  expiry_date date,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE time_entries (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  worker_id uuid REFERENCES workers(id) ON DELETE CASCADE,
  job_id uuid, -- Will be linked to jobs table
  clock_in timestamptz NOT NULL,
  clock_out timestamptz,
  break_start timestamptz,
  break_end timestamptz,
  regular_hours numeric(5,2),
  overtime_hours numeric(5,2),
  status text NOT NULL DEFAULT 'pending',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE availability (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  worker_id uuid REFERENCES workers(id) ON DELETE CASCADE,
  day_of_week integer NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time time NOT NULL,
  end_time time NOT NULL,
  is_recurring boolean DEFAULT true,
  effective_start_date date,
  effective_end_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Vehicle Management Tables --

CREATE TABLE vehicles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
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
  current_mileage integer,
  last_service_mileage integer,
  next_service_mileage integer,
  fuel_type text NOT NULL CHECK (fuel_type IN ('gasoline', 'diesel')),
  fuel_capacity numeric(10,2),
  current_fuel_level numeric(10,2),
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE vehicle_documents (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
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

CREATE TABLE vehicle_maintenance (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
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

CREATE TABLE vehicle_fueling (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id uuid REFERENCES vehicles(id) ON DELETE CASCADE,
  date date NOT NULL,
  mileage integer NOT NULL,
  gallons numeric(10,3) NOT NULL,
  price_per_gallon numeric(10,3) NOT NULL,
  total_cost numeric(10,2) NOT NULL,
  location text NOT NULL,
  fuel_type text NOT NULL CHECK (fuel_type IN ('gasoline', 'diesel')),
  full_tank boolean DEFAULT true,
  driver_id uuid REFERENCES workers(id),
  notes text,
  receipt_path text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Job Management Tables --

CREATE TABLE jobs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_number text NOT NULL UNIQUE,
  company_id uuid REFERENCES companies(id),
  customer_name text NOT NULL,
  customer_email text,
  customer_phone text,
  pickup_address text NOT NULL,
  pickup_city text NOT NULL,
  pickup_state text NOT NULL,
  pickup_zip text NOT NULL,
  delivery_address text NOT NULL,
  delivery_city text NOT NULL,
  delivery_state text NOT NULL,
  delivery_zip text NOT NULL,
  scheduled_date date NOT NULL,
  scheduled_time time NOT NULL,
  estimated_duration interval NOT NULL,
  status text NOT NULL DEFAULT 'scheduled',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE job_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id uuid REFERENCES jobs(id) ON DELETE CASCADE,
  name text NOT NULL,
  category text,
  quantity integer NOT NULL DEFAULT 1,
  dimensions jsonb,
  weight numeric(10,2),
  special_instructions text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE job_status_history (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id uuid REFERENCES jobs(id) ON DELETE CASCADE,
  status text NOT NULL,
  notes text,
  changed_by uuid REFERENCES workers(id),
  created_at timestamptz DEFAULT now()
);

-- Schedule Management Tables --

CREATE TABLE shifts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid REFERENCES companies(id),
  name text NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  break_duration interval,
  is_overnight boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE shift_assignments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  shift_id uuid REFERENCES shifts(id) ON DELETE CASCADE,
  worker_id uuid REFERENCES workers(id) ON DELETE CASCADE,
  job_id uuid REFERENCES jobs(id),
  date date NOT NULL,
  status text NOT NULL DEFAULT 'scheduled',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(shift_id, worker_id, date)
);

-- Create indexes for better query performance

-- Companies
CREATE INDEX idx_companies_status ON companies(status);

-- Workers
CREATE INDEX idx_workers_worker_id ON workers(worker_id);
CREATE INDEX idx_workers_email ON workers(email);
CREATE INDEX idx_workers_status ON workers(status);
CREATE INDEX idx_workers_role ON workers(role_id);
CREATE INDEX idx_workers_department ON workers(department_id);

-- Vehicles
CREATE INDEX idx_vehicles_vehicle_id ON vehicles(vehicle_id);
CREATE INDEX idx_vehicles_vin ON vehicles(vin);
CREATE INDEX idx_vehicles_status ON vehicles(status);

-- Jobs
CREATE INDEX idx_jobs_job_number ON jobs(job_number);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_scheduled_date ON jobs(scheduled_date);

-- Time entries
CREATE INDEX idx_time_entries_worker ON time_entries(worker_id);
CREATE INDEX idx_time_entries_clock_in ON time_entries(clock_in);

-- Vehicle maintenance
CREATE INDEX idx_vehicle_maintenance_vehicle ON vehicle_maintenance(vehicle_id);
CREATE INDEX idx_vehicle_maintenance_date ON vehicle_maintenance(service_date);

-- Vehicle fueling
CREATE INDEX idx_vehicle_fueling_vehicle ON vehicle_fueling(vehicle_id);
CREATE INDEX idx_vehicle_fueling_date ON vehicle_fueling(date);

-- Enable Row Level Security
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE worker_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE worker_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE worker_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_maintenance ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_fueling ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE shifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE shift_assignments ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies
CREATE POLICY "Users can view all records" ON companies FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can view all records" ON workers FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can view all records" ON vehicles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can view all records" ON jobs FOR SELECT TO authenticated USING (true);

-- Add triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for all tables with updated_at
CREATE TRIGGER update_companies_updated_at
    BEFORE UPDATE ON companies
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Repeat for other tables...