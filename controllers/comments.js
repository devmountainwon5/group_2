module.exports = {
    getComments: (req, res, next) => {
        const dbInstance = req.app.get('db');

        const { place_id } = req.body;

        dbInstance.get_comments([place_id])
        .then( results => {
            res.status(200).send(results);
        })
        .catch( err => {
            res.status(500).send(err);
        })
    },
    addComment: (req, res, next) => {
        const dbInstance = req.app.get('db');

        const { userEmail, place_id, comment } = req.body;

        dbInstance.get_user([userEmail])
       .then( results => {
           let user_id = results[0].id;

           dbInstance.get_place([place_id])
           .then( results => {
               let favorite_id = results[0].favorite_id;

               dbInstance.add_comment([user_id, favorite_id, comment])
               .then( results => {
                   res.status(200).send(results)
               })
               .catch( err => {
                   res.status(500).send(err)
               })
           })
           .catch( err => {
               res.status(500).send(err)
           })
       })
       .catch( err => {
           res.status(500).send(err)
       })
    }  
}