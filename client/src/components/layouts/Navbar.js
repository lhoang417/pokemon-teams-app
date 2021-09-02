import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
	return (
		<div className="mb-3 navDiv">
			<nav
				className="navbar navbar-expand-md  fixed-top"
				style={{ zIndex: "1" }}
			>
				<a
					className="navbar-brand col-sm-4 col-md-2 mr-0 align-items-center"
					href="/"
				>
					Dashboard
				</a>
				<Link
					className="navbar-brand col-sm-4 col-md-2 mr-0 align-items-center"
					to="/chatroom"
				>
					CHATROOM
				</Link>
			</nav>
		</div>
	);
}

export default Navbar;
