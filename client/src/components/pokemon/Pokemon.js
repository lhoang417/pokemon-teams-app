import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
// import { v4 as uuidv4 } from "uuid";

const Sprite = styled.img`
	width: 30%;
	height: 30%;
	margin-top: 0.5em;
`;
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

function Pokemon(props) {
	const pokemonIndex = "";
	const [name, setName] = useState("");
	const [hp, setHp] = useState([]);
	const [attack, setAttack] = useState([]);
	const [defense, setDefense] = useState([]);
	const [specialAttack, setSpecialAttack] = useState([]);
	const [specialDefense, setSpecialDefense] = useState([]);
	const [speed, setSpeed] = useState([]);
	const [imageUrl, setImageUrl] = useState("");
	const [type, setType] = useState("");
	// const [pokemonTeam, setPokemonTeam] = useState([]);

	useEffect(() => {
		const { pokemonIndex } = props.match.params;
		const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
		setImageUrl(
			`https://raw.githubusercontent.com/lhoang417/pokemon-teams-app/main/client/src/components/pokemon/images/${pokemonIndex}.png?raw=true`
		);
		axios.get(pokemonUrl).then((res) => setName(res.data.name));

		axios.get(pokemonUrl).then((res) => {
			setType(res.data.types[0].type.name);
			setHp(res.data.stats[0].base_stat);
			setAttack(res.data.stats[1].base_stat);
			setDefense(res.data.stats[2].base_stat);
			setSpecialAttack(res.data.stats[3].base_stat);
			setSpecialDefense(res.data.stats[4].base_stat);
			setSpeed(res.data.stats[5].base_stat);
		});
	}, [pokemonIndex, props.match.params]);
	// const addToTeam = () => {
	// 	if (pokemonTeam.length >= 6) {
	// 		alert("Your party is full!");
	// 	} else {
	// 		const team = pokemonTeam.concat({
	// 			Id: uuidv4(),
	// 			Name: name,
	// 			Hp: hp,
	// 			Attack: attack,
	// 			Defense: defense,
	// 			SpecialAttack: specialAttack,
	// 			SpecialDefense: specialDefense,
	// 			Speed: speed,
	// 			Type: type,
	// 			Image: imageUrl,
	// 		});
	// 		console.log(team);

	// 		setPokemonTeam(team);
	// 	}
	// };
	return (
		<div
			className="pokeDiv"
			style={{ background: TYPE_COLORS[type.replace(/"/g, "")] }}
		>
			{/* <div className="team">
				<h5>Team: {pokemonTeam.length} added</h5>
			</div> */}

			<div className="imgDiv">
				<Sprite
					className="imgCard card-img-top rounded mx-auto"
					src={imageUrl}
				/>
				<div className="nameDiv">
					<h4>
						{name
							.toLowerCase()
							.split(" ")
							.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
							.join(" ")}
						&nbsp;
					</h4>
				</div>
				{/* <button className="addPokemonBtn" onClick={addToTeam}>
					Add to Team
				</button> */}
			</div>

			<div className="baseStatsDiv">
				<h1>BASE STATS</h1>
				<h2>HP: {hp}</h2>
				<h2>Attack: {attack}</h2>
				<h2>Defense: {defense}</h2>
				<h2>Special Attack: {specialAttack}</h2>
				<h2>Special Defense: {specialDefense}</h2>
				<h2>Speed: {speed}</h2>
				<h1>
					TYPE: <br />
					{type.replace(/"/g, "").toUpperCase()}
				</h1>
				{/* <h1>Total Base Stats: {}</h1> */}
			</div>
		</div>
	);
}

export default Pokemon;
