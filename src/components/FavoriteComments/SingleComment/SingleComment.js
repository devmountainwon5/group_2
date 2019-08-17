import React from 'react';
import './SingleComment.css'

const SingleComment = props => {
    let deletable = props.userId === props.loggedInUserId ? <div>X</div> : <div></div>;
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