insert into user_favorites (user_id, favorite_id)
values ($1, $2)
returning *;