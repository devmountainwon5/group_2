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
			setUserEmail(user.email)
		}
    }, 1000)

    const getUserFavorites = () => {
        debugger
        axios.post('/api/user_favorites', { userEmail: userEmail })
        .then( results => {
            debugger
            setFavorites(results.data)
        })
        .catch( err => {
            debugger
            console.log(err)
        })
    }
    // useEffect( () => {
    //     debugger
    //     getUserFavorites();
    // }, [])

    return (
        <div>
            <div className='profile'>
                <img src={user.picture} alt='Profile' className='pic' />

                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </div>

            <Favorites place_id='ChIJi1LOhMKxEmsRA1xvD0eBi-A' userEmail={userEmail} restaurantName='Pizza Hut' />
            <Favorites />
            <Favorites />
        </div>
    );
};

export default Profile;