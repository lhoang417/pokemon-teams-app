import React from "react";
import { Link } from "react-router-dom";
// import { useEasybase } from "easybase-react";

function Home() {
	// const { getUserAttribrutes } = useEasybase();
	return (
		<div className="homeDiv">
			<div className="homeHeading">
				<h1>
					Welcome to Pokemon Teams!
					<br />
					Click on the link below to view all pokemon <br /> and select your
					team.
					<br />
				</h1>
				<div className="homeLinkDiv">
					<Link
						className="linkTag navbar-brand col-sm-4 col-md-2 mr-0 align-items-center"
						to="/Dashboard"
					>
						<h1>Pokemon</h1>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Home;
