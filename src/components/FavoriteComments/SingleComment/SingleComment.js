import React from 'react';
import './SingleComment.css'
import { useAuth0 } from '../../../react-auth0-wrapper';
import Axios from 'axios';

const SingleComment = props => {
    const deleteComment = () => {
        Axios.post('/api/delete_comment', { userEmail: props.userEmail, comment_id: props.comment_id })
        .then( results => {
            console.log(results)
        })
        .catch( err => {
            window.alert(err)
        })
    }
    let deletable = props.userId === props.loggedInUserId ? <div onClick={() => deleteComment()}>X</div> : <div></div>;
    return (
        <div>
            <div>
                <h3>{ props.name }</h3>
                <h3>{ props.date }</h3>
            </div>
            <div>
                {deletable}
            </div>
            <div>
                <p>{ props.comment }</p>
            </div>
        </div>
    )
}

export default SingleComment;