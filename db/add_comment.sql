insert into comments_table (user_id, favorite_id, comment, date)
values ($1, $2, $3, $4)
returning *;