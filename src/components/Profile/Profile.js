import React, { useState } from "react";
import { useAuth0 } from "./../../react-auth0-wrapper";
import Favorites from "../Favorites/Favorites";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
    const { loading, user } = useAuth0();
    const [userEmail, setUserEmail] = useState(null);
    const [userId, setUserId] = useState(null);
    setInterval(() => {
		if (user && !userEmail) {
			setUserEmail(user.email)
		}
	}, 1000)
    const getUserId = () => {
        axios.post("/api/getuser", { userEmail: userEmail }).then(results => {
			setUserId(results.data[0].id);
			console.log(userId)
        });
    };
    if (userEmail) {
		getUserId();
	}

    return (
        <div>
            <div className='profile'>
                <img src={user.picture} alt='Profile' className='pic' />

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