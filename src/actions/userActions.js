import { GET_USER } from "./types";

export const getUser = () => {
	let user = {
		email: userObj.email,
		last_name: userObj.last_name,
		first_name: userObj.first_name,
		username: userObj.username,
		profilepic: userObj.profilepic
	};
	dispatch({
		type: GET_USER,
		payload: user
	});
};
