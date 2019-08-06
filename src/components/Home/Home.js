import React, { Component } from "react";
import { connect } from "react-redux";
import {
	getCurrentLocation,
	getRestaurants
} from "../../actions/locationActions";
import MyFancyComponent from "./MapComponent";
import RestaurantList from "./RestaurantList/RestaurantList";

class Home extends Component {
	constructor() {
		super();
		this.state = {
			error: {},
			location: {},
			locationReceived: false
		};
		this.onClick = this.onClick.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.userLocation) {
			this.setState({
				locationReceived: true,
				location: nextProps.userLocation
			});
		}
	}


	componentWillMount() {
		this.props.getCurrentLocation();
	}

	onClick(e) {
		e.preventDefault();
		this.props.logoutUser();
	}
	render() {
		// const { error } = this.state

		let { locationReceived } = this.state;
		return (
			<div className="container">
				<div className="content">
					{locationReceived ? (
						<MyFancyComponent className="mt-5" />
					) : (
						<h2>Loading...</h2>
					)}
				</div>
				<div className="leftCol">
					<RestaurantList />
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	// error: state.error,
	userLocation: state.location.userLocation
});

export default connect(
	mapStateToProps,
	{ getCurrentLocation, getRestaurants }
)(Home);
