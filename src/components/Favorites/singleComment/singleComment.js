import React, { useState } from 'react';
import './singleComment.css';
import axios from 'axios';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';

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

    let canEdit = props.loggedInUser === props.commentUser
    ? <div className='editIcon'>
        <EditIcon onClick={ () => {props.displayEditBox(); props.setEditId(props.commentId)} }/>
    </div>
    : <div></div>;

    let canDelete = props.loggedInUser === props.commentUser
    ? <div className='closeIcon'>
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
                <div className='canEditAndDeleteDiv'>
                    {canEdit}
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