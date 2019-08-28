const handleMealCreate = (req, res, db) => {
	const { id, meal } = req.params;
	const { userName, carbs, protein, fat, calories } = req.body;

	console.log(req.body);

	return db('meals')
		.insert({
			id: id,
			username: userName,
			meal: meal,
			calories: calories,
			carbs: carbs,
			protein: protein,
			fat: fat
		})
		.then(() => res.json('meal added'))
		.catch(err => {
			console.log(err)
			res.status(400).json('unable to add meal')
		});
}

const handleMealGet = (req, res, db) => {
	const { id, meal } = req.params;

	db.select('*').from('meals').where({ id: id })
		.then(data => {
			if (data.length) {
				res.json(data)
			} else {
				res.status(400).json('not found')
			}
		})
		.catch(err => res.status(400).json('something went wrong'))
}

const handleMealIdGet = (req, res, db) => {
	const { id, meal_id } = req.params;

	db('meals').where({ meal_id: meal_id })
		.then(data => {
			if (data.length) {
				res.json(data[0])
			} else {
				res.status(400).json('Not found')
			}
		})
		.catch(err => res.status(400).json('error getting meal'))
}

const handleMealUpdate = (req, res, db) => {
	const { id, meal_id } = req.params;
	const { 
		meal, 
		calories, 
		carbs,
		protein,
		fat
	} = req.body;
	console.log(req.params, req.body)

	return db('meals').where({ meal_id: meal_id })
		.update({
			meal: meal,
			carbs: carbs,
			protein: protein,
			fat: fat,
			calories: calories
		})
		.then(() => res.json('meal updated'))
		.catch(err => {
			console.log(err)
			res.status(400).json('unable to update meal')
		})
}

const handleMealDelete = (req, res, db) => {
	const { id, meal_id } = req.params;

	return db('meals').where({ meal_id: meal_id })
		.delete()
		.then(() => res.json('meal deleted'))
		.catch(err => {
			console.log(err);
			res.status(400).json('unable to delete meal');
		})
}

module.exports = {
	handleMealGet: handleMealGet,
	handleMealIdGet: handleMealIdGet,
	handleMealUpdate: handleMealUpdate,
	handleMealDelete: handleMealDelete,
	handleMealCreate: handleMealCreate
}