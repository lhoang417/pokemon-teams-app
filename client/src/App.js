import React from "react";
import Navbar from "./components/layouts/Navbar";
import PokemonTeam from "./components/pokemon/PokemonTeam";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Dashboard from "./components/layouts/Dashboard";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Pokemon from "./components/pokemon/Pokemon";
// import BoopBtn from "./components/BoopBtn";

function App() {
	return (
		<Router>
			<div className="App">
				<Navbar />
				{/* <BoopBtn /> */}
				<div className="container">
					<Switch>
						<Route exact path="/" component={Dashboard} />
						<Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
						<Route exact path="/PokemonTeam" component={PokemonTeam} />
					</Switch>
				</div>
			</div>
		</Router>
	);
}

export default App;
