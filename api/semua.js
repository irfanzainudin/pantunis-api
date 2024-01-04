// Import database
const knex = require("./db.js");

// Retrieve all pantun
export default function handler(req, res) {
  // Get all pantun from database
  knex
    .select("*") // select all records
    .from("pantun") // from 'pantun' table
    .then((pantuns) => {
      // Send extracted pantun from database in response
      res.json(pantuns);
    })
    .catch((err) => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving pantun: ${err}` });
    });
}
