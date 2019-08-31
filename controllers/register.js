const handleRegister = (req, res, db, bcrypt) => {
	const { hash } = req.body;
	const { username, email } = req.body;

	//need case insensitivity in register field

	if (!email || !username || !hash) {
		return res.status(400).json('incorrect form submission')
	} else {

		const salt = bcrypt.genSaltSync(11);
		const passHash = bcrypt.hashSync(hash, salt);

		db.transaction(trx => {
			trx.insert({
				hash: passHash,
				email: email,
				username: username,
				created_on: new Date()
			})
			.into('login')
			.returning('email')
			.then(loginEmail => {
				return trx('users')
				.insert({
					username: username
				})
				.then(user => {
					res.json('Registered user');
				})
			})
			.then(trx.commit)
			.catch(trx.rollback)
		})
		.catch(err =>  res.status(400).json('unable to register'));
	}
}


module.exports = {
	handleRegister: handleRegister
}