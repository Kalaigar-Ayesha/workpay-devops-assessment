import { DatabaseInterface } from './interface.js';
import { PostgresDatabase } from './postgres.js';
import { MemoryDatabase } from './memory.js';

const db: DatabaseInterface =
  process.env.DB_TYPE === 'memory' ? new MemoryDatabase() : new PostgresDatabase();

export { db };

