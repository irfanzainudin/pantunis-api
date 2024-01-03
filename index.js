// Reference: https://blog.alexdevero.com/react-express-sqlite-app/

// Import dependencies
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const compression = require("compression");
// const helmet = require("helmet");
// const path = require("path");

// Get the location of database.sqlite file
// const dbPath = path.resolve(__dirname, "db/database.sqlite");

// // Create connection to SQLite database
// const knex = require("knex")({
//   client: "sqlite3",
//   connection: {
//     filename: dbPath,
//   },
//   useNullAsDefault: true,
// });

// Import routes
// const pantunRouter = require("./routes/pantun-route");

// Create express app
const app = express();

// Apply middleware
// Note: Keep this at the top, above routes
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());
// app.use(helmet());
// app.use(
//   helmet.contentSecurityPolicy({
//     useDefaults: false,
//     "block-all-mixed-content": true,
//     "upgrade-insecure-requests": true,
//     directives: {
//       "default-src": ["'self'"],
//       "base-uri": "'self'",
//       "font-src": ["'self'", "https:", "data:"],
//       "frame-ancestors": ["'self'"],
//       "img-src": ["'self'", "data:"],
//       "object-src": ["'none'"],
//       "script-src": ["'self'", "https://cdnjs.cloudflare.com"],
//       "script-src-attr": "'none'",
//       "style-src": ["'self'", "https://cdnjs.cloudflare.com"],
//     },
//   }),
//   helmet.dnsPrefetchControl({
//     allow: true,
//   }),
//   helmet.frameguard({
//     action: "deny",
//   }),
//   helmet.hidePoweredBy(),
//   helmet.hsts({
//     maxAge: 123456,
//     includeSubDomains: false,
//   }),
//   helmet.ieNoOpen(),
//   helmet.noSniff(),
//   helmet.referrerPolicy({
//     policy: ["origin", "unsafe-url"],
//   }),
//   helmet.xssFilter()
// );

// Implement pantun route
// app.use("/pantun", pantunRouter);

// home
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

// Retrieve all pantun
// app.get("/semua", async (req, res) => {
//   // Get all pantun from database
//   knex
//     .select("*") // select all records
//     .from("pantun") // from 'pantun' table
//     .then((userData) => {
//       // Send extracted pantun from database in response
//       res.json(userData);
//     })
//     .catch((err) => {
//       // Send a error message in response
//       res.json({ message: `There was an error retrieving pantun: ${err}` });
//     });
// });

// app.get("/cariPantunGunaKata", async (req, res) => {
//   // Find specific pantun in the database
//   knex("pantun")
//     .select("*")
//     // NOTE: orWhereILike() doesn't work for SQLite since SQLite is case-insensitive by default: https://github.com/sequelize/sequelize/issues/4384#issuecomment-134217570
//     // NOTE: need to use req.query for URLs like "?kata=<KATA>": https://stackoverflow.com/questions/20089582/how-to-get-a-url-parameter-in-express
//     .whereLike("bayang1", "%" + req.query.kata + "%")
//     .orWhereLike("bayang2", "%" + req.query.kata + "%")
//     .orWhereLike("maksud1", "%" + req.query.kata + "%")
//     .orWhereLike("maksud2", "%" + req.query.kata + "%")
//     .then((response) => {
//       // Send the specific extracted pantun from database in response
//       res.json(response);
//     })
//     .catch((err) => {
//       // Send a error message in response
//       res.json({
//         message: `There was an error retrieving pantun ${req.query.kata}: ${err}`,
//       });
//     });
// });

// app.get("/jumlahPantun", async (req, res) => {
//   // Get all pantun from database
//   knex
//     .count("*")
//     .from("pantun") // from 'pantun' table
//     .then((userData) => {
//       // Send extracted pantun from database in response
//       res.json(userData);
//     })
//     .catch((err) => {
//       // Send a error message in response
//       res.json({ message: `There was an error counting pantun: ${err}` });
//     });
// });

// // Implement 500 error route
// app.use(function (err, req, res, next) {
//   console.error(err.stack);
//   res.status(500).send("Something is broken.");
// });

// // Implement 404 error route
// app.use(function (req, res, next) {
//   res.status(404).send("Sorry we could not find that.");
// });

// Start express app
app.listen(5000, function () {
  console.log(`Server is running on port 5000.`);
});

// Export the Express API
module.exports = app;
