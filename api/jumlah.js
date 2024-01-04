// Import database
const knex = require("./db.js");

// Count the number of pantuns in database
export default async function handler(req, res) {
  knex
    .count("*")
    .from("pantun") // from 'pantun' table
    .then((count) => {
      // Send total number of pantuns in database
      res.json(count);
    })
    .catch((err) => {
      // Send a error message in response
      res.json({ message: `There was an error counting pantun: ${err}` });
    });
}
