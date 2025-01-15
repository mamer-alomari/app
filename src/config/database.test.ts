import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import fs from 'fs';

// Ensure test database directory exists
const TEST_DB_DIR = path.join(__dirname, '../../test-db');
if (!fs.existsSync(TEST_DB_DIR)) {
  fs.mkdirSync(TEST_DB_DIR);
}

export const TEST_DB_PATH = path.join(TEST_DB_DIR, 'test.sqlite');

export async function getTestDb() {
  return open({
    filename: TEST_DB_PATH,
    driver: sqlite3.Database
  });
}

export async function setupTestDb() {
  const db = await getTestDb();
  
  // Read schema and seed files
  const schema = fs.readFileSync(path.join(__dirname, '../../database/schema.sql'), 'utf8');
  const seed = fs.readFileSync(path.join(__dirname, '../../database/seed.sql'), 'utf8');
  
  // Convert PostgreSQL syntax to SQLite
  const sqliteSchema = schema
    .replace(/UUID/g, 'TEXT')
    .replace(/TIMESTAMP WITH TIME ZONE/g, 'DATETIME')
    .replace(/DECIMAL\([^)]+\)/g, 'REAL')
    .replace(/CREATE TYPE [^;]+;/g, '') // Remove CREATE TYPE statements
    .replace(/GENERATED ALWAYS AS .* STORED/g, '') // Remove computed columns
    .replace(/CREATE EXTENSION.*?;/g, '') // Remove PostgreSQL extensions
    .replace(/CREATE OR REPLACE FUNCTION.*?END;/gms, ''); // Remove PostgreSQL functions

  // Split into individual statements
  const statements = sqliteSchema.split(';').filter(stmt => stmt.trim());
  
  // Execute schema
  for (const statement of statements) {
    await db.exec(statement);
  }
  
  // Convert and execute seed data
  const sqliteSeed = seed
    .replace(/'[^']*'::/g, "'") // Remove PostgreSQL type casts
    .replace(/-05:00/g, ''); // Remove timezone offsets
    
  const seedStatements = sqliteSeed.split(';').filter(stmt => stmt.trim());
  
  for (const statement of seedStatements) {
    await db.exec(statement);
  }
  
  return db;
}

export async function teardownTestDb() {
  if (fs.existsSync(TEST_DB_PATH)) {
    fs.unlinkSync(TEST_DB_PATH);
  }
} 