import React from "react";
import { Link } from "react-router-dom";
import { useEasybase } from "easybase-react";

function Home() {
	const { userID } = useEasybase();
	return (
		<div className="homeDiv">
			<div className="homeHeading">
				<span className="dashUserSpan">{userID().match(/^(.+)@/)[1]}</span>
				<h1 className="welcomeH1 font-effect-fire-animation">
					Welcome to Pokemon Teams!
					<br />
					Select your team with the link below... <br />
					FINALLY BATTLE THE GYM LEADERS!
					<br />
				</h1>
				<div className="homeLinkDiv">
					<div>
						<Link
							className="linkTag navbar-brand col-sm-4 col-md-2 mr-0 align-items-center"
							to="/Dashboard"
						>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							<h1 className="homeH1">Pokemon</h1>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
