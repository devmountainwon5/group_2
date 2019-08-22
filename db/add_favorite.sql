INSERT INTO favorites_table (res_name, res_address, res_pic, place_id, rating)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;