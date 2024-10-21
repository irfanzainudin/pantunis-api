import express from "express";
// import knex from "./db";
import cariGunaID from "./cariGunaID.js";
import cariGunaKata from "./cariGunaKata.js";
import cariGunaKataTepat from "./cariGunaKataTepat.js";
import cariGunaSumber from "./cariGunaSumber.js";
import cariGunaTema from "./cariGunaTema.js";
import jumlah from "./jumlah.js";

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

app.get('/', (req, res) => {
    return res.status(200).send(`<h1>Hello World! NODE_ENV is ${NODE_ENV}</h1>`);
});

app.get('/jumlah', jumlah);

app.get('/cariGunaID', cariGunaID);

app.get('/cariGunaKata', cariGunaKata);

app.get('/cariGunaKataTepat', cariGunaKataTepat);

app.get('/cariGunaSumber', cariGunaSumber);

app.get('/cariGunaTema', cariGunaTema);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}.`);
});