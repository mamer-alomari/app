# Database

## Schema

- **schema.sql**
  - Defines the database schema.
  - Includes tables for users, vehicles, maintenance, fueling, and equipment.

## Seed Data

- **seed.sql**
  - Provides seed data for the database.
  - Includes sample data for users, vehicles, maintenance, fueling, and equipment.

## Test Database

- **database.test.ts**
  - Configures the test database environment.
  - Includes setup and teardown functions for test isolation.

# Database Schema

## Core Tables

### quotes
- Stores customer quotes
- Fields:
  - id: UUID (PK)
  - created_at: timestamp
  - customer_name: text
  - source_address: text
  - destination_address: text
  - items: jsonb
  - status: text
  - total_price: decimal
  - user_id: UUID (FK to auth.users)

### schedules
- Stores worker schedules
- Fields:
  - id: UUID (PK)
  - worker_id: UUID (FK to workers)
  - date: date
  - start_time: time
  - end_time: time
  - job_id: UUID
  - status: text
  - created_at: timestamp
  - updated_at: timestamp

### resources
- Stores resource information
- Fields:
  - id: UUID (PK)
  - name: text
  - type: text
  - quantity: integer
  - status: text
  - last_updated: timestamp

### payroll
- Stores payroll records
- Fields:
  - id: UUID (PK)
  - worker_id: UUID (FK to workers)
  - period_start: date
  - period_end: date
  - regular_hours: numeric
  - overtime_hours: numeric
  - regular_rate: numeric
  - overtime_rate: numeric
  - total_pay: numeric
  - status: text
  - created_at: timestamp
  - updated_at: timestamp 