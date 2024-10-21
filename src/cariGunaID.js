// Import database
import knex from "./db.js";

// Import middleware
import allowCors from "./middlewares/allow-cors.js";

// Retrieve specific pantun using a user-supplied word
function handler(req, res) {
  // Find specific pantun in the database using pantun ID
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
    .where("pantun_id", req.query.id)
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
};

export default allowCors(handler);
