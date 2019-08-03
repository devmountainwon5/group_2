import React from "react";
import { useAuth0 } from "./../../react-auth0-wrapper";

const Profile = () => {
	const { loading, user } = useAuth0();

	if (loading || !user) {
		return "Loading...";
	}

	return (
		<>
			<img src={userObj.picture} alt='Profile' />

			<h2>{userObj.name}</h2>
			<p>{userObj.email}</p>
		</>
	);
};

export default Profile;
