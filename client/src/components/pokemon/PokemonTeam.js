import React, { useState } from "react";
import { useEasybase } from "easybase-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

const StyledLink = styled(Link)`
	overflow: hidden;
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

function PokemonTeam() {
	// const [easybaseData, setEasybaseData] = useState([]);
	const { db, useReturn } = useEasybase();
	const [nameToDelete, setNameToDelete] = useState("");

	// const {mounted} = async () => {
	const { frame } = useReturn(() => db("POKEMON", true).return().limit(6), []);
	// setEasybaseData(ebData);

	// useEffect(() => {
	// 	mounted();
	// });
	const handleDelete = async (e) => {
		await db("POKEMON", true).delete().where({ name: nameToDelete }).one();
	};

	return (
		<>
			<div
				className="pokemonTeamDiv container"
				style={{
					color: "white",
					width: "100vw",
				}}
			>
				<div className="row justify-content-center">
					{frame.map((ele, i) => (
						<div
							key={i}
							className="card card2 col-lg-3 col-md-4 col-sm-6 mt-3"
							style={{ background: TYPE_COLORS[ele.type.replace(/"/g, "")] }}
						>
							<StyledLink to={`pokemon/${ele.id}`}>
								<div>
									<h5 className="card-header">{ele.id}</h5>
									<img
										className="imgCard card-img-top rounded mx-auto mt-1"
										src={ele.image}
										alt=""
									/>
									<div className="card-body mx-auto">
										<h6 className="card-title card-title2 font-effect-3d-float ">
											{ele.name
												.toLowerCase()
												.split(" ")
												.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
												.join(" ")}
										</h6>
									</div>

									{/* <div className="baseStatsDiv">
							<h1>BASE STATS</h1>
							<h2>HP: {ele.hp}</h2>
							<h2>Attack: {ele.attack}</h2>
							<h2>Defense: {ele.defense}</h2>
							<h2>Special Attack: {ele.specialattack}</h2>
							<h2>Special Defense: {ele.specialdefense}</h2>
							<h2>Speed: {ele.speed}</h2>
							<h1>TYPE </h1>
							<br />
							<h2 style={{ marginTop: "-1em" }}>
								{ele.type.replace(/"/g, "").toUpperCase()}
							</h2>
						</div> */}
								</div>
							</StyledLink>

							<button
								className="deleteBtn"
								onMouseOver={(e) => {
									setNameToDelete(ele.name);
									console.log(nameToDelete);
								}}
								onClick={(e) => handleDelete(e.target.value)}
							>
								Delete
							</button>
						</div>
					))}
				</div>
				<Link className="toBattle" to={`/battle`}>
					battle
				</Link>
			</div>

			<Link className="backToList2" to="/Dashboard">
				<h3>{"<"} PokemonList</h3>
			</Link>
		</>
	);
}

export default PokemonTeam;
