<<<<<<< HEAD
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
            favorites: [{
                picture: this.props.picture,
                name: this.props.name,
                address: this.props.address,
                user_id: this.props.user_id,
                link: this.props.link
            }]
        };

        this.deleteFavorite = this.deleteFavorite.bind(this);
    }

    componentDidMount(){
        axios.post(`/api/userfavorites`, {userEmail: this.props.user})
        .then((data)=>{
            if(data){
                this.props.dispatch({
                    type: "favorites",
                    payload: data
                });
            } else{
                alert('uh oh! Your favorites went missing')
            }
        })
    }

    deleteFavorite(favorite_id){
        axios
            .delete(`/api/favorites_delete/${favorite_id}`)
            .then(res => {
                if (res.data) {
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
                
            <CardActionArea >
                <CardMedia 
                className={"media"}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {fave.name}
                </Typography>
                <Typography gutterBottom variant="h5" component="h3">
                    {fave.address}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {fave.link}
                </Typography>
                </CardContent>
            </CardActionArea>

            <CardActions>
                {/* <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>  */}
                <IconButton size="small">
                    <DeleteIcon onClick={this.props.deleteFavorite}/>
                    {/* () => this.props.deleteFavorite(favorite_id) */}
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
=======
import React, { useState } from "react";
import Cards from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import AddCommentOutlinedIcon from "@material-ui/icons/AddCommentOutlined";
import "./Favorites.css";
import axios from "axios";
import SingleComment from "./singleComment/singleComment";
import CloseIcon from "@material-ui/icons/Close";

// export default function Card(props) {
// 	return (
// 		<div className={"faveList"}>
// 			<Cards className={"card"}>
// 				<CardActionArea>
// 					<CardMedia className={"media"} image='' title='Restaurant' />
// 					<CardContent>
// 						<Typography gutterBottom variant='h5' component='h2'>
// 							{props.res_name}
// 						</Typography>
// 						<Typography variant='body2' color='textSecondary' component='p'>
// 							{props.rating}
// 						</Typography>
// 						<Typography variant='body2' color='textSecondary' component='p'>
// 							{props.res_address}
// 						</Typography>
// 					</CardContent>
// 				</CardActionArea>

export default function Card(props) {
	const [showComments, setShowComments] = useState(false);
	const [addCommentInput, setAddCommentInput] = useState("");
	const [showAddCommentBox, setShowAddCommentBox] = useState(false);
	const [commentIdToEdit, setCommentIdToEdit] = useState(null);
	const [comments, setComments] = useState([]);
	const [editCommentBoxShow, setEditCommentBoxShow] = useState(false);
	const [editCommentInput, setEditCommentInput] = useState("");

	let today = new Date();
	let dd = String(today.getDate()).padStart(2, "0");
	let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
	let yyyy = today.getFullYear();

	let commentDate = mm + "/" + dd + "/" + yyyy;

	const getComments = () => {
		axios
			.post("/api/favorite_comments", { place_id: props.place_id })
			.then(results => {
				setComments(results.data);
			})
			.catch(err => {
				window.alert(err);
			});
	};
	getComments();

	const addComment = async () => {
		if (addCommentInput.length === 0) {
			window.alert("Please add a comment");
		} else {
			setShowAddCommentBox(false);
			await axios.post("/api/add_comment", {
				userEmail: props.userEmail,
				place_id: props.place_id,
				created_date: commentDate,
				comment: addCommentInput
			});
		}
	};

	const setCommentId = id => {
		setCommentIdToEdit(id);
	};

	const showEditComments = () => {
		setEditCommentBoxShow(true);
		setShowComments(false);
		setShowAddCommentBox(false);
	};

	const editComment = async () => {
		if (editCommentInput.length === 0) {
			window.alert("Please edit your comment");
		} else {
			setEditCommentBoxShow(false);
			await axios.post("/api/edit_comment", {
				comment_id: commentIdToEdit,
				editedComment: editCommentInput
			});
		}
    };
    
    const deleteFavorite = () => {
        axios.delete(`/api/favorites_delete/${ props.favorite_id }`)
        .then( results => {
            console.log(results)
        })
        .catch( err => {
            console.log(err)
        });
    }

	let showCommentsBox = showComments ? (
		<div className='showCommentBoxParent'>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<div>
					<h2>Comments for {props.res_name}</h2>
				</div>
				<div onClick={() => setShowComments(false)}>
					<CloseIcon style={{ cursor: "pointer" }} />
				</div>
			</div>
			{comments.map(e => {
				return (
					<SingleComment
						displayEditBox={showEditComments}
						setEditId={setCommentId}
						getComments={getComments}
						commentUser={e.email}
						loggedInUser={props.userEmail}
						commentId={e.comment_id}
						author={e.first_name}
						date={e.created_date}
						comment={e.comment}
						pic={e.profilepic}
					/>
				);
			})}
		</div>
	) : (
		<div />
	);

	let addCommentBox = showAddCommentBox ? (
		<div className='addCommentBoxParent'>
			<h1 className='addCommentHowWasVisit'>
				How was your {props.restaurantName} experience?
			</h1>
			<textarea
				className='addCommentTextArea'
				onChange={e => {
					setAddCommentInput(e.target.value);
				}}
			/>
			<div className='addCommentButtonDiv'>
				<div
					className='addCommentCancelButton addCommentButton'
					onClick={() => setShowAddCommentBox(false)}>
					Cancel
				</div>
				<div
					className='addCommentAddButton addCommentButton'
					onClick={() => {
						addComment();
						getComments();
					}}>
					Add Comment
				</div>
			</div>
		</div>
	) : (
		<div />
	);

	let editCommentBox = editCommentBoxShow ? (
		<div className='editCommentBoxParent'>
			<h1 className='editCommentHowWasVisit'>
				Edit your {props.restaurantName} experience:
			</h1>
			<textarea
				className='editCommentTextArea'
				onChange={e => {
					setEditCommentInput(e.target.value);
				}}
			/>
			<div className='editCommentButtonDiv'>
				<div
					className='editCommentCancelButton editCommentButton'
					onClick={() => {
						setEditCommentBoxShow(false);
					}}>
					Cancel
				</div>
				<div
					className='editCommentEditButton editCommentButton'
					onClick={() => {
						editComment();
						getComments();
						setEditCommentBoxShow(false);
						setShowComments(true);
						setShowAddCommentBox(false);
					}}>
					Save Changes
				</div>
			</div>
		</div>
	) : (
		<div />
	);

	return (
		<div className={"faveList"}>
			<Cards className={"card"}>
				<CardActionArea>
					<CardMedia className={"media"} image='' title='Restaurant' />
					<CardContent>
						<Typography gutterBottom variant='h5' component='h2'>
							{props.res_name}
						</Typography>
						<Typography variant='body2' color='textSecondary' component='p'>
							<p>{props.rating}/5 stars</p>
						</Typography>
						<Typography variant='body2' color='textSecondary' component='p'>
							{props.res_address}
						</Typography>
					</CardContent>
				</CardActionArea>

				<CardActions>
					<div>
						<IconButton size='small' color='primary'>
							<DeleteOutlineOutlinedIcon 
                                onClick={ () => {
                                    deleteFavorite();
                                }} 
                            />
						</IconButton>
						<IconButton
							size='small'
							color='primary'
							style={{ marginTop: "3px" }}>
							<AddCommentOutlinedIcon
								onClick={() => {
									setShowAddCommentBox(true);
									setShowComments(false);
								}}
							/>
						</IconButton>
					</div>
					<div
						className='showCommentLength'
						onClick={() => {
							setShowComments(true);
							setShowAddCommentBox(false);
						}}>
						Comments ({comments.length})
					</div>
					<div>
						<a
							target='blank'
							href={`https://www.google.com/maps/search/?api=1&query=Google&query_place_id=
						${props.place_id}`}>
							<button className='google review'>Take Me There</button>
						</a>
					</div>
				</CardActions>
			</Cards>
			{addCommentBox}
			{showCommentsBox}
			{editCommentBox}
		</div>
	);
>>>>>>> 158421022be925e3cbaa216aab76cd3a13c1bc65
}

export default connect(state => state)(Card);
