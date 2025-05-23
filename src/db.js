import { PGlite } from '@electric-sql/pglite';

const db = new PGlite("idb://patients-db");

await db.exec(`
  CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY,
    name TEXT,
    age INTEGER,
    condition TEXT
  );
`);

export default db;
