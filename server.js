const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const login = require('./controllers/login');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const workout = require('./controllers/workout');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = knex({
	client: 'pg',
	connection: {
		host : `${process.env.DB_HOST}`,
		user : `${process.env.DB_USER}`,
		password : `${process.env.DB_PASS}`,
		database : `${process.env.DB_NAME}`,
	}
});

app.get('/', (req, res) => { res.send(database.users) });
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });
app.get('/profile/:id/workouts', (req, res) => { workout.handleWorkoutGet(req, res, db) });
app.get('/profile/:id/workouts/:workout_id', (req, res) => { workout.handleWorkoutIdGet(req, res, db) });
app.put('/profile/:id/workouts/:workout_id', (req, res) => { workout.handleWorkoutUpdate(req, res, db) });
app.delete('/profile/:id/workouts/:workout_id', (req, res) => { workout.handleWorkoutDelete(req, res, db) });
app.post('/profile/:id', (req, res) => { profile.handleProfileCreate(req, res, db) });
app.post('/profile/:id/workouts/:exercise', (req, res) => { workout.handleWorkoutCreate(req, res, db) });
app.post('/login', (req, res) => { login.handleLogin(req, res, db, bcrypt) });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));