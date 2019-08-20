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

        const { userEmail, place_id, comment, created_date } = req.body;

        dbInstance.get_user([userEmail])
       .then( results => {
           let user_id = results[0].id;

           dbInstance.get_place([place_id])
           .then( results => {
               let favorite_id = results[0].favorite_id;

               dbInstance.add_comment([user_id, favorite_id, comment, created_date])
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
    },
    deleteComment: (req, res, next) => {
        const dbInstance = req.app.get('db');

        const { comment_id, userEmail } = req.body;

        dbInstance.get_user([userEmail])
        .then( results => {
            let user_id = results[0].id;

            dbInstance.get_comment([comment_id])
            .then( results => {
                if (results[0].user_id === user_id) {
                    dbInstance.delete_comment(comment_id)
                    .then( results => {
                        res.status(200).send('Comment deleted.')
                    })
                    .catch( err => {
                        res.status(500).send(err)
                    })
                } else {
                    res.status(200).send("I'm sorry, you are not allowed to delete other user's comments.")
                }
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