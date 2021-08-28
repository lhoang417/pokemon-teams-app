import React from "react";
import Navbar from "./components/layouts/Navbar";
import PokemonTeam from "./components/pokemon/PokemonTeam";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Account from "./Account";
import ebconfig from "./ebconfig";
import { EasybaseProvider, useEasybase } from "easybase-react";

import Dashboard from "./components/layouts/Dashboard";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Pokemon from "./components/pokemon/Pokemon";
import Home from "./components/layouts/Home";

function LogIn() {
	const { isUserSignedIn, signOut, userID } = useEasybase();

	return isUserSignedIn() ? (
		<div>
			<Router>
				<div className="App">
					<Navbar />
					<div className="container">
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/Dashboard" component={Dashboard} />
							<Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
							<Route exact path="/PokemonTeam" component={PokemonTeam} />
						</Switch>
					</div>
				</div>
				<div className="userInfo">
					<h5>{userID()}</h5>
					<button className="logOutBtn" onClick={signOut}>
						Log Out
					</button>
				</div>
			</Router>
		</div>
	) : (
		<Account />
	);
}

function App() {
	return (
		<EasybaseProvider ebconfig={ebconfig}>
			<LogIn />
		</EasybaseProvider>
	);
}

export default App;
