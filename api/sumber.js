// Import database
const knex = require("./db.js");

// Import middleware
const allowCors = require("./middlewares/allow-cors.js");

// Retrieve all sumber
function handler(req, res) {
  knex
    .select("*")
    .from("sumber")
    .then((sumbers) => {
      res.json(sumbers);
    })
    .catch((err) => {
      res.json({ message: `There was an error retrieving sumber: ${err}` });
    });
}

module.exports = allowCors(handler);
