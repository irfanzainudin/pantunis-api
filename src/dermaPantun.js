// Import database
import knex from "./db.js";

// Import middleware
import allowCors from "./middlewares/allow-cors.js";

// Retrieve specific pantun using a user-supplied word
function handler(req, res) {
  // Find specific pantun in the database using pantun ID
  knex("pantun")
    .insert({
      bayang1: req.body.bayang1,
      bayang2: req.body.bayang2 || "",
      maksud1: req.body.maksud1,
      maksud2: req.body.maksud2 || "",
      jenis: req.body.jenis,
      sumber: req.body.sumber,
    })
    .then((response) => {
      // Send the specific extracted pantun from database in response
      res.json(response);
    })
    .catch((err) => {
      // Send a error message in response
      res.json({
        message: `There was an error inserting into pantun using "${req.query.kata}": ${err}`,
      });
    });
};

export default allowCors(handler);
