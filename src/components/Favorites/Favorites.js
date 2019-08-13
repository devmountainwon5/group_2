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
            favorites: [{name: "Lauren"}, {name: "Woo"}, {name: "hello"}]
        };

        this.deleteFavorite = this.deleteFavorite.bind(this);
    }

    componentDidMount(){
        console.log("working!", this.props.user)
        axios.post(`/api/userfavorites`, {userEmail: this.props.user})
        .then(({data})=>{
            console.log(data);
            if(data.success){
                this.setState({
                   favorites: data.favorites
                })
            } else{
                alert('uh oh! Your favorites went missing')
            }
        })
    }

    deleteFavorite = favorite_id => {
        axios
            .delete(`/api/favorites_delete/${favorite_id}`)
            .then(res => {
                if (res.data.success) {
                    this.props.dispatch({
                        type: "favorites",
                        payload: res.data
                    });
                }
            })
            .catch(error => console.log(error));
    };

    render () {

        const favoritesCard = this.state.favorites.map((fave, i)=>{
            return (
            
            <Cards className={"card"} >
                
            <CardActionArea>
                <CardMedia
                className={"media"}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {fave.name}
                </Typography>
                <Typography gutterBottom variant="h5" component="h3">
                    {fave.rating}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {fave.address}
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
            )
          })

    return (
        <div className={"faveList"}>
            {favoritesCard}
        </div>
    );
    }
}

export default connect(state => state)(Card);
