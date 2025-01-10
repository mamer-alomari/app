/*
  # Add maintenance records functionality

  1. New Functions
    - `add_vehicle_maintenance`: Function to add a new maintenance record
    - `get_vehicle_maintenance`: Function to retrieve maintenance records for a vehicle

  2. Security
    - Enable RLS on vehicle_maintenance table
    - Add policies for authenticated users
*/

-- Function to add a new maintenance record
CREATE OR REPLACE FUNCTION add_vehicle_maintenance(
  p_vehicle_id uuid,
  p_service_type text,
  p_service_date date,
  p_mileage integer,
  p_description text,
  p_cost numeric(10,2),
  p_performed_by text,
  p_next_service_date date,
  p_next_service_mileage integer
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_maintenance_id uuid;
BEGIN
  INSERT INTO vehicle_maintenance (
    vehicle_id,
    service_type,
    service_date,
    mileage,
    description,
    cost,
    performed_by,
    next_service_date,
    next_service_mileage,
    status
  ) VALUES (
    p_vehicle_id,
    p_service_type,
    p_service_date,
    p_mileage,
    p_description,
    p_cost,
    p_performed_by,
    p_next_service_date,
    p_next_service_mileage,
    'completed'
  )
  RETURNING id INTO v_maintenance_id;

  -- Update vehicle's last service mileage and next service mileage
  UPDATE vehicles
  SET 
    last_service_mileage = p_mileage,
    next_service_mileage = p_next_service_mileage
  WHERE id = p_vehicle_id;

  RETURN v_maintenance_id;
END;
$$;

-- Function to get maintenance records for a vehicle
CREATE OR REPLACE FUNCTION get_vehicle_maintenance(p_vehicle_id uuid)
RETURNS TABLE (
  id uuid,
  service_type text,
  service_date date,
  mileage integer,
  description text,
  cost numeric(10,2),
  performed_by text,
  next_service_date date,
  next_service_mileage integer,
  status text,
  created_at timestamptz
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    id,
    service_type,
    service_date,
    mileage,
    description,
    cost,
    performed_by,
    next_service_date,
    next_service_mileage,
    status,
    created_at
  FROM vehicle_maintenance
  WHERE vehicle_id = p_vehicle_id
  ORDER BY service_date DESC;
$$;

-- Add RLS policies
ALTER TABLE vehicle_maintenance ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view maintenance records
CREATE POLICY "Users can view maintenance records"
  ON vehicle_maintenance
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert maintenance records
CREATE POLICY "Users can insert maintenance records"
  ON vehicle_maintenance
  FOR INSERT
  TO authenticated
  WITH CHECK (true);