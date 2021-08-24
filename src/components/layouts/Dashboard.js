import React from "react";
import PokemonList from "../pokemon/PokemonList";

function Dashboard() {
	return (
		<div className="row">
			<div className="col">
				<PokemonList />
			</div>
		</div>
	);
}

export default Dashboard;
