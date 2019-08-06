import React, { Component } from "react";
import { useAuth0 } from "./../../react-auth0-wrapper";
import { connect } from "react-redux";
import axios from "axios";

class Profile extends Component {
	componentDidMount() {
		console.log("hit");
		axios.get("/app/userGet").then(res => {
			if (res.data.success) {
				this.props.dispatch({
					type: "user",
					payload: res.data.userObj
				});
			}
		});
	}
	Profile = () => {
		const { loading, user } = useAuth0();

		if (loading || !user) {
			return "Loading...";
		}

		return (
			<>
				<img src={user.picture} alt='Profile' />

				<h2>{user.name}</h2>
				<p>{user.email}</p>
			</>
		);
	};
}
export default connect(state => state)(Profile);
