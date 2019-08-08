const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const app = express();
app.use(bodyParser.json());

const db = knex({
	client: 'pg',
	connection: {
		host : `${process.env.DB_HOST}`,
		user : `${process.env.DB_USER}`,
		password : `${process.env.DB_PASS}`,
		database : `${process.env.DB_NAME}`,
	}
});

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));