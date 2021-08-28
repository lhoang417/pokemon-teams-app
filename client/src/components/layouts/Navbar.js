import React from "react";

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
			</nav>
		</div>
	);
}

export default Navbar;
