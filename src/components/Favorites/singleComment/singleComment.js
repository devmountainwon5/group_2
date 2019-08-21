import React from 'react';
import './singleComment.css';

const SingleComment = props => {
    return (
        <div className='singleCommentParent'>
            <div className='picAndName'>
                <div>
                    <img className='personPic' alt='' src={props.pic} />
                    <p className='personName'>{props.author}</p>
                </div>
                <div className='dateDiv'>
                    <p className='datePrint'>{props.date}</p>
                </div>
            </div>
            <div className='commentPrintDiv'>
                <p className='commentPrint'>{props.comment}</p>
            </div>
        </div>
    )
}

export default SingleComment;