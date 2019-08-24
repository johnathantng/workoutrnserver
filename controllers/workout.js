const handleWorkoutCreate = (req, res, db) => {
	const { id, exercise } = req.params;
	const { userName, workoutName, workoutType, workoutReps, workoutSets } = req.body;

	return db('workouts')
		.insert({
			id: id,
			username: userName,
			workout: workoutName,
			type: workoutType,
			current_reps: 0,
			current_sets: 0,
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

const handleWorkoutUpdate = (req, res, db) => {
	const { id, workout_id } = req.params;
	const { 
		workoutName, 
		workoutType, 
		currentReps,
		currentSets,
		targetReps, 
		targetSets 
	} = req.body;

	return db('workouts').where({ workout_id: workout_id })
		.update({
			workout: workoutName,
			type: workoutType,
			current_reps: currentReps,
			current_sets: currentSets,
			target_reps: targetReps,
			target_sets: targetSets
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
	handleWorkoutGet: handleWorkoutGet,
	handleWorkoutIdGet: handleWorkoutIdGet,
	handleWorkoutUpdate: handleWorkoutUpdate,
	handleWorkoutDelete: handleWorkoutDelete,
	handleWorkoutCreate: handleWorkoutCreate
}