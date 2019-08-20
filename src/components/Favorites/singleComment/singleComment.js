import React from 'react';

const SingleComment = props => {
    return (
        <div>
            <div>
                <div>
                    <img alt='' src={props.pic} />
                    {props.author}
                </div>
                <div>
                    {props.date}
                </div>
            </div>
            <div>
                {props.comment}
            </div>
        </div>
    )
}

export default SingleComment;