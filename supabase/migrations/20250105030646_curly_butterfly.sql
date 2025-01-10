/*
  # Add Vehicle Fueling Management

  1. New Tables
    - `vehicle_fueling`
      - `id` (uuid, primary key)
      - `vehicle_id` (uuid, references vehicles)
      - `date` (date)
      - `mileage` (integer)
      - `gallons` (numeric)
      - `price_per_gallon` (numeric)
      - `total_cost` (numeric)
      - `location` (text)
      - `fuel_type` (text)
      - `full_tank` (boolean)
      - `driver_id` (uuid, references workers)
      - `notes` (text)
      - `receipt_path` (text)
      - Timestamps and audit fields

  2. Functions
    - Add fueling record
    - Get fueling records for vehicle
    - Calculate fuel efficiency

  3. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Vehicle fueling table
CREATE TABLE vehicle_fueling (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  updated_by uuid REFERENCES auth.users(id)
);

-- Function to add fueling record
CREATE OR REPLACE FUNCTION add_vehicle_fueling(
  p_vehicle_id uuid,
  p_date date,
  p_mileage integer,
  p_gallons numeric,
  p_price_per_gallon numeric,
  p_location text,
  p_fuel_type text,
  p_full_tank boolean,
  p_driver_id uuid,
  p_notes text DEFAULT NULL,
  p_receipt_path text DEFAULT NULL
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_fueling_id uuid;
  v_total_cost numeric;
BEGIN
  -- Calculate total cost
  v_total_cost := p_gallons * p_price_per_gallon;

  -- Insert fueling record
  INSERT INTO vehicle_fueling (
    vehicle_id,
    date,
    mileage,
    gallons,
    price_per_gallon,
    total_cost,
    location,
    fuel_type,
    full_tank,
    driver_id,
    notes,
    receipt_path,
    created_by,
    updated_by
  ) VALUES (
    p_vehicle_id,
    p_date,
    p_mileage,
    p_gallons,
    p_price_per_gallon,
    v_total_cost,
    p_location,
    p_fuel_type,
    p_full_tank,
    p_driver_id,
    p_notes,
    p_receipt_path,
    auth.uid(),
    auth.uid()
  )
  RETURNING id INTO v_fueling_id;

  -- Update vehicle's current mileage
  UPDATE vehicles
  SET current_mileage = p_mileage
  WHERE id = p_vehicle_id;

  RETURN v_fueling_id;
END;
$$;

-- Function to get vehicle fuel efficiency
CREATE OR REPLACE FUNCTION get_vehicle_fuel_efficiency(
  p_vehicle_id uuid,
  p_start_date date DEFAULT NULL,
  p_end_date date DEFAULT NULL
) RETURNS TABLE (
  total_miles integer,
  total_gallons numeric,
  miles_per_gallon numeric
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  WITH ordered_records AS (
    SELECT
      mileage,
      gallons,
      ROW_NUMBER() OVER (ORDER BY date, mileage) as rn
    FROM vehicle_fueling
    WHERE vehicle_id = p_vehicle_id
    AND (p_start_date IS NULL OR date >= p_start_date)
    AND (p_end_date IS NULL OR date <= p_end_date)
    AND full_tank = true
  )
  SELECT
    (MAX(mileage) - MIN(mileage))::integer as total_miles,
    SUM(gallons) as total_gallons,
    ROUND(
      (MAX(mileage) - MIN(mileage))::numeric / NULLIF(SUM(gallons), 0),
      2
    ) as miles_per_gallon
  FROM ordered_records;
END;
$$;

-- Enable RLS
ALTER TABLE vehicle_fueling ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view fueling records"
  ON vehicle_fueling
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert fueling records"
  ON vehicle_fueling
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes
CREATE INDEX idx_vehicle_fueling_vehicle_id ON vehicle_fueling(vehicle_id);
CREATE INDEX idx_vehicle_fueling_date ON vehicle_fueling(date);
CREATE INDEX idx_vehicle_fueling_driver_id ON vehicle_fueling(driver_id);