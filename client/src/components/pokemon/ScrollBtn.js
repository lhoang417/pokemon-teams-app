import React, { useState } from "react";

const ScrollButton = () => {
	const [visible, setVisible] = useState(false);

	const toggleVisible = () => {
		const scrolled = document.documentElement.scrollTop;
		if (scrolled > 100) {
			setVisible(true);
		} else if (scrolled <= 100) {
			setVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	window.addEventListener("scroll", toggleVisible);

	return (
		<>
			<div
				className="upDiv"
				onClick={scrollToTop}
				style={{ display: visible ? "inline" : "none" }}
			>
				<h3>^</h3>
			</div>
		</>
	);
};

export default ScrollButton;
