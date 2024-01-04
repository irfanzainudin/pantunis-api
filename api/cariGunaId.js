// Import database
const knex = require("./db.js");

// Retrieve specific pantun using id
export default function handler(req, res) {
  // Find specific pantun in the database
  knex("pantun")
    .where("id", req.body.id) // find correct record based on id
    .then((response) => {
      // Send the specific extracted pantun from database in response
      res.json(response);
    })
    .catch((err) => {
      // Send a error message in response
      res.json({
        message: `There was an error retrieving pantun ${req.body.id}: ${err}`,
      });
    });
}
