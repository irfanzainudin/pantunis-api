# pantunis-api

Simple backend for [Pantunis](https://www.pantunis.com/)

Github repo for Pantunis frontend: [Repo](https://github.com/irfanzainudin/pantunis)

## References

- [Shadowsmith](https://shadowsmith.com/thoughts/how-to-deploy-an-express-api-to-vercel)
- [Alex Devero](https://blog.alexdevero.com/react-express-sqlite-app/)

## Suggestions for Developments

I use this setup to create and test new endpoints. You can clone this repo, copy and paste this JS code into `index.js` at the root of the repo and it should work fine. Let me know if you have trouble setting up.

```js
// Add Express
const express = require("express");

// Import database
const knex = require("./api/db.js");

// Initialize Express
const app = express();

const fs = require("fs");

// Create GET request
app.get("/", (req, res) => {
    // res.send("Express on Vercel");
    fs.readFile('./index.html', 'utf8', (err, text) => {
      res.send(text);
    });
});

// ###############################
// ########  PRODUCTION  #########
// ###############################

// Retrieve specific pantun using a user-supplied word
app.get("/cariGunaKata", (req, res) => {
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
});

// Retrieve pantuns from a source
app.get("/cariGunaSumber", (req, res) => {
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
    .where("sumber.id", "=", req.query.sumber)
    .then((response) => {
      // Send the specific extracted pantun from database in response
      res.json(response);
    })
    .catch((err) => {
      // Send a error message in response
      res.json({
        message: `There was an error retrieving pantun ${req.query.sumber}: ${err}`,
      });
    });
});

app.get("/cariGunaTema", (req, res) => {
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
});

app.get("/jumlah", (req, res) => {
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
});

// Initialize server
app.listen(5001, () => {
    console.log("Running on port 5001.");
});

// Export the Express API
module.exports = app;
```