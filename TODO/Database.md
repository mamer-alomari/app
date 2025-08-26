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
  - company_id: UUID (FK to companies) tbd is to be used for the company that the quote is for

### worker_schedules
- Stores worker schedules
- Fields:
  - company_id: UUID (FK to companies)
  - id: UUID (PK)
  - worker_id: UUID (FK to workers)
  - date: date
  - start_time: time
  - end_time: time
  - job_id: UUID
  - status: text
  - created_at: timestamp
  - updated_at: timestamp

### worker_schedules_history
- Stores worker schedules history
- Fields:
  - id: UUID (PK)
  - worker_schedule_id: UUID (FK to worker_schedules)
  - status: text
  - created_at: timestamp
  - updated_at: timestamp

### job_schedules
- Stores job schedules
- Fields:
  - id: UUID (PK)
  - job_id: UUID (FK to jobs)
  - worker_schedule_id: UUID (FK to worker_schedules)
  - created_at: timestamp
  - updated_at: timestamp 

### resources
- Stores resource information
- Fields:
  - company_id: UUID (FK to companies)
  - id: UUID (PK)
  - name: text
  - type: text
  - quantity: integer
  - status: text
  - last_updated: timestamp

### payroll
- Stores payroll records
- Fields:
  - company_id: UUID (FK to companies)
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

### companies
- Stores company information
- Fields:
  - id: UUID (PK)
  - name: text
  - created_at: timestamp
  - updated_at: timestamp

### workers
- Stores worker information
- Fields:
  - id: UUID (PK)
  - company_id: UUID (FK to companies)
  - name: text
  - created_at: timestamp
  - updated_at: timestamp

### vehicles
- Stores vehicle information
- Fields:
  - id: UUID (PK)
  - company_id: UUID (FK to companies)
  - name: text
  - created_at: timestamp
  - updated_at: timestamp

### jobs
- Stores job information
- Fields:
  - id: UUID (PK)
  - company_id: UUID (FK to companies)
  - created_at: timestamp
  - updated_at: timestamp

### job_items
- Stores job item information
- Fields:
  - id: UUID (PK)
  - job_id: UUID (FK to jobs)
  - item_id: UUID (FK to items)
  - quantity: integer
  - created_at: timestamp
  - updated_at: timestamp

## Job Status

### job_status
- Stores job status information
- Fields:
  - id: UUID (PK)
  - job_id: UUID (FK to jobs)
  - status: text
  - created_at: timestamp
  - updated_at: timestamp

### job_status_history
- Stores job status history information
- Fields:
  - id: UUID (PK)
  - job_id: UUID (FK to jobs)
  - status: text
  - created_at: timestamp
  - updated_at: timestamp

### equipment
- Stores equipment information
- Fields:
  - id: UUID (PK)
  - company_id: UUID (FK to companies)
  - name: text
  - created_at: timestamp
  - updated_at: timestamp

### job_equipment
- Stores job equipment information
- Fields:
  - id: UUID (PK)
  - job_id: UUID (FK to jobs)
  - equipment_id: UUID (FK to equipment)
  - quantity: integer
  - created_at: timestamp
  - updated_at: timestamp
# insert into job_equipment (job_id, equipment_id, quantity) values ('123e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174000', 1);




### job_equipment_history
- Stores job equipment history information
- Fields:
  - id: UUID (PK)
  - job_id: UUID (FK to jobs)
  - equipment_id: UUID (FK to equipment)
  - quantity: integer
  - created_at: timestamp
  - updated_at: timestamp
# insert into job_equipment_history (job_id, equipment_id, quantity) values ('123e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174000', 1);

## Job Status History

### job_status_history
- Stores job status history information
- Fields:
  - id: UUID (PK)
  - job_id: UUID (FK to jobs)
  - status: text
  - created_at: timestamp
  - updated_at: timestamp

### job_status_history_items
- Stores job status history items information
- Fields:
  - id: UUID (PK)
  - job_status_history_id: UUID (FK to job_status_history)
  - item_id: UUID (FK to items)
  - quantity: integer
  - created_at: timestamp
  - updated_at: timestamp