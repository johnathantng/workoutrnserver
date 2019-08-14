const handleProfileGet = (req, res, db) => {
	const { id } = req.params;
	db.select('*').from('login').where({user_id: id})
		.then(user => {
			console.log(user[0])
		if (user.length) {
			res.json(user[0])
		} else {
			res.status(400).json('Not found')
		}
	})
		.catch(err => res.status(400).json('error getting user'))
}

const handleProfileCreate = (req, res, db) => {
	const { id, gender, age, height, weight } = req.body;

	if (!gender || !age || !height || !weight) {
		return res.status(400).json('incorrect form submission')
	} else {

		return db('users')
			.where('id', '=', id)
			.update({
				id: id,
				gender: gender,
				age: age,
				height: height,
				weight: weight
			})
			.then(() => {
				res.json("user profile updated");
			})
			.catch(err => {
				res.status(400).json('unable to create user')
			});
	}
}

module.exports = {
	handleProfileGet: handleProfileGet,
	handleProfileCreate: handleProfileCreate
};