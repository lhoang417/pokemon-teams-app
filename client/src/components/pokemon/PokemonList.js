import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import { Link } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import styled from "styled-components";

const StyledLink = styled(Link)`
	color: white;
	text-decoration: none;
	&:focus,
	&:hover,
	&:visited,
	&:link,
	&:active {
		text-decoration: none;
		color: white;
	}
`;

function PokemonList() {
	const url = "https://pokeapi.co/api/v2/pokemon?limit=151/";
	const [pokemon, setPokemon] = useState([]);
	const [pokemonName, setPokemonName] = useState("");
	const [pokemonTeam, setPokemonTeam] = useState([]);
	const [text, setText] = useState("");

	useEffect(() => {
		axios.get(url).then((res) => setPokemon(res.data["results"]));
	}, []);

	const addToTeam = (pokemonName) => {
		if (pokemonTeam.length >= 6) {
			alert("Your team is full!");
			console.log(pokemonTeam);
		} else {
			// const team = pokemonTeam.concat({ name: pokemonName });
			// console.log(team);
			// console.log(pokemon);
			// console.log(pokemonName);

			// console.log(pokemonTeam);
			setPokemonTeam([...pokemonTeam, pokemonName]);
		}
	};

	return (
		<div className="listDiv">
			<input
				className="searchInput"
				placeholder="Search..."
				type="text"
				onChange={(e) => {
					setText(e.target.value);
				}}
			></input>
			<div className="team">
				{/* <h5>Team: </h5> */}
				<StyledLink to={"/PokemonTeam"}>
					<div className="span">
						{pokemonTeam.map((p) => (
							<span>{p}</span>
						))}
					</div>
				</StyledLink>
			</div>
			{pokemon ? (
				<div className=" pokeDisplay row ">
					{pokemon
						.filter((val) => {
							if (text === "") {
								return val;
							} else if (val.name.toLowerCase().includes(text.toLowerCase())) {
								return val;
							}
						})
						.map((pokemon) => (
							<div className="col-md-4 col-sm-6 mb-4 pokeBlock">
								<PokemonCard
									key={pokemon.name}
									name={pokemon.name}
									url={pokemon.url}
								/>
								<button
									className="addPokemonBtn"
									value={pokemon.name}
									onMouseOver={(e) => setPokemonName(e.target.value)}
									onClick={() => addToTeam(pokemonName)}
								>
									Add to Team
								</button>
							</div>
						))}
				</div>
			) : (
				<h1>Loading Pokemon</h1>
			)}
		</div>
	);
}

export default PokemonList;
