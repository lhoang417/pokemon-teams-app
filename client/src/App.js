// import React from "react";
// import Navbar from "./components/layouts/Navbar";
// import PokemonTeam from "./components/pokemon/PokemonTeam";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
// import Account from "./Account";
// import ebconfig from "./ebconfig";
// import { EasybaseProvider, useEasybase } from "easybase-react";

// import Dashboard from "./components/layouts/Dashboard";
// import { HashRouter as Router, Route, Switch } from "react-router-dom";
// import Pokemon from "./components/pokemon/Pokemon";
// import Home from "./components/layouts/Home";
// import Battle from "./components/pokemon/Battle";

// function LogIn() {
// 	const { isUserSignedIn, signOut, userID } = useEasybase();

// 	return isUserSignedIn() ? (
// 		<div>
// 			<Router>
// 				<div className="App">
// 					<Navbar />
// 					<div className="container">
// 						<Switch>
// 							<Route exact path="/" component={Home} />
// 							<Route exact path="/Dashboard" component={Dashboard} />
// 							<Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
// 							<Route exact path="/PokemonTeam" component={PokemonTeam} />
// 							<Route exact path="/battle" component={Battle} />
// 						</Switch>
// 					</div>
// 				</div>
// 				<div className="userInfo">
// 					<h5>{userID()}</h5>
// 					<button className="logOutBtn" onClick={signOut}>
// 						Log Out
// 					</button>
// 				</div>
// 			</Router>
// 		</div>
// 	) : (
// 		<Account />
// 	);
// }

// function App() {
// 	return (
// 		<EasybaseProvider ebconfig={ebconfig}>
// 			<LogIn />
// 		</EasybaseProvider>
// 	);
// }

// export default App;

import React from "react";
import Navbar from "./components/layouts/Navbar";
import PokemonTeam from "./components/pokemon/PokemonTeam";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ebconfig from "./ebconfig";
import { EasybaseProvider, useEasybase, Auth } from "easybase-react";

import Dashboard from "./components/layouts/Dashboard";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Pokemon from "./components/pokemon/Pokemon";
import Home from "./components/layouts/Home";
import Battle from "./components/pokemon/Battle";
import Chatroom from "./components/pokemon/Chatroom";

const SignOutButton = () => {
	const { signOut, userID } = useEasybase();

	return (
		<div className="userInfo">
			<h5>{userID().match(/^(.+)@/)[1]}</h5>
			<button className="logOutBtn" onClick={signOut}>
				Log Out
			</button>
		</div>
	);
};

function App() {
	return (
		<EasybaseProvider ebconfig={ebconfig}>
			<Auth className="loginDiv">
				<Router>
					<div className="App">
						<Navbar />
						<div className="container">
							<Switch>
								<Route exact path="/" component={Home} />
								<Route exact path="/Dashboard" component={Dashboard} />
								<Route
									exact
									path="/pokemon/:pokemonIndex"
									component={Pokemon}
								/>
								<Route exact path="/PokemonTeam" component={PokemonTeam} />
								<Route exact path="/battle" component={Battle} />
								<Route exact path="/chatroom" component={Chatroom} />
							</Switch>
						</div>
					</div>
					<SignOutButton />
				</Router>
			</Auth>
		</EasybaseProvider>
	);
}

export default App;
