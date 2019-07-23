import React from "react";
import "./Navbar.css";
import { useAuth0 } from "./../../react-auth0-wrapper";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
// import { spacing } from "@material-ui/system";

const NavBar = () => {
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

	return (
		<div className="nav">
			<span>
				{!isAuthenticated && (
					<button onClick={() => loginWithRedirect({})}>Log in</button>
				)}

				{isAuthenticated && (
					<span>
						<Button variant="contained" color="primary" className="nav-buttons">
							<Link to="/">Home</Link>&nbsp;
						</Button>
						{/* <spacing m="2rem" /> */}
						<Button variant="contained" color="primary" className="nav-buttons">
							<Link to="/profile">Profile</Link>
							&nbsp;
						</Button>

						{/* NEW - Add a link to the /external-api route */}
						{/* <Link to="/external-api">External API</Link> */}
					</span>
				)}

				{isAuthenticated && (
					<Button
						onClick={() => logout()}
						variant="contained"
						color="primary"
						className="nav-buttons">
						Log out
					</Button>
				)}
			</span>
		</div>
	);
};

export default NavBar;
