import React from "react";
import PokemonList from "../pokemon/PokemonList";
import ScrollButton from "../pokemon/ScrollBtn";

function Dashboard() {
	return (
		<div className="row">
			<div className="col">
				<PokemonList />
				<ScrollButton />
			</div>
		</div>
	);
}

export default Dashboard;
