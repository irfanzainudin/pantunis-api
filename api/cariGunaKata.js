// Import database
const knex = require("./db.js");

// Import middleware
const allowCors = require("./middlewares/allow-cors.js");

// Retrieve specific pantun using a user-supplied word
function handler(req, res) {
  let query = knex("pantun")
    .join("sumber", "pantun.sumber", "=", "sumber.id");

  if (req.query.kata.length === 0) {
    // Return only first 100 pantun if parameter "kata" is empty
    query = query.limit(100);

  } else {
    // Append <KATA> to query
    query = query
      .whereLike("bayang1", "%" + req.query.kata + "%")
      .orWhereLike("bayang2", "%" + req.query.kata + "%")
      .orWhereLike("maksud1", "%" + req.query.kata + "%")
      .orWhereLike("maksud2", "%" + req.query.kata + "%");
  }

  // Add SELECT statement and perform the query
  query.select(
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
    .then((response) => {
      // Send the specific extracted pantun from database in response
      res.json(response);
    })
    .catch((err) => {
      // Send a error message in response
      res.json({
        message: `There was an error retrieving pantuns using "${req.query.kata}": ${err}`,
      });
    });
}

module.exports = allowCors(handler);
