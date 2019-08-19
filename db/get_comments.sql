select * from comments_table ct
join favorites_table ft on ft.favorite_id = ct.favorite_id
join user_table ut on ut.id = ct.user_id
where ft.place_id = $1;