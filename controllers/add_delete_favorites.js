module.exports = {
   addFavorite: (req, res, next) => {
       debugger
       const dbInstance = req.app.get('db');

       const { res_name, res_address, link, img, user_id } = req.body;

       dbInstance.check_favorite_exists([res_name, res_address])
       .then( results => {
           debugger
           if (!results[0]) {
               debugger
               dbInstance.add_favorite([res_name, res_address, link, img, user_id])
               .then( results => {
                   res.status(200).send(results.data)
               })
               .catch( err => {
                   debugger
                   res.status(500).send(err)
               })
           } else {
               res.status(200).send('Favorite already exists');
           };
       })
       .catch( err => {
           debugger
           res.status(500).send(err)
       });
   },
   deleteFavorite: (req, res, next) => {
       debugger
       const dbInstance = req.app.get('db');

       const { favorite_id } = req.params;

       dbInstance.delete_favorite([favorite_id])
       .then( results => {
           res.status(200).send('Favorite has been removed')
       })
       .catch( err => {
           res.status(500).send(err)
       });
   }
}