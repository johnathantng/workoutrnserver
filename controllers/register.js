const handleRegister = (req, res, db, bcrypt) => {
	const { password } = req.body;
	let { username, email } = req.body;

	if (!email || !username || !password) {
		return res.status(400).json('incorrect form submission')
	} else {

		username = username.toLowerCase();
		email = email.toLowerCase();
		const salt = bcrypt.genSaltSync(11);
		const passHash = bcrypt.hashSync(password, salt);

		db.transaction(trx => {
			trx.insert({
				password: passHash,
				email: email,
				username: username
			})
			.into('login')
			.returning('email')
			.then(loginEmail => {
				return trx('users')
				.insert({
					email: loginEmail[0],
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