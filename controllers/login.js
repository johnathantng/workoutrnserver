const handleLogin = (req, res, db, bcrypt) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json('incorrect form submission');
	}

	db.select('username', 'password').from('login')
		.where('username', '=', username)
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].password);
			if (isValid) {
				return db.select('*').from('users')
					.where('username', '=', username)
					.then(user => {
						return res.json(user[0]);
					})
					.catch(error => res.status(404).json('unable to get user'))
			} else {
				res.status(400).json('wrong credentials')
			}
		})
		.catch(err => res.status(400).json('wrong user'))
}

module.exports = {
	handleLogin: handleLogin
}