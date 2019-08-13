insert into comments_table (user_id, favorite_id, comment)
values ($1, $2, $3)
returning *;