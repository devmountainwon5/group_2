import React from "react";
// import "./App.css";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import NavBar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ExternalApi from "./components/ExternalApi/ExternalApi";
// import MapComponent from './components/Home/MapComponent';
import Home from "./components/Home/Home";
import { Provider } from "react-redux";
import store from "./store";

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

const App = () => {
	return (
		<Provider store={store}>
			<ThemeProvider colors={colors}>
				<div className="App">
					{/* New - use BrowserRouter to provide access to /profile */}
					<BrowserRouter>
						<header>
							<NavBar />
						</header>
						<Switch>
							<Route path="/" exact component={Home} />
							<PrivateRoute path="/profile" component={Profile} />
							<PrivateRoute path="/external-api" component={ExternalApi} />
						</Switch>
					</BrowserRouter>
				</div>
			</ThemeProvider>
		</Provider>
	);
};

export default App;
