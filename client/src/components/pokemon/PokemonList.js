import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import { Link } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import styled from "styled-components";
import { useEasybase } from "easybase-react";
// import PokemonTeam from "./PokemonTeam";
import pokeball from "../layouts/pokeball.png";

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
	// const [pokemonName, setPokemonName] = useState("");
	const [text, setText] = useState("");
	const { db, useReturn } = useEasybase();
	const { frame } = useReturn(() => db("POKEMON").return().limit(6), []);
	// const [pokemonTeam, setPokemonTeam] = useState([]);

	useEffect(() => {
		axios.get(url).then((res) => setPokemon(res.data["results"]));
	}, []);

	// const addToTeam = (pokemonName) => {
	// 	if (pokemonTeam.length >= 6) {
	// 		alert("Your team is full!");
	// 		console.log(pokemonTeam);
	// 	} else {
	// 		setPokemonTeam([...pokemonTeam, pokemonName]);
	// 		db("POKEMON")
	// 			.insert({
	// 				name: pokemonName,
	// 			})
	// 			.one();
	// 	}
	// };

	return (
		<div className="listDiv">
			<input
				className="searchInput font-effect-anaglyph"
				placeholder="Search..."
				type="text"
				onChange={(e) => {
					setText(e.target.value);
				}}
			></input>
			<div className="team">
				<StyledLink to={"/PokemonTeam"}>
					<div className="span">
						<h3>Team:</h3>
						<div className="divInDiv">
							{frame.map((ele, i) => (
								<div key={i}>
									<img src={pokeball} alt="" style={{ width: "80%" }} />
								</div>
							))}
						</div>
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
						.map((pokemon, index) => (
							<div key={index} className="col-md-4 col-sm-6 mb-4 pokeBlock">
								<PokemonCard name={pokemon.name} url={pokemon.url} />
								{/* <button
									className="addPokemonBtn"
									value={pokemon.name}
									onMouseOver={(e) => setPokemonName(e.target.value)}
									onClick={() => addToTeam(pokemonName)}
								>
									Add to Team
								</button> */}
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
