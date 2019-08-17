INSERT INTO favorites_table (res_name, res_address, link, img, user_id)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;