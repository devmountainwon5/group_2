import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../Home.css';
import axios from 'axios';
// import { Link } from "react-router-dom";
// import SingleView from "./src/components/Home/SingleView/SingleView";

class List extends Component {
  //   constructor(props) {
  //   super(props);
  state = {
    picture: this.props.picture,
    name: this.props.name,
    rating: this.props.rating,
    address: this.props.address,
    place_id: this.props.place_id
  };

  addFavs = () => {
    const { picture, name, rating, address, place_id } = this.state;
    const favs = {
      picture,
      name,
      rating,
      address,
      place_id
    };
    axios.post('/api/favorites', favs).then(backendRes => {
      debugger;
      //checking successful registration
      if (backendRes.data.success) {
        //dispatch obj to store
        this.props.dispatch({
          type: 'favorites',
          payload: backendRes.data
        });
      }
    });
  };

  render() {
    return (
      <div className='row'>
        <div className='card-deck'>
          <div className='card'>
            {/* <SingleView /> */}
            {/* <Link to={`/posts/${props.id}`}> */}
            {/* <img src={this.props.picture} className='card-img-top' /> */}
            <div className='card-body'>
              <h4>{this.props.name}</h4>
              <h4>{this.props.rating}</h4>
              <h5>{this.props.address}</h5>
              <button className='btn btn-primary' onClick={this.addFavs}>
                ADD
              </button>
              <a
                target='blank'
                href={
                  'https://www.google.com/maps/search/?api=1&query=Google&query_place_id=' +
                  this.props.place_id
                }
              >
                <button className='google review'>More Info</button>
              </a>
            </div>
            {/* </Link> */}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(List);
