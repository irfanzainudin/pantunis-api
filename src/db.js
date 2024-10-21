// Connect to database

// Import path module
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get the location of database.sqlite file
// PROD
const dbPath = path.resolve(__dirname, "db/database.sqlite");
// DEV
// const dbPath = path.resolve(__dirname, "db/dev.sqlite");

import knex from "knex";

const db = knex({
  client: "sqlite3",
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true,
});

// Create a table in the database called "pantun"
db.schema
  // Make sure no "pantun" table exists
  // before trying to create new
  .hasTable("pantun")
  .then((exists) => {
    if (!exists) {
      // If no "pantun" table exists
      // create new, with "id", "bayang1", "bayang2",
      // "maksud1" and "maksud2" columns
      // and use "id" as a primary identification
      // and increment "id" with every new record (pantun)
      return db.schema
        .createTable("pantun", (table) => {
          table.increments("id").primary();
          table.string("bayang1");
          table.string("bayang2");
          table.string("maksud1");
          table.string("maksud2");
        })
        .then(() => {
          // Log success message
          console.log("Table 'pantun' created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    // Log success message
    console.log("done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

// Just for debugging purposes:
// Log all data in "pantun" table
db
  .select("*")
  .from("pantun")
  // .then((data) => console.log("data:", data)) // NOTE: keeping my dev server's log clean
  .then(() => {})
  .catch((err) => console.log(err));

// Export the database
// module.exports = knex;

export default db;