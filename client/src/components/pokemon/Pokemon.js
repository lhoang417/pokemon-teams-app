import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

	return (
		<>
			<div
				className="pokeDiv"
				style={{ background: TYPE_COLORS[type.replace(/"/g, "")] }}
			>
				<div className="imgDiv">
					<Sprite
						className="imgCard card-img-top rounded mx-auto"
						src={imageUrl}
					/>
					<div className="nameDiv">
						<h4 className="font-effect-3d-float">
							{name
								.toLowerCase()
								.split(" ")
								.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
								.join(" ")}
							&nbsp;
						</h4>
					</div>
				</div>

				<div className="baseStatsDiv">
					<h1>BASE STATS</h1>
					<h2>
						HP: <span className="font-effect-3d">{hp}</span>
					</h2>
					<h2>
						Attack: <span className="font-effect-3d">{attack}</span>
					</h2>
					<h2>
						Defense: <span className="font-effect-3d">{defense}</span>
					</h2>
					<h2>
						Special Attack:{" "}
						<span className="font-effect-3d">{specialAttack}</span>
					</h2>
					<h2>
						Special Defense:{" "}
						<span className="font-effect-3d">{specialDefense}</span>
					</h2>
					<h2>
						Speed: <span className="font-effect-3d">{speed}</span>
					</h2>
					<h2>
						TYPE: <br />
						<span className="font-effect-3d">
							{type.replace(/"/g, "").toUpperCase()}
						</span>
					</h2>
				</div>
			</div>
			<Link
				className="backToList navbar-brand col-sm-4 col-md-2 mr-0 align-items-center"
				to="/Dashboard"
				style={{ zIndex: "1000" }}
			>
				<h3>{"<"} PokemonList</h3>
			</Link>
			<Link className="backToTeam" to={"/PokemonTeam"}>
				<h4 className="font-effect-anaglyph">{"<"} Team</h4>
			</Link>
		</>
	);
}

export default Pokemon;
