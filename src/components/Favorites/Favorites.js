import React, {useState} from 'react';
import Cards from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import AddCommentOutlinedIcon from '@material-ui/icons/AddCommentOutlined'
import './Favorites.css';


export default function Card(props) {
    const [addCommentInput, setAddCommentInput] = useState('');
    const [showCommentBox, setShowCommentBox] = useState(false);

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    let commentDate = mm + '/' + dd + '/' + yyyy;

    const addComment = () => {
        axios.post('/api/add_comment', {userEmail: props.userEmail, place_id: props.place_id, date: commentDate, comment: addCommentInput})
    }
    
    let addCommentBox = showCommentBox
    ? <div>
        <h1>How was your visit to {props.restaurantName}</h1>
        <textarea rows='8' onChange={ e => {setAddCommentInput(e.target.value)}}/>
        <div>
            <button onClick={() => setShowCommentBox(false)}>Cancel</button>
            <button onClick={() => addComment()}>Add Comment</button>
        </div>
    </div>
    : <div></div>;

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
                <IconButton size="small" color="primary">
                    <DeleteOutlineOutlinedIcon />
                </IconButton>
                <IconButton size="small" color="primary"style={{marginTop: '3px'}}>
                    <AddCommentOutlinedIcon onClick={() => setShowCommentBox(true)}/>
                </IconButton>
            </CardActions>

            </Cards>
            {addCommentBox}
        </div>
    );

}
