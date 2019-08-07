const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const app = express();
app.use(bodyParser.json());


app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));