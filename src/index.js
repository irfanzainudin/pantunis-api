import express from "express";
import cors from "cors";
// import knex from "./db";
import jumlah from "./jumlah.js";
import cariGunaID from "./cariGunaID.js";
import cariGunaKata from "./cariGunaKata.js";
import cariGunaKataTepat from "./cariGunaKataTepat.js";
import cariGunaSumber from "./cariGunaSumber.js";
import cariGunaTema from "./cariGunaTema.js";
import dermaPantun from "./dermaPantun.js";
import jumlah from "./jumlah.js";

// import path, { dirname } from "path";
// import { fileURLToPath } from 'url';
// import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// const PORT = process.env.PORT || 3000;
// const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 3002;
const NODE_ENV = process.env.NODE_ENV || "development";

app.get('/', (req, res) => {
    return res.status(200).send(`<h1>Hello World, this is the Pantunis API landing page! NODE_ENV is ${NODE_ENV}</h1>`);
});

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// app.get('/', (req, res) => {
//     // return res.status(200).send(`<h1>Hello World! NODE_ENV is ${NODE_ENV}</h1>`);
//     fs.readFile(path.resolve(__dirname, "index.html"), 'utf8', (err, text) => {
//         res.status(200).send(text);
//     });
// });

app.get('/jumlah', jumlah);

app.get('/cariGunaID', cariGunaID);

app.get('/cariGunaKata', cariGunaKata);

app.get('/cariGunaKataTepat', cariGunaKataTepat);

app.get('/cariGunaSumber', cariGunaSumber);

app.get('/cariGunaTema', cariGunaTema);

app.post('/dermaPantun', dermaPantun);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}.`);
});