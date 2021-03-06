import React, { Component } from "react";
import { connect } from "react-redux";
import "../Home.css";
// import { useAuth0 } from '../../../react-auth0-wrapper';
import axios from "axios";
// import Userget from './Userget';
// import { Link } from "react-router-dom";
// import SingleView from "./src/components/Home/SingleView/SingleView";

class List extends Component {
	//   constructor(props) {
	//   super(props);
	state = {
		picture: this.props.picture,
		name: this.props.name,
		address: this.props.address,
		user_id: this.props.user_id,
		rating: this.props.rating,
		link: this.props.link

		// place_id: this.props.place_id
	};

	addFavs = () => {
		const { name, address, place_id, rating } = this.props;
		const favs = {
			res_pic: "",
			res_name: name,
			res_address: address,
			place_id: place_id,
			rating: rating
		};
		if (true) {
			axios.post("/api/favorites", favs).then(results => {
				console.log(results);
				if (results.data === 'Please Sign In') {
					window.alert('Please sign in to add favorites')
				} else {
					if (results.data.success) {
						//dispatch obj to store
						this.props.dispatch({
							type: "favorites",
							payload: results.data
						});
					}
				}	
			});
		}
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
							<h4 className='listItemFont' >{this.props.name}</h4>
							<h4 className='listItemFont' >{this.props.rating}</h4>
							<h5 className='listItemFont' >{this.props.address}</h5>
							<button className='btn btn-primary' onClick={this.addFavs}>
								ADD
							</button>
							<a
								target='blank'
								href={
									"https://www.google.com/maps/search/?api=1&query=Google&query_place_id=" +
									this.props.place_id
								}>
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
