import React from "react";
import NavBar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ExternalApi from "./components/ExternalApi/ExternalApi";

function App() {
	return (
		<div className="App">
			{/* New - use BrowserRouter to provide access to /profile */}
			<BrowserRouter>
				<header>
					<NavBar />
				</header>
				<Switch>
					<Route path="/" exact />
					<PrivateRoute path="/profile" component={Profile} />
					<PrivateRoute path="/external-api" component={ExternalApi} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
