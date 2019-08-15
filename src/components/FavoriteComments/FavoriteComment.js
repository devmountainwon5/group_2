import React, { useEffect, useState } from 'react';
import { useAuth0 } from "./../../react-auth0-wrapper";
import SingleComment from './SingleComment/SingleComment';
import axios from 'axios';



const FavoriteComment = () => {
    const { loading, user } = useAuth0();
    const [userEmail, setUserEmail] = useState(null);
    const [comments, setComments] = useState([])
    const getComments = () => {
        axios.post('/api/favorite_comments', { place_id: 'ChIJi1LOhMKxEmsRA1xvD0eBi-A' })
        .then( comments => {
            setComments(comments.data)
        })
    }
    getComments();
    console.log(comments)
    let commentList = comments.map( e => {
        return <SingleComment name={e.first_name} comment={ e.comment } date={ 'no date' }/>
    })
    return (
        <div>
            { commentList }
        </div>
    )
}

export default FavoriteComment;