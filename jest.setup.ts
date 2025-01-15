import { Client } from 'pg';

beforeAll(async () => {
  // Connect to the test database
  const client = new Client({
    connectionString: process.env.TEST_DATABASE_URL,
  });
  await client.connect();
  global.pgClient = client;
});

afterAll(async () => {
  // Disconnect from the test database
  await global.pgClient.end();
});

// Mock matchMedia
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};