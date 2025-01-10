/*
  # Scheduling Schema

  1. New Tables
    - `jobs`
      - Core job information
      - Customer details
      - Job status tracking
    - `job_items`
      - Items included in each job
      - Item details and quantities
    - `shifts`
      - Work shift definitions
      - Shift assignments
    - `time_entries`
      - Worker time tracking
      - Break tracking
    - `availability`
      - Worker availability windows
      - Recurring availability patterns

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Jobs table
CREATE TABLE jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- Job items
CREATE TABLE job_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- Shifts
CREATE TABLE shifts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id),
  name text NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  break_duration interval,
  is_overnight boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Time entries
CREATE TABLE time_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id uuid REFERENCES workers(id) ON DELETE CASCADE,
  job_id uuid REFERENCES jobs(id),
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

-- Availability
CREATE TABLE availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- Enable RLS
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE shifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Jobs are viewable by authenticated users" ON jobs
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Job items are viewable by authenticated users" ON job_items
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Shifts are viewable by authenticated users" ON shifts
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Time entries are viewable by authenticated users" ON time_entries
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Availability is viewable by authenticated users" ON availability
  FOR SELECT TO authenticated USING (true);