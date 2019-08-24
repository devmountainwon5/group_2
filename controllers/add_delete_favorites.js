module.exports = {
	addFavorite: (req, res, next) => {
		const dbInstance = req.app.get("db");

		const { res_name, res_address, place_id, res_pic, rating } = req.body;
		const { userEmail } = req.session;
		console.log(req.session)
		if (userEmail) {
			dbInstance
				.get_user([userEmail])
				.then(results => {
					let user_id = results[0].id;

					dbInstance
						.check_favorite_exists([place_id])
						.then(results => {
							if (!results[0]) {
								dbInstance
									.add_favorite([
										res_name,
										res_address,
										res_pic,
										place_id,
										rating
									])
									.then(results => {
										dbInstance
											.add_to_user([user_id, results[0].favorite_id])
											.then(results => {
												res.status(200).send(results);
											})
											.catch(err => {
												res.status(500).send(err);
											});
									})
									.catch(err => {
										res.status(500).send(err);
									});
							} else {
								dbInstance
									.add_to_user([user_id, results[0].favorite_id])
									.then(results => {
										res.status(200).send(results);
									})
									.catch(err => {
										res.status(500).send(err);
									});
							}
						})
						.catch(err => {
							res.status(500).send(err);
						});
				})
				.catch(err => {
					res.status(500).send(err);
				});
		} else {
			res.status(200).send("Please Sign In");
		}
	},
	deleteFavorite: (req, res, next) => {
		const dbInstance = req.app.get("db");

		const { favorite_id } = req.params;

		dbInstance
			.delete_favorite([favorite_id])
			.then(results => {
				res.status(200).send("Favorite has been removed");
			})
			.catch(err => {
				res.status(500).send(err);
			});
	},
	getFavorites: (req, res, next) => {
		const dbInstance = req.app.get("db");

		const { userEmail } = req.body;

		dbInstance
			.get_user([userEmail])
			.then(results => {
				dbInstance
					.get_favorites([results[0].id])
					.then(results => {
						res.status(200).send(results);
					})

					.catch(err => {
						res.status(500).send(err);
					});
			})
			.catch(err => {
				res.status(500).send(err);
			});
	}
};
