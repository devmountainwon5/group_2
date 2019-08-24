update comments_table
set comment = $2
where comment_id = $1;