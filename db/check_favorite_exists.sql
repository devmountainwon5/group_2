SELECT * 
FROM favorites_table
WHERE res_name = $1
AND res_address = $2
AND user_id = $3;