import React from 'react';

export default function List (props) {
    return (
        <div className="row" >
            <div className='card-deck' >
            <div className='card'>
                {/* <Link to={`/posts/${props.id}`}> */}
                
               
                    <img src={props.picture} className="card-img-top" />
                <div className="card-body" >
                <h4>{props.name}</h4>
                <h4>{props.rating}</h4>
                <h5>{props.address}</h5>
                <button className="btn btn-primary">ADD</button>
                {/* </Link> */}
               
                
                </div>
            </div>
            </div>
            </div>
        
        )
    }