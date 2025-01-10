/*
  # Company Management Schema

  1. New Tables
    - `companies`
      - Core company information
      - Contact details
      - Business registration info
    - `company_locations`
      - Multiple locations/branches per company
      - Address and contact info per location
    - `company_settings`
      - Company-wide configuration
      - Operational settings
    - `departments`
      - Organizational structure
      - Department hierarchy

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Companies table
CREATE TABLE companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- Company locations
CREATE TABLE company_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- Company settings
CREATE TABLE company_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
  setting_key text NOT NULL,
  setting_value jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, setting_key)
);

-- Departments
CREATE TABLE departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- Enable RLS
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Companies are viewable by authenticated users" ON companies
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Company locations are viewable by authenticated users" ON company_locations
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Company settings are viewable by authenticated users" ON company_settings
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Departments are viewable by authenticated users" ON departments
  FOR SELECT TO authenticated USING (true);