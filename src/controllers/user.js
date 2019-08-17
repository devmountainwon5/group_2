module.exports = {
	user: (req, res) => {
		const db = req.app.get("db");

		const { email, last_name, first_name, username, profilepic } = req.body;
		req.session.email = email;

		db.user_table
			.findOne({ email })
			.then(user => {
				if (!user) {
					db.user_table
						.insert({
							email,
							last_name,
							first_name,
							username,
							profilepic
						})
						.then(newUser => {
							console.log(newUser);
							req.session.user_id = newUser.id;
						});
				} else {
					req.session.user_id = user.id;
				}
			})
			.then(() => {
				res.send({ success: true });
			})
			.catch(err => {
				res.send({ success: false, err });
			});
	},
	userGet: (req, res) => {
		const db = req.app.get("db");

		const { email } = req.body;

		db.user_table.findOne({ email }).then(userObj => {
			if (userObj) {
				res.send({ success: true, userObj });
			}
		});
	}
};
