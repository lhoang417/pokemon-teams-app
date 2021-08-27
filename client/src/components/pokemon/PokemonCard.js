import React, { useState, useEffect } from "react";
import styled from "styled-components";
import spinner from "../pokemon/spinner.gif";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEasybase } from "easybase-react";

const Sprite = styled.img`
	width: 50%;
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

const StyledLink = styled(Link)`
	text-decoration: none;
	user-select: none;
	&:focus,
	&:hover,
	&:visited,
	&:link,
	&:active {
		text-decoration: none;
		user-select: none;
	}
`;

function PokemonCard(props) {
	const [name, setName] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [pokemonIndex, setPokemonIndex] = useState("");
	const [pokemonTeam, setPokemonTeam] = useState([]);
	const [pokemon, setPokemon] = useState([]);
	const { db } = useEasybase();
	const [imageLoading, setImageLoading] = useState(true);
	const [tooManyRequests, setTooManyRequests] = useState(false);
	const [type, setType] = useState("");
	const [hp, setHp] = useState([]);
	const [attack, setAttack] = useState([]);
	const [defense, setDefense] = useState([]);
	const [specialAttack, setSpecialAttack] = useState([]);
	const [specialDefense, setSpecialDefense] = useState([]);
	const [speed, setSpeed] = useState([]);

	const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
	// const pokeImgURL = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;
	const pokeImgURL = `https://raw.githubusercontent.com/lhoang417/pokemon-teams-app/main/client/src/components/pokemon/images/${pokemonIndex}.png?raw=true`;

	useEffect(() => {
		setName(props.name);
		setPokemonIndex(props.url.split("/")[6]);
		setImageUrl(pokeImgURL);
		setPokemonTeam(pokemonTeam);
		axios.get(pokemonUrl).then((res) => {
			setType(res.data.types[0].type.name);
			setHp(res.data.stats[0].base_stat);
			setAttack(res.data.stats[1].base_stat);
			setDefense(res.data.stats[2].base_stat);
			setSpecialAttack(res.data.stats[3].base_stat);
			setSpecialDefense(res.data.stats[4].base_stat);
			setSpeed(res.data.stats[5].base_stat);
		});
		// fetch(pokemonUrl)
		// 	.then((response) => response.json())
		// 	.then(function (allpokemon) {
		// 		fetchPokemonData(allpokemon.results);
		// 	});

		// function fetchPokemonData() {
		// 	fetch(pokemonUrl)
		// 		.then((response) => response.json())
		// 		.then(function (pokeData) {
		// 			setType(JSON.stringify(pokeData.types[0].type.name));
		// 		});
		// }
	}, [
		props.name,
		props.url,
		pokemonIndex,
		type,
		pokemonUrl,
		pokeImgURL,
		pokemonTeam,
	]);

	// const addToTeam = () => {
	// 	if (pokemonTeam.length >= 6) {
	// 		alert("Your party is full!");
	// 	} else {
	// 		const team = pokemonTeam.concat(pokemonIndex);
	// 		console.log(team);
	// 		setPokemonTeam(team);
	// 	}
	// };
	const addToTeam = (pokemon) => {
		if (pokemonTeam.length >= 6) {
			alert("Your team is full!");
			console.log(pokemonTeam);
		} else {
			setPokemonTeam([...pokemonTeam, pokemon]);
			db("POKEMON")
				.insert({
					Id: pokemonIndex,
					Name: name,
					Hp: hp,
					Attack: attack,
					Defense: defense,
					SpecialAttack: specialAttack,
					SpecialDefense: specialDefense,
					Speed: speed,
					Type: type,
					Image: imageUrl,
				})
				.one();
		}
	};

	return (
		<div>
			<StyledLink to={`pokemon/${pokemonIndex}`}>
				<div
					className="card"
					style={{ background: TYPE_COLORS[type.replace(/"/g, "")] }}
				>
					<h5 className="card-header">{pokemonIndex}</h5>
					{imageLoading ? (
						<img
							src={spinner}
							style={{ width: "30%" }}
							className="spinner card-img-top rounded mx-auto d-block mt-2"
							alt=""
						/>
					) : null}
					<Sprite
						className="imgCard card-img-top rounded mx-auto mt-2"
						src={imageUrl}
						onLoad={() => setImageLoading(false)}
						onError={() => setTooManyRequests(true)}
						style={
							tooManyRequests
								? { display: "none" }
								: imageLoading
								? null
								: { display: "block" }
						}
					/>
					{tooManyRequests ? (
						<h6 className="mx-auto">
							<span className="badge badge-danger mt-2">Too Many Requests</span>
						</h6>
					) : null}
					<div className="card-body mx-auto">
						<h6 className="card-title">
							{name
								.toLowerCase()
								.split(" ")
								.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
								.join(" ")}
						</h6>
					</div>
				</div>
			</StyledLink>
			<button
				className="addPokemonBtn"
				value={name}
				onMouseOver={(e) => setPokemon(e.target.value)}
				onClick={() => addToTeam(pokemon)}
			>
				Add to Team
			</button>
		</div>
	);
}

export default PokemonCard;
