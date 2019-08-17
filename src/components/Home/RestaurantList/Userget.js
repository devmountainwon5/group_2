import React from 'react';
import { useAuth0 } from '../../../react-auth0-wrapper';

const Userget = () => {
  const { loading, user } = useAuth0();
  return user;
};

export default Userget;
