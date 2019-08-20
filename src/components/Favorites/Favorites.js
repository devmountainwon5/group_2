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
import axios from 'axios';
import SingleComment from './singleComment/singleComment';


export default function Card(props) {
    const [showComments, setShowComments] = useState(false)
    const [addCommentInput, setAddCommentInput] = useState('');
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [comments, setComments] = useState([])

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    let commentDate = mm + '/' + dd + '/' + yyyy;
    const getComments = () => {
        axios.post('/api/favorite_comments', { place_id: props.place_id })
        .then( results => {
            setComments(results.data)
        })
        .catch( err => {
            window.alert(err)
        })
    }
    getComments();

    const addComment = async () => {
        await axios.post('/api/add_comment', {userEmail: props.userEmail, place_id: props.place_id, created_date: commentDate, comment: addCommentInput})
    }
    let showCommentsBox = showComments
    ? <div><div onClick={() => setShowComments(false)}>X</div>
    {comments.map( e => {
        return <SingleComment author={e.first_name} date={e.created_date} comment={e.comment} pic={e.profilepic} />
    })}</div>
    : <div></div>;
    
    let addCommentBox = showCommentBox
    ? <div>
        <h1>How was your visit to {props.restaurantName}</h1>
        <textarea rows='8' onChange={ e => {setAddCommentInput(e.target.value)}}/>
        <div>
            <button onClick={() => setShowCommentBox(false)}>Cancel</button>
            <button onClick={() => {setShowCommentBox(false); addComment(); getComments();}}>Add Comment</button>
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
                    {props.restaurantName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Description of restaurant? Or miles from users location. 
                </Typography>
                </CardContent>
            </CardActionArea>

            <CardActions>
                <div>
                    <IconButton size="small" color="primary">
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                    <IconButton size="small" color="primary"style={{marginTop: '3px'}}>
                        <AddCommentOutlinedIcon onClick={() => setShowCommentBox(true)}/>
                    </IconButton>
                </div>
                <div onClick={() => setShowComments(true)}>
                    Comments ({comments.length})
                </div>
            </CardActions>

            

            </Cards>
            {addCommentBox}
            {showCommentsBox}
        </div>
    );

}
