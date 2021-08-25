import React from "react";
import useSound from "use-sound";
import pokemon from "../Pokemon.mp3";

function BoopBtn() {
	const [play] = useSound(pokemon);
	return (
		<div>
			<button onClick={play}>Boop!</button>;
		</div>
	);
}

export default BoopBtn;
