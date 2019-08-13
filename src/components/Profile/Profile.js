import React from 'react';
import { useAuth0 } from './../../react-auth0-wrapper';
import Favorites from "../Favorites/Favorites";
import "./Profile.css"

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return 'Loading...';
  }

  return (
    <div>
      <div className='profile'>
      <img src={user.picture} alt='Profile'/>

      <h2>{user.name}</h2>
      <p>{user.email}</p>
      </div>

      <Favorites user={user.email}/>
      
      
    </div>
    

  );
};

export default Profile;
