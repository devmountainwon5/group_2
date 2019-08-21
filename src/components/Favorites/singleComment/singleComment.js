import React from 'react';
import './singleComment.css';
import axios from 'axios';
import CloseIcon from '@material-ui/icons/Close';

const SingleComment = props => {
    const deleteComment = () => {
        axios.post('/api/delete_comment', { comment_id: props.commentId, userEmail: props.loggedInUser })
        .then( results => {
            console.log(results)
        })
        .catch( err => {
            console.log(err)
        })
    }

    let canDelete = props.loggedInUser === props.commentUser
    ? <div>
        <CloseIcon onClick={ () => deleteComment() }/>
    </div>
    : <div></div>;
    return (
        <div className='singleCommentParent'>
            <div className='picAndNameAndCanDelete'>
                <div className='picAndName'>
                    <div className='personPicDiv'>
                        <img className='personPic' alt='' src={props.pic} />
                    </div>
                    <div className='dateAndNameDiv'>
                        <p className='datePrint'>{props.date}</p>
                        <p className='personName'>{props.author}</p>
                    </div>
                </div>
                <div className='canDeleteDiv'>
                    {canDelete}
                </div>
            </div>
            <div className='commentPrintDiv'>
                <p className='commentPrint'>{props.comment}</p>
            </div>
        </div>
    )
}

export default SingleComment;