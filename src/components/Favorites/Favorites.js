import React, { Component } from 'react';
import axios from "axios";
import Cards from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import './Favorites.css';


class Card extends Component{
    constructor(props){
        super(props)
        this.state = {
            favorites: []
        };

        this.deleteFavorite = this.deleteFavorite.bind(this);
    }

    componentDidMount(){
        axios.get(`/api/userfavorites/`)
        .then(({data})=>{
            if(data.success){
                this.setState({
                   favorites: data.favorites
                })
            } else{
                alert('uh oh! Your favorites went missing')
            }
        })
    }

    deleteFavorite() {
        axios.delete(`/api/favorites_delete/:favorite_id`)
          .then(res =>{
            this.setState({
              favorites: res.data
            });
          });
        }

    render () {

        const favoritesCard = this.state.favorites.map((e, i)=>{
            return <Card key={i} title={e.title} image={e.image} address={e.address} rating={e.rating} delete={this.delete} /> 
          })

    return (
        <div className={"faveList"}>
            <Cards className={"card"} {...favoritesCard} >
                
            <CardActionArea>
                <CardMedia
                className={"media"}
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
                {/* <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>  */}
                <IconButton size="small">
                    <DeleteIcon onClick={this.deleteFavorite}/>
                </IconButton>
            </CardActions>

            </Cards>
        </div>
    );
    }
}

export default connect(state => state)(Card);
