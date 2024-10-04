// Import database
const knex = require("./db.js");

// Import middleware
const allowCors = require("./middlewares/allow-cors.js");

// Retrieve specific pantun using a user-supplied word
function handler(req, res) {
  // Return only first 100 pantun if parameter "kata" is empty
  if (req.query.kata.length === 0) {
    knex("pantun")
    .limit(100)
    .join("sumber", "pantun.sumber", "=", "sumber.id")
    .select(
      "pantun.id as pantun_id",
      "pantun.bayang1 as pantun_bayang1",
      "pantun.bayang2 as pantun_bayang2",
      "pantun.maksud1 as pantun_maksud1",
      "pantun.maksud2 as pantun_maksud2",
      "pantun.jenis as pantun_jenis",
      "sumber.id as sumber_id",
      "sumber.tajuk as sumber_tajuk",
      "sumber.pengkarya as sumber_pengkarya",
      "sumber.pautan as sumber_pautan"
    )
    // NOTE:
    // 1. orWhereILike() doesn't work for SQLite since
    // ... SQLite is case-insensitive by default:
    // ... https://github.com/sequelize/sequelize/issues/4384#issuecomment-134217570
    // 
    // 2. Need to use req.query for URLs like "?kata=<KATA>":
    // ... https://stackoverflow.com/questions/20089582/how-to-get-a-url-parameter-in-express
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
        message: `There was an error retrieving the first 100 pantun ${req.query.kata}: ${err}`,
      });
    });

    // NOTE:
    // 1. Not returning something will cause an ERR_HTTP_HEADERS_SENT error
    // 
    // 2. -1 is arbitrary
    // 
    // 3. TODO: might cause problems in the future
    return -1;
  }
  // Find specific pantun in the database
  knex("pantun")
    .join("sumber", "pantun.sumber", "=", "sumber.id")
    .select(
      "pantun.id as pantun_id",
      "pantun.bayang1 as pantun_bayang1",
      "pantun.bayang2 as pantun_bayang2",
      "pantun.maksud1 as pantun_maksud1",
      "pantun.maksud2 as pantun_maksud2",
      "pantun.jenis as pantun_jenis",
      "sumber.id as sumber_id",
      "sumber.tajuk as sumber_tajuk",
      "sumber.pengkarya as sumber_pengkarya",
      "sumber.pautan as sumber_pautan"
    )
    // NOTE:
    // 1. orWhereILike() doesn't work for SQLite since
    // ... SQLite is case-insensitive by default:
    // ... https://github.com/sequelize/sequelize/issues/4384#issuecomment-134217570
    // 
    // 2. Need to use req.query for URLs like "?kata=<KATA>":
    // ... https://stackoverflow.com/questions/20089582/how-to-get-a-url-parameter-in-express
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
