import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

// Create the neon client
const sql = neon(process.env.DATABASE_URL!);

// Create the drizzle instance with schema
export const db = drizzle({ client: sql, schema });

// Export types for type inference
export type Database = typeof db;

// Export all schema tables and types
export { 
  decksTable, 
  cardsTable, 
  studySessionsTable 
} from './schema';
