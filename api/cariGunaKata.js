// Import database
const knex = require("./db.js");

// Import middleware
const allowCors = require("./middlewares/allow-cors.js");

// Retrieve specific pantun using a user-supplied word
function handler(req, res) {
  // Find specific pantun in the database
  knex("pantun")
    .join("sumber", "pantun.sumber", "=", "sumber.id")
    .select("*")
    // NOTE: orWhereILike() doesn't work for SQLite since SQLite is case-insensitive by default: https://github.com/sequelize/sequelize/issues/4384#issuecomment-134217570
    // NOTE: need to use req.query for URLs like "?kata=<KATA>": https://stackoverflow.com/questions/20089582/how-to-get-a-url-parameter-in-express
    .whereLike("bayang1", "%" + req.query.kata + "%")
    .orWhereLike("bayang2", "%" + req.query.kata + "%")
    .orWhereLike("maksud1", "%" + req.query.kata + "%")
    .orWhereLike("maksud2", "%" + req.query.kata + "%")
    .then((response) => {
      // Send the specific extracted pantun from database in response
      res.json(response);
    })
    .catch((err) => {
      // Send a error message in response
      res.json({
        message: `There was an error retrieving pantun ${req.query.kata}: ${err}`,
      });
    });
}

module.exports = allowCors(handler);
