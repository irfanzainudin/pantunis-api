// Import database
const knex = require("./db.js");

// Import middleware
const allowCors = require("./middlewares/allow-cors.js");

// Find pantuns according to themes (tema)
function handler(req, res) {
  knex("tema_pantun")
    .join("pantun", "tema_pantun.pantun", "=", "pantun.id")
    .join("tema", "tema_pantun.tema", "=", "tema.id")
    .join("sumber", "pantun.sumber", "=", "sumber.id")
    .select(
      "pantun.id as pantun_id",
      "pantun.bayang1 as pantun_bayang1",
      "pantun.bayang2 as pantun_bayang2",
      "pantun.maksud1 as pantun_maksud1",
      "pantun.maksud2 as pantun_maksud2",
      "pantun.jenis as pantun_jenis",
      "tema.id as tema_id",
      "tema.tema as tema",
      "sumber.tajuk as sumber_tajuk",
      "sumber.pengkarya as sumber_pengkarya",
      "sumber.pautan as sumber_pautan"
    )
    .whereLike("tema.id", req.query.tema)
    .then((response) => {
      // Send the specific extracted pantun from database in response
      res.json(response);
    })
    .catch((err) => {
      // Send a error message in response
      res.json({
        message: `There was an error retrieving pantuns with theme ${req.query.tema}: ${err}`,
      });
    });
}

module.exports = allowCors(handler);
