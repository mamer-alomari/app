-- DDL Statements for the database schema for the project including all tables and relationships
-- This is the schema for the database that will be used for the project
-- created tables are: 
-- look over the TODO.md file to see the relationships between the tables
-- read schema.sql and  add all the tables created below 
-- tables : 
-- companies
-- workers
-- vehicles
-- jobs
-- job_items
-- job_status
-- job_status_history
-- job_status_history_items
-- job_equipment
-- job_equipment_history
-- worker_schedules
-- worker_schedules_history
-- job_schedules
-- job_schedules_history
-- equipment
-- equipment_assignment
-- equipment_maintenance
-- worker_shift
-- worker_schedule
-- vehicle_schedule
-- resource
-- mock_item


-- Company Table
CREATE TABLE Company (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Worker Table
CREATE TABLE Worker (
    id SERIAL PRIMARY KEY,
    companyId INT NOT NULL,
    workerId VARCHAR(255),
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    ssn VARCHAR(11),
    role VARCHAR(50),
    status VARCHAR(50),
    hireDate DATE,
    documents JSON,
    payRate JSON,
    workHours JSON,
    payStubs JSON,
    permissions JSON,
    supervisor INT,
    FOREIGN KEY (companyId) REFERENCES Company(id)
);

-- Vehicle Table
CREATE TABLE Vehicle (
    id SERIAL PRIMARY KEY,
    companyId INT NOT NULL,
    vehicleId VARCHAR(255),
    make VARCHAR(255),
    model VARCHAR(255),
    year INT,
    vin VARCHAR(17),
    licensePlate VARCHAR(10),
    registrationExpiry DATE,
    insurancePolicyNumber VARCHAR(255),
    insuranceExpiry DATE,
    capacity JSON,
    mileage INT,
    status VARCHAR(50),
    maintenanceHistory JSON,
    fuelingHistory JSON,
    documents JSON,
    FOREIGN KEY (companyId) REFERENCES Company(id)
);

-- Job Table
CREATE TABLE Job (
    id SERIAL PRIMARY KEY,
    companyId INT NOT NULL,
    description TEXT,
    status VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (companyId) REFERENCES Company(id)
);

-- JobItems Table
CREATE TABLE JobItems (
    id SERIAL PRIMARY KEY,
    companyId INT NOT NULL,
    jobId INT,
    itemId INT,
    quantity INT,
    FOREIGN KEY (companyId) REFERENCES Company(id),
    FOREIGN KEY (jobId) REFERENCES Job(id)
);

-- JobStatus Table
CREATE TABLE JobStatus (
    id SERIAL PRIMARY KEY,
    companyId INT NOT NULL,
    jobId INT,
    status VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (companyId) REFERENCES Company(id),
    FOREIGN KEY (jobId) REFERENCES Job(id)
);

-- JobStatusHistory Table
CREATE TABLE JobStatusHistory (
    id SERIAL PRIMARY KEY,
    companyId INT NOT NULL,
    jobId INT,
    status VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (companyId) REFERENCES Company(id),
    FOREIGN KEY (jobId) REFERENCES Job(id)
);

-- JobStatusHistoryItems Table
CREATE TABLE JobStatusHistoryItems (
    id SERIAL PRIMARY KEY,
    companyId INT NOT NULL,
    jobStatusHistoryId INT,
    itemId INT,
    quantity INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (companyId) REFERENCES Company(id),
    FOREIGN KEY (jobStatusHistoryId) REFERENCES JobStatusHistory(id)
);

-- JobEquipment Table
CREATE TABLE JobEquipment (
    id SERIAL PRIMARY KEY,
    companyId INT NOT NULL,
    jobId INT,
    equipmentId INT,
    quantity INT,
    FOREIGN KEY (companyId) REFERENCES Company(id),
    FOREIGN KEY (jobId) REFERENCES Job(id),
    FOREIGN KEY (equipmentId) REFERENCES Equipment(id)
);

-- JobEquipmentHistory Table
CREATE TABLE JobEquipmentHistory (
    id SERIAL PRIMARY KEY,
    companyId INT NOT NULL,
    jobId INT,
    equipmentId INT,
    quantity INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (companyId) REFERENCES Company(id),
    FOREIGN KEY (jobId) REFERENCES Job(id),
    FOREIGN KEY (equipmentId) REFERENCES Equipment(id)
);

-- JobAssignment Table
CREATE TABLE JobAssignment (
    id SERIAL PRIMARY KEY,
    companyId INT NOT NULL,
    jobId INT,
    workerId INT,
    assignedAt TIMESTAMP,
    FOREIGN KEY (companyId) REFERENCES Company(id),
    FOREIGN KEY (jobId) REFERENCES Job(id),
    FOREIGN KEY (workerId) REFERENCES Worker(id)
);

-- Equipment Table
CREATE TABLE Equipment (
    id SERIAL PRIMARY KEY,
    companyId INT NOT NULL,
    providerId INT,
    name VARCHAR(255),
    type VARCHAR(255),
    serialNumber VARCHAR(255),
    status VARCHAR(50),
    condition VARCHAR(50),
    lastMaintenanceDate DATE,
    nextMaintenanceDate DATE,
    notes TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (companyId) REFERENCES Company(id)
);

-- EquipmentAssignment Table
CREATE TABLE EquipmentAssignment (
    id SERIAL PRIMARY KEY,
    companyId INT NOT NULL,
    equipmentId INT,
    jobId INT,
    assignedBy INT,
    assignedAt TIMESTAMP,
    unassignedBy INT,
    unassignedAt TIMESTAMP,
    FOREIGN KEY (companyId) REFERENCES Company(id),
    FOREIGN KEY (equipmentId) REFERENCES Equipment(id)
);

-- EquipmentMaintenance Table
CREATE TABLE EquipmentMaintenance (
    id SERIAL PRIMARY KEY,
    companyId INT NOT NULL,
    equipmentId INT,
    maintenanceDate DATE,
    maintenanceType VARCHAR(255),
    description TEXT,
    performedBy INT,
    notes TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (companyId) REFERENCES Company(id),
    FOREIGN KEY (equipmentId) REFERENCES Equipment(id)
);

-- WorkerShift Table
CREATE TABLE WorkerShift (
    id SERIAL PRIMARY KEY,
    companyId INT NOT NULL,
    workerId INT,
    date DATE,
    startTime TIME,
    endTime TIME,
    jobId INT,
    FOREIGN KEY (companyId) REFERENCES Company(id),
    FOREIGN KEY (workerId) REFERENCES Worker(id)
);

-- WorkerSchedule Table
CREATE TABLE WorkerSchedule (
    id SERIAL PRIMARY KEY,
    companyId INT NOT NULL,
    workerId INT,
    shifts JSON,
    FOREIGN KEY (companyId) REFERENCES Company(id),
    FOREIGN KEY (workerId) REFERENCES Worker(id)
);

-- VehicleSchedule Table
CREATE TABLE VehicleSchedule (
    id SERIAL PRIMARY KEY,
    companyId INT NOT NULL,
    vehicleId INT,
    date DATE,
    tasks JSON,
    FOREIGN KEY (companyId) REFERENCES Company(id),
    FOREIGN KEY (vehicleId) REFERENCES Vehicle(id)
);

-- Resource Table
CREATE TABLE Resource (
    id SERIAL PRIMARY KEY,
    companyId INT NOT NULL,
    name VARCHAR(255),
    type VARCHAR(255),
    quantity INT,
    status VARCHAR(50),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (companyId) REFERENCES Company(id)
);

-- MockItem Table
CREATE TABLE MockItem (
    id SERIAL PRIMARY KEY,
    companyId INT NOT NULL,
    name VARCHAR(255),
    type VARCHAR(255),
    available BOOLEAN,
    FOREIGN KEY (companyId) REFERENCES Company(id)
);

-- Payroll Table
CREATE TABLE Payroll (
    id SERIAL PRIMARY KEY,
    companyId INT NOT NULL,
    workerId INT,
    periodStart DATE,
    periodEnd DATE,
    regularHours NUMERIC,
    overtimeHours NUMERIC,
    regularRate NUMERIC,
    overtimeRate NUMERIC,
    totalPay NUMERIC,
    status VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (companyId) REFERENCES Company(id),
    FOREIGN KEY (workerId) REFERENCES Worker(id)
);

-- JobSchedules Table
CREATE TABLE JobSchedules (
    id SERIAL PRIMARY KEY,
    companyId INT NOT NULL,
    jobId INT,
    workerScheduleId INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (companyId) REFERENCES Company(id),
    FOREIGN KEY (jobId) REFERENCES Job(id),
    FOREIGN KEY (workerScheduleId) REFERENCES WorkerSchedule(id)
);

-- JobSchedulesHistory Table
CREATE TABLE JobSchedulesHistory (
    id SERIAL PRIMARY KEY,
    companyId INT NOT NULL,
    jobScheduleId INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (companyId) REFERENCES Company(id),
    FOREIGN KEY (jobScheduleId) REFERENCES JobSchedules(id)
);

-- Quotes Table
CREATE TABLE Quotes (
    id SERIAL PRIMARY KEY,
    companyId INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    customerName TEXT,
    sourceAddress TEXT,
    destinationAddress TEXT,
    items JSONB,
    status TEXT,
    totalPrice NUMERIC,
    userId INT,
    FOREIGN KEY (companyId) REFERENCES Company(id)
);

-- WorkerSchedulesHistory Table
CREATE TABLE WorkerSchedulesHistory (
    id SERIAL PRIMARY KEY,
    companyId INT NOT NULL,
    workerScheduleId INT,
    status TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (companyId) REFERENCES Company(id),
    FOREIGN KEY (workerScheduleId) REFERENCES WorkerSchedule(id)
);

-- Add the Customer table
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add the Quotes table (updated to include customer_id)
CREATE TABLE IF NOT EXISTS quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,  -- Added customer_id
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    source_address TEXT NOT NULL,
    destination_address TEXT NOT NULL,
    items JSONB NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    total_price DECIMAL(10, 2) NOT NULL,
    created_by UUID REFERENCES users(id), -- Added created_by
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

