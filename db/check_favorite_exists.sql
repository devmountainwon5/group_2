SELECT * 
FROM favorites_table
WHERE res_name = $1
AND res_address = $2;