module.exports = {
    editUser: (req, res, next) => {
        const dbInstance = req.app.get('db');

        let userFirst = '';
        let userLast = '';
        const { userId, firstName, lastName } = req.body;

        dbInstance.get_user([userId])
        .then( results => {
            if (firstName) {
                userFirst = firstName;
            } else {
                userFirst = results[0].first_name;
            };

            if (lastName) {
                userLast = lastName;
            } else {
                userLast = results[0].last_name;
            };

            dbInstance.edit_user([userFirst, userLast, userId])
            .then( results => {
                res.status(200).send(results)
            })
            .catch( err => {
                res.status(500).send(err)
            });
        })
        .catch( err => {
            res.status(500).send(err)
        });
    }
};