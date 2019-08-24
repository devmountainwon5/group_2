import React, { useState, useEffect } from "react";
import { useAuth0 } from "./../../react-auth0-wrapper";
import Favorites from "../Favorites/Favorites";
import axios from "axios";
import "./Profile.css";
const Profile = () => {
	const { loading, user } = useAuth0();
	const [userEmail, setUserEmail] = useState(null);
	const [userId, setUserId] = useState(null);
	const [favorites, setFavorites] = useState([]);
	setInterval(() => {
		if (user && !userEmail) {
			setUserEmail(user.email);
		}
	}, 1000);
	const getUserFavorites = () => {
		axios
			.post("/api/userfavorites", { userEmail: userEmail })
			.then(results => {
				setFavorites(results.data);
			})
			.catch(err => {
				console.log(err);
			});
	};
	if (userEmail) {
		getUserFavorites();
	}
	let favoritesList = favorites.map(e => {
		return (
			<Favorites
				place_id={e.place_id}
				res_name={e.res_name}
				userEmail={userEmail}
				res_address={e.res_address}
                rating={e.rating}
                favorite_id={e.favorite_id}
			/>
		);
	});
	return (
		<div>
			<div className='profile'>
				<img src={user.picture} alt='Profile' className='pic' />​
				<h2>{user.name}</h2>
				<p>{user.email}</p>
			</div>
			​<div>{favoritesList}</div>
		</div>
	);
};
export default Profile;
