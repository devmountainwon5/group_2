import React from "react";
import { useAuth0 } from "./../../react-auth0-wrapper";
import Favorites from "../Favorites/Favorites";
import "./Profile.css";

const Profile = () => {
	const { loading, user } = useAuth0();
	// componentDidMount(){
	//   console.log
	// }
	if (loading || !user) {
		return "Loading...";
	}

	// return (
	// 	<>
	// 		<img src={user.picture} alt='Profile' />

	return (
		<div>
			<div className="profile">
				<img src={user.picture} alt="Profile" />

				<h2>{user.name}</h2>
				<p>{user.email}</p>
			</div>

			<Favorites />
			<Favorites />
			<Favorites />
		</div>
	);
};

export default Profile;
