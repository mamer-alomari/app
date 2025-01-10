/*
  # Workers Management Schema

  1. New Tables
    - `workers`
      - Core worker information
      - Employment details
      - Contact information
    - `worker_documents`
      - Document storage for workers
      - Track document types and expiry
    - `worker_roles`
      - Role definitions and permissions
    - `worker_certifications`
      - Track certifications and licenses
    - `worker_assignments`
      - Track worker assignments to jobs/shifts

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Worker roles
CREATE TABLE worker_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text NOT NULL UNIQUE,
  base_hourly_rate numeric(10,2) NOT NULL,
  overtime_rate numeric(10,2) NOT NULL,
  permissions jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Workers table
CREATE TABLE workers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- Worker documents
CREATE TABLE worker_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- Worker certifications
CREATE TABLE worker_certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- Worker assignments
CREATE TABLE worker_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id uuid REFERENCES workers(id) ON DELETE CASCADE,
  job_id uuid, -- Will be linked to jobs table
  shift_id uuid, -- Will be linked to shifts table
  start_time timestamptz NOT NULL,
  end_time timestamptz,
  status text NOT NULL DEFAULT 'scheduled',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE worker_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE worker_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE worker_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE worker_assignments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Worker roles are viewable by authenticated users" ON worker_roles
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Workers are viewable by authenticated users" ON workers
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Worker documents are viewable by authenticated users" ON worker_documents
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Worker certifications are viewable by authenticated users" ON worker_certifications
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Worker assignments are viewable by authenticated users" ON worker_assignments
  FOR SELECT TO authenticated USING (true);