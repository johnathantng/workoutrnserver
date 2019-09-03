const handleLogin = (req, res, db, bcrypt) => {
	const { username, hash } = req.body;

	if (!username || !hash) {
		return res.status(400).json('incorrect form submission');
	}

	const convertUser = username.toLowerCase();

	//research on case insensitivity
	//plan is to create another column with login_user for the way the user types in their username

	db.select('username', 'hash').from('login')
		.where('login_user', '=', convertUser)
		.then(data => {
			res.send(data);
			const isValid = bcrypt.compareSync(hash, data[0].hash);
			if (isValid) {
				db('login')
					.where('login_user', '=', convertUser)
					.update({
						last_login: new Date()
					})
					.then(() => {
						return db.select('*').from('users')
						.where('login_user', '=', convertUser)
						.then(user => {
							return res.json(user[0]);
						})
						.catch(error => res.status(404).json('unable to get user'))
					})
			} else {
				res.status(400).json('wrong credentials')
			}
		})
		.catch(err => res.status(400).json('wrong user'))
}

module.exports = {
	handleLogin: handleLogin
}