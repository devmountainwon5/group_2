module.exports = {
    getUser: (req, res, next) => {
        debugger
        const dbInstance = req.app.get('db');

        const { userEmail } = req.body;

        dbInstance.get_user([userEmail])
        .then( results => {
            res.status(200).send(results)
        })
        .catch( err => {
            res.status(500).send(err)
        });
    }
}