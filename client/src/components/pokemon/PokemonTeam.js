import React from "react";
import { useEasybase } from "easybase-react";
// import { useEffect, useState } from "react";
// import PokemonCard from "./PokemonCard";
const TYPE_COLORS = {
	bug: "linear-gradient(black, #B1C12E)",
	dark: "linear-gradient(black, #4F3A2D)",
	dragon: "linear-gradient(black, #755EDF)",
	electric: "linear-gradient(black, #FCBC17)",
	fairy: "linear-gradient(black, #F4B1F4)",
	fighting: "linear-gradient(black, #82351D)",
	fire: "linear-gradient(black, #E73B0C)",
	flying: "linear-gradient(black, #A3B3F7)",
	ghost: "linear-gradient(black, #6060B2)",
	grass: "linear-gradient(black, #74C236)",
	ground: "linear-gradient(black, #D3B357)",
	ice: "linear-gradient(black, #A3E7FD)",
	normal: "linear-gradient(black, darkgray)",
	psychic: "linear-gradient(black, #ED4882)",
	rock: "linear-gradient(black, #B9A156)",
	steel: "linear-gradient(black, #B5B5C3)",
	water: "linear-gradient(black, #3295F6)",
	poison: "linear-gradient(black, #934594)",
};

function PokemonTeam() {
	// const [easybaseData, setEasybaseData] = useState([]);
	const { db, useReturn } = useEasybase();

	// const {mounted} = async () => {
	const { frame } = useReturn(() => db("POKEMON").return().limit(10), []);
	// setEasybaseData(ebData);

	// useEffect(() => {
	// 	mounted();
	// });

	return (
		<div
			className="pokemonTeamDiv"
			style={{
				display: "flex",

				color: "white",
			}}
		>
			{frame.map((ele, i) => (
				<div
					key={i}
					className="card"
					style={{ background: TYPE_COLORS[ele.type.replace(/"/g, "")] }}
				>
					<h5 className="card-header">{ele.id}</h5>
					<img
						className="imgCard card-img-top rounded mx-auto mt-2"
						src={ele.image}
						alt=""
					/>
					<div className="card-body mx-auto">
						<h6 className="card-title">
							{ele.name
								.toLowerCase()
								.split(" ")
								.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
								.join(" ")}
						</h6>
					</div>
					{/* {console.log(ele)} */}
					<div className="baseStatsDiv">
						<h1>BASE STATS</h1>
						<h2>HP: {ele.hp}</h2>
						<h2>Attack: {ele.attack}</h2>
						<h2>Defense: {ele.defense}</h2>
						<h2>Special Attack: {ele.specialattack}</h2>
						<h2>Special Defense: {ele.specialdefense}</h2>
						<h2>Speed: {ele.speed}</h2>
						<h1>
							TYPE: <br />
							{ele.type.replace(/"/g, "").toUpperCase()}
						</h1>
					</div>
				</div>
			))}
		</div>
	);
}

export default PokemonTeam;
