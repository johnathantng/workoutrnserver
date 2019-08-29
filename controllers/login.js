const handleLogin = (req, res, db, bcrypt) => {
	const { username, hash } = req.body;

	if (!username || !hash) {
		return res.status(400).json('incorrect form submission');
	}

	db.select('username', 'hash').from('login')
		.whereRaw('LOWER(username) LIKE ?', '%'+username.toLowerCase()+'%')
		.then(data => {
			const isValid = bcrypt.compareSync(hash, data[0].hash);
			if (isValid) {
				db('login')
					.where('username', '=', username)
					.update({
						last_login: new Date()
					})
					.then(() => {
						return db.select('*').from('users')
						.where('username', '=', username)
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