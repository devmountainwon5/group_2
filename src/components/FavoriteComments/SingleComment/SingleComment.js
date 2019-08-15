import React from 'react';
import './SingleComment.css'

const SingleComment = props => {
    return (
        <div>
            <div>
                <h3>{ props.name }</h3>
                <h3>{ props.date }</h3>
            </div>
            <div>
                <p>{ props.comment }</p>
            </div>
        </div>
    )
}

export default SingleComment;