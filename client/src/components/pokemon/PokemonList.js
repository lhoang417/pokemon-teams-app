import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useEasybase } from "easybase-react";
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
	const [text, setText] = useState("");
	const { db, useReturn } = useEasybase();
	const { frame } = useReturn(() => db("POKEMON", true).return().limit(6), []);

	useEffect(() => {
		axios.get(url).then((res) => setPokemon(res.data["results"]));
	}, []);

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
									<img
										src={pokeball}
										alt=""
										style={{ width: "25px", height: "25px" }}
									/>
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
