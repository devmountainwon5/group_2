import React from 'react';
import Cards from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import './Favorites.css';


export default function Card() {
    
    return (
        <div className={"faveList"}>
            <Cards className={"card"} >

            <CardActionArea>
                <CardMedia
                className={"media"}
                image=""
                title="Restaurant"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Restaurant
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Description of restaurant? Or miles from users location. 
                </Typography>
                </CardContent>
            </CardActionArea>

            <CardActions>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton> 
                <IconButton size="small" color="primary">
                    <DeleteIcon />
                </IconButton>
            </CardActions>

            </Cards>
        </div>
    );

}
