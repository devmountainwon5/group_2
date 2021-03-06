import React, { useEffect, useState } from 'react';
import { useAuth0 } from "./../../react-auth0-wrapper";
import SingleComment from './SingleComment/SingleComment';
import axios from 'axios';



const FavoriteComment = props => {
    const { loading, user } = useAuth0();
    const [comments, setComments] = useState([]);
    const [placeId, setPlaceId] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userId, setUserId] = useState(null);
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


    setPlaceId(props.placeId);
    const getComments = () => {
        axios.post('/api/favorite_comments', { place_id: placeId })
        .then( comments => {
            setComments(comments.data)
        })
    }
    getComments();
    console.log(comments)
    let commentList = comments.map( e => {
        return <SingleComment name={e.first_name} comment={ e.comment } userEmail={ userEmail } date={ 'no date' } userId={e.user_id} loggedInUserId={userId} commentId={e.comment_id} />
    })
    return (
        <div>
            { commentList }
        </div>
    )
}

export default FavoriteComment;