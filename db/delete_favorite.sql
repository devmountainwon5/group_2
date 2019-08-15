DELETE FROM user_favorites
WHERE favorite_id = $1;

DELETE FROM favorites_table
WHERE favorite_id = $1;

