import React, { Component } from "react";
import { connect } from "react-redux";
import { getRestaurants } from "../../../actions/locationActions";
import List from "./ListItem";

class RestaurantList extends Component {
	state = {
		localRestaurants: [],
		localRestaurantsToShow: 'all'
	}

	updateRestaurantToShow = s => {
		this.setState({
			localRestaurantsToShow: s
		});
	  };


	render() {
		let localRestaurants = [];
		
			console.log(this.props.localRestaurants)
		if (this.state.localRestaurantsToShow === "all") {
			localRestaurants = this.props.localRestaurants;
		  } else if (this.state.localRestaurantsToShow === 'rating'){
			  localRestaurants = this.props.localRestaurants.filter(rating => rating >= 4.5)
			  console.log(this.props.localRestaurants)
		  } else if (this.state.localRestaurantsToShow === 'openNow'){
			  localRestaurants = this.props.localRestaurants.filter(openNow => openNow === true)
		  }

		const list = this.props.localRestaurants.map((e, i) => {
			i = e.length - 1;
			return (
				<List
					key={e.id}
					name={e.name}
					address={e.address}
					rating={e.rating}
					picture={e.picture}
					place_id={e.place_id}
				/>
			);
		});

		return (
			<div className='restaurant-list'>
			<div>
				<button onClick={() => this.updateRestaurantToShow('all')} >Show all</button>
				<button onClick={() => this.updateRestaurantToShow('rating')} >Rating 4.5+</button>
			</div>
				{console.log(this.props.localRestaurants)}
				{list}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	localRestaurants: state.location.localRestaurants
});

export default connect(
	mapStateToProps,
	{ getRestaurants }
)(RestaurantList);
