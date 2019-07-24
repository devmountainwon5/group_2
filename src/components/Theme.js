import React, { Componennt } from "react";
import {
	makeStyles,
	AppBar,
	Toolbar,
	Typography,
	Button,
	createMuiTheme
} from "@material-ui/core";
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

const useStyles = makeStyles(theme => ({
	root: {
		//Show Team Linear Background behind cards? - Have no "Parent Comp" other than App.js to apply to
		background: "linear-gradient(45deg, #002642 30%, #e5dada 90%)",
		border: 0,
		borderRadius: 3,
		boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
		color: "e5dada",
		height: 48,
		padding: "0 30px",
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	}
}));

class Theme extends Component {
	render() {
		const classes = useStyles();

		return <ThemeProvider className={classes.root} theme={colors} />;
	}
}

export default Theme;
