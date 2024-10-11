// Import database
const knex = require("./db.js");

// Import middleware
const allowCors = require("./middlewares/allow-cors.js");

// Retrieve specific pantun using a user-supplied word
function handler(req, res) {
  // Find specific pantun in the database
  knex("pantun_fts")
    .join("sumber", "pantun_fts.sumber", "=", "sumber.id")
    .select(
      "pantun_fts.id as pantun_fts_id",
      "pantun_fts.bayang1 as pantun_bayang1",
      "pantun_fts.bayang2 as pantun_bayang2",
      "pantun_fts.maksud1 as pantun_maksud1",
      "pantun_fts.maksud2 as pantun_maksud2",
      "pantun_fts.jenis as pantun_jenis",
      "sumber.id as sumber_id",
      "sumber.tajuk as sumber_tajuk",
      "sumber.pengkarya as sumber_pengkarya",
      "sumber.pautan as sumber_pautan"
    )
    .whereRaw("pantun_fts match 'bayang1:" + req.query.kata + " OR bayang2:" + req.query.kata + " OR maksud1:" + req.query.kata + " OR maksud2:" + req.query.kata + "'")
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
