const handleProfileGet = (req, res, db) => {
	const { id } = req.params;
	db.select('*').from('users').where({ id: id })
		.then(user => {
		if (user.length) {
			res.json(user[0])
		} else {
			res.status(400).json('Not found')
		}
	})
		.catch(err => res.status(400).json('error getting user'))
}

const handleWorkoutIdGet = (req, res, db) => {
	const { id, workout_id } = req.params;

	db('workouts').where({ workout_id: workout_id })
		.then(data => {
			if (data.length) {
				res.json(data[0])
			} else {
				res.status(400).json('Not found')
			}
		})
		.catch(err => res.status(400).json('error getting workout'))
}

const handleProfileCreate = (req, res, db) => {
	const { id } = req.params;
	const { gender, age, height, weight } = req.body;

	if (!gender || !age || !height || !weight) {
		return res.status(400).json('incorrect form submission')
	} else if (gender == 0 || age == 0 || height == 0 || weight == 0) {
		return res.status(400).json('incorrect form submission')
	} else {

		return db('users')
			.where({ id: id })
			.update({
				gender: gender,
				age: age,
				height: height,
				weight: weight
			})
			.then(() => {
				res.json("user profile updated");
			})
			.catch(err => {
				res.status(400).json('unable to create user');
			});
	}
}

const handleWorkoutCreate = (req, res, db) => {
	const { id, exercise } = req.params;
	const { userName, workoutName, workoutType, workoutReps, workoutSets } = req.body;

	return db('workouts')
		.insert({
			id: id,
			username: userName,
			workout: workoutName,
			type: workoutType,
			target_reps: workoutReps,
			target_sets: workoutSets
		})
		.then(() => res.json('workout added'))
		.catch(err => {
			console.log(err)
			res.status(400).json('unable to add workout')
		});
}

const handleWorkoutGet = (req, res, db) => {
	const { id, exercise } = req.params;

	db.select('*').from('workouts').where({ id: id })
		.then(data => {
			if (data.length) {
				res.json(data)
			} else {
				res.status(400).json('not found')
			}
		})
		.catch(err => res.status(400).json('something went wrong'))
}

const handleWorkoutUpdate = (req, res, db) => {
	const { id, workout_id } = req.params;
	const { workoutName, workoutType, workoutReps, workoutSets } = req.body;

	return db('workouts').where({ workout_id: workout_id })
		.update({
			workout: workoutName,
			type: workoutType,
			target_reps: workoutReps,
			target_sets: workoutSets
		})
		.then(() => res.json('workout updated'))
		.catch(err => {
			console.log(err)
			res.status(400).json('unable to update workout')
		})
}

const handleWorkoutDelete = (req, res, db) => {
	const { id, workout_id } = req.params;

	return db('workouts').where({ workout_id: workout_id })
		.delete()
		.then(() => res.json('workout deleted'))
		.catch(err => {
			console.log(err);
			res.status(400).json('unable to delete workout');
		})
}

module.exports = {
	handleProfileGet: handleProfileGet,
	handleWorkoutGet: handleWorkoutGet,
	handleWorkoutUpdate: handleWorkoutUpdate,
	handleWorkoutDelete: handleWorkoutDelete,
	handleProfileCreate: handleProfileCreate,
	handleWorkoutCreate: handleWorkoutCreate
};