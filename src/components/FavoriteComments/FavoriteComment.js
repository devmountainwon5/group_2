import React, { useEffect, useState } from 'react';
import { useAuth0 } from "./../../react-auth0-wrapper";
import SingleComment from './SingleComment/SingleComment';
import axios from 'axios';



const FavoriteComment = props => {
    const { loading, user } = useAuth0();
    const [userEmail, setUserEmail] = useState(null);
    const [userId, setUserId] = useState(null);
    const [comments, setComments] = useState([]);
    const [placeId, setPlaceId] = useState(null);
    setPlaceId(props.placeId);
    const getComments = () => {
        axios.post('/api/favorite_comments', { place_id: placeId })
        .then( comments => {
            setComments(comments.data)
        })
    }
    getComments();
    if (user) {
        setUserEmail(user.email)
    }
    const getUserId = () => {
        axios.post('/api/getuser', { userEmail: userEmail })
        .then( results => {
            setUserId(results[0].id)
        })
    }
    getUserId();
    console.log(comments)
    let commentList = comments.map( e => {
        return <SingleComment name={e.first_name} comment={ e.comment } date={ 'no date' } userId={e.user_id} loggedInUserId={userId} commentId={e.comment_id} />
    })
    return (
        <div>
            { commentList }
        </div>
    )
}

export default FavoriteComment;