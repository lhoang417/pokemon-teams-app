import React from "react";
// import pokeball from "./pokeball.png";
// import { Link } from "react-router-dom";

function Navbar() {
	return (
		<div className="mb-3 navDiv">
			<nav className="navbar navbar-expand-md  fixed-top">
				<a
					className="navbar-brand col-sm-4 col-md-2 mr-0 align-items-center"
					href="/"
				>
					Home
				</a>
				{/* <Link
					className="linkTag navbar-brand col-sm-4 col-md-2 mr-0 align-items-center"
					to={"/PokemonTeam"}
				>
					Team
				</Link> */}
			</nav>
		</div>
	);
}

export default Navbar;
