import React from "react";
import "./Navbar.css";
import { useAuth0 } from "./../../react-auth0-wrapper";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

//color pallete

//Navy Slate: #002642
//Black: #02040f
//Yellow-Orange: #e59500
//Light-Grey: #e5dada
//Red: #81171b

const colors = createMuiTheme({
	palette: {
		primary: {
			light: "#e59500",
			main: "#002642",
			dark: "#02040f",
			contrastText: "#81171b"
		},
		secondary: {
			light: "#e5dada",
			main: "#e59500",
			dark: "#81171b",
			contrastText: "#002642"
		}
	}
});

// const styles = theme => ({
// 	root: {
// 		// JSS uses px as the default units for this CSS property.
// 		padding: theme.spacing(2) // = 8 * 2
// 	}
// });

const useStyles = makeStyles(theme => ({
	root: {
		//Show Team Linear Background behind cards? - Have no "Parent Comp" other than App.js to apply to
		// background: "linear-gradient(45deg, #002642 30%, #e5dada 90%)",
		// border: 0,
		// borderRadius: 3,
		// boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
		// color: "e5dada",
		// height: 48,
		padding: theme.spacing(2),
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	}
}));

const NavBar = () => {
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
	const classes = useStyles();

	return (
		<ThemeProvider className={classes.root} theme={colors}>
			<spacing m="2rem" />
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						{!isAuthenticated && (
							<Button
								variant="contained"
								color="secondary"
								onClick={() => loginWithRedirect({})}>
								Log in
							</Button>
						)}

						{isAuthenticated && (
							<span>
								<spacing m="2rem" />
								<Button
									variant="contained"
									color="secondary"
									className="nav-buttons">
									<Link to="/">Home</Link>&nbsp;
								</Button>

								<Button
									variant="contained"
									color="secondary"
									className="nav-buttons">
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
								color="secondary"
								className="nav-buttons">
								Log out
							</Button>
						)}
					</Typography>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
};

export default NavBar;
