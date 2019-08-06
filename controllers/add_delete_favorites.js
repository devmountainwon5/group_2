module.exports = {
   addFavorite: (req, res, next) => {
       const dbInstance = req.app.get('db');

       const { res_name, res_address, link, img, user_id } = req.body;

       dbInstance.check_favorite_exists([res_name, res_address])
       .then( results => {
           if (!results[0]) {    
               dbInstance.add_favorite([res_name, res_address, link, img, user_id])
               .then( results => {
                   res.status(200).send(results.data)
               })
               .catch( err => {        
                   res.status(500).send(err)
               })
           } else {
               res.status(200).send('Favorite already exists');
           };
       })
       .catch( err => {
           res.status(500).send(err)
       });
   },
   deleteFavorite: (req, res, next) => {
       const dbInstance = req.app.get('db');

       const { favorite_id } = req.params;

       dbInstance.delete_favorite([favorite_id])
       .then( results => {
           res.status(200).send('Favorite has been removed')
       })
       .catch( err => {
           res.status(500).send(err)
       });
   },
   getFavorites: (req, res, next) => {
    const dbInstance = req.app.get('db');

    const { userEmail } = req.body;

    dbInstance.getUser([userEmail])
    .then( results => {
        dbInstance.getFavorites([results.data[0].id])
        .then( results => {
            res.status(200).send(results)
        })
        .catch( err => {
            res.status(500).send(err);
        });
    })
    .catch( err => {
        res.status(500).send(err);
    });
   }
}