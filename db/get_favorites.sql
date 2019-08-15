select * from user_favorites uf
join favorites_table ft on uf.favorite_id = ft.favorite_id
where user_id = $1;