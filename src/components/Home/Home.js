import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

export class Home extends Component {
	state = { userLocation: { lat: 32, lng: 32 }, loading: true };

	componentDidMount(props) {
		navigator.geolocation.getCurrentPosition(
			position => {
				const { latitude, longitude } = position.coords;

				this.setState({
					userLocation: { lat: latitude, lng: longitude },
					loading: false
				});
			},
			() => {
				this.setState({ loading: false });
			}
		);
	}

	render() {
		const { loading, userLocation } = this.state;
		const { google } = this.props;

		if (loading) {
			return null;
		}

		return <Map google={google} initialCenter={userLocation} zoom={10} />;
	}
}

export default GoogleApiWrapper({
	apiKey: "AIzaSyC3e9Mu_8YKN5CLDPZsK7NHNLm-9iCRcws"
})(Home);

const mapStyles = {
	width: "100%",
	height: "100%"
};
