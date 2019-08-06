import React, { useEffect } from "react";
import NavBar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ExternalApi from "./components/ExternalApi/ExternalApi";
// import MapComponent from './components/Home/MapComponent';
import Home from "./components/Home/Home";
import { Provider } from "react-redux";
import store from "./store";

export default function App() {
	return (
		<Provider store={store}>
			<div className='App'>
				{/* New - use BrowserRouter to provide access to /profile */}
				<BrowserRouter>
					<header>
						<NavBar />
					</header>
					<Switch>
						<Route path='/' exact component={Home} />
						<PrivateRoute path='/profile' component={Profile} />
						<PrivateRoute path='/external-api' component={ExternalApi} />
					</Switch>
				</BrowserRouter>
			</div>
		</Provider>
	);
}
