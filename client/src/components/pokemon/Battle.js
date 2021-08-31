import React, { useState, useEffect } from "react";
import { useEasybase } from "easybase-react";
import pokeball from "../layouts/pokeball.png";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Battle() {
	const { db, useReturn, userID } = useEasybase();
	const [brockTeam, setBrockTeam] = useState([]);
	const [mistyTeam, setMistyTeam] = useState([]);
	const [ltSurgeTeam, setLtSurgeTeam] = useState([]);
	const [erikaTeam, setErikaTeam] = useState([]);
	const [kogaTeam, setKogaTeam] = useState([]);
	const [sabrinaTeam, setSabrinaTeam] = useState([]);
	const [blaineTeam, setBlaineTeam] = useState([]);
	const [giovanniTeam, setGiovanniTeam] = useState([]);
	const [ashTeam, setAshTeam] = useState([]);
	const [open, setOpen] = useState(false);
	const [winner, setWinner] = useState("winner");
	const [loser, setLoser] = useState("loser");
	const [stats, setStats] = useState([]);
	const [opp, setOpp] = useState("");
	const [yourDispStats, setYourDispStats] = useState(0);
	const [oppDispStats, setOppDispStats] = useState(0);
	const { frame } = useReturn(() => db("POKEMON", true).return(), []);

	const mounted = async () => {
		const ebData = await db("POKEMON", false)
			.return()
			.where({ gymleader: "brock" })
			.all();
		setBrockTeam(ebData);
		const ebData1 = await db("POKEMON", false)
			.return()
			.where({ gymleader: "misty" })
			.all();
		setMistyTeam(ebData1);
		const ebData2 = await db("POKEMON", false)
			.return()
			.where({ gymleader: "lt. surge" })
			.all();
		setLtSurgeTeam(ebData2);
		const ebData3 = await db("POKEMON", false)
			.return()
			.where({ gymleader: "erika" })
			.all();
		setErikaTeam(ebData3);
		const ebData4 = await db("POKEMON", false)
			.return()
			.where({ gymleader: "koga" })
			.all();
		setKogaTeam(ebData4);
		const ebData5 = await db("POKEMON", false)
			.return()
			.where({ gymleader: "sabrina" })
			.all();
		setSabrinaTeam(ebData5);
		const ebData6 = await db("POKEMON", false)
			.return()
			.where({ gymleader: "blaine" })
			.all();
		setBlaineTeam(ebData6);
		const ebData7 = await db("POKEMON", false)
			.return()
			.where({ gymleader: "giovanni" })
			.all();
		setGiovanniTeam(ebData7);
		const ebData8 = await db("POKEMON", false)
			.return()
			.where({ gymleader: "ash ketchum" })
			.all();
		setAshTeam(ebData8);
	};

	useEffect(() => {
		mounted();
	}, []);

	function handleBattle() {
		let yourStats = 0;
		let oppStats = 0;
		for (let i = 0; i < frame.length; i++) {
			yourStats += frame[i].hp;
			yourStats += frame[i].attack;
			yourStats += frame[i].defense;
			yourStats += frame[i].specialattack;
			yourStats += frame[i].specialdefense;
			yourStats += frame[i].speed;
			setYourDispStats(yourStats);
		}
		for (let i = 0; i < stats.length; i++) {
			oppStats += stats[i].hp;
			oppStats += stats[i].attack;
			oppStats += stats[i].defense;
			oppStats += stats[i].specialattack;
			oppStats += stats[i].specialdefense;
			oppStats += stats[i].speed;
			setOppDispStats(oppStats);
		}
		if (yourStats > oppStats) {
			setLoser(opp);
			setWinner(userID());
			setOpen(true);
		} else if (yourStats < oppStats) {
			setLoser(userID());
			setWinner(opp);
			setOpen(true);
		} else {
			return (
				<div>
					<h1> Draw! </h1>
				</div>
			);
		}
	}

	return (
		<>
			<div className="row justify-content-center container">
				<div className="justify-content-center">
					<h1 className="font-effect-fire-animation battleH1 text-center">
						BATTLE
					</h1>
					<h2 className="text-center ">Choose your opponent!</h2>
				</div>
				<div className="row">
					<div className="col-lg-6 col-md-12 col-sm-12 battleDiv">
						<button
							onMouseOver={() => {
								setStats(ashTeam);
								setOpp("Ash Ketchum");
							}}
							onClick={() => {
								handleBattle();
							}}
							className="battleBtn"
						>
							<h1 className="card-header text-center font-effect-anaglyph">
								Ash Ketchum
							</h1>
							<div className="span2">
								<h2>Team:</h2>
								<div className="divInDiv2">
									{ashTeam.map((ele, i) => (
										<div key={ele.gymleader[i]}>
											<img src={pokeball} alt="" style={{ width: "30%" }} />
											<h3>{ele.name}</h3>
										</div>
									))}
								</div>
							</div>
						</button>
					</div>
					<div className="col-lg-6 col-md-12 col-sm-12 battleDiv">
						<button
							onMouseOver={() => {
								setStats(brockTeam);
								setOpp("Brock");
							}}
							onClick={handleBattle}
							className="battleBtn"
						>
							<h1 className="card-header text-center font-effect-anaglyph">
								Brock
							</h1>
							<div className="span2">
								<h2>Team:</h2>
								<div className="divInDiv2">
									{brockTeam.map((ele, i) => (
										<div key={ele.gymleader[i]}>
											<img src={pokeball} alt="" style={{ width: "30%" }} />
											<h3>{ele.name}</h3>
										</div>
									))}
								</div>
							</div>
						</button>
					</div>
					<div className="col-lg-6 col-md-12 col-sm-12 battleDiv">
						<button
							onMouseOver={() => {
								setStats(mistyTeam);
								setOpp("Misty");
							}}
							onClick={handleBattle}
							className="battleBtn"
						>
							<h1 className="card-header text-center font-effect-anaglyph">
								Misty
							</h1>
							<div className="span2">
								<h2>Team:</h2>
								<div className="divInDiv2">
									{mistyTeam.map((ele, i) => (
										<div key={ele.gymleader[i]}>
											<img src={pokeball} alt="" style={{ width: "30%" }} />
											<h3>{ele.name}</h3>
										</div>
									))}
								</div>
							</div>
						</button>
					</div>
					<div className="col-lg-6 col-md-12 col-sm-12 battleDiv">
						<button
							onMouseOver={() => {
								setStats(ltSurgeTeam);
								setOpp("Lt. Surge");
							}}
							onClick={handleBattle}
							className="battleBtn"
						>
							<h1 className="card-header text-center font-effect-anaglyph">
								Lt. Surge
							</h1>
							<div className="span2">
								<h2>Team:</h2>
								<div className="divInDiv2">
									{ltSurgeTeam.map((ele, i) => (
										<div key={ele.gymleader[i]}>
											<img src={pokeball} alt="" style={{ width: "30%" }} />
											<h3>{ele.name}</h3>
										</div>
									))}
								</div>
							</div>
						</button>
					</div>
					<div className="col-lg-6 col-md-12 col-sm-12 battleDiv">
						<button
							onMouseOver={() => {
								setStats(erikaTeam);
								setOpp("Erika");
							}}
							onClick={handleBattle}
							className="battleBtn"
						>
							<h1 className="card-header text-center font-effect-anaglyph">
								Erika
							</h1>
							<div className="span2">
								<h2>Team:</h2>
								<div className="divInDiv2">
									{erikaTeam.map((ele, i) => (
										<div key={ele.gymleader[i]}>
											<img src={pokeball} alt="" style={{ width: "30%" }} />
											<h3>{ele.name}</h3>
										</div>
									))}
								</div>
							</div>
						</button>
					</div>
					<div className="col-lg-6 col-md-12 col-sm-12 battleDiv">
						<button
							onMouseOver={() => {
								setStats(kogaTeam);
								setOpp("Koga");
							}}
							onClick={handleBattle}
							className="battleBtn"
						>
							<h1 className="card-header text-center font-effect-anaglyph">
								Koga
							</h1>
							<div className="span2">
								<h2>Team:</h2>
								<div className="divInDiv2">
									{kogaTeam.map((ele, i) => (
										<div key={ele.gymleader[i]}>
											<img src={pokeball} alt="" style={{ width: "30%" }} />
											<h3>{ele.name}</h3>
										</div>
									))}
								</div>
							</div>
						</button>
					</div>
					<div className="col-lg-6 col-md-12 col-sm-12 battleDiv">
						<button
							onMouseOver={() => {
								setStats(sabrinaTeam);
								setOpp("Sabrina");
							}}
							onClick={handleBattle}
							className="battleBtn"
						>
							<h1 className="card-header text-center font-effect-anaglyph">
								Sabrina
							</h1>
							<div className="span2">
								<h2>Team:</h2>
								<div className="divInDiv2">
									{sabrinaTeam.map((ele, i) => (
										<div key={ele.gymleader[i]}>
											<img src={pokeball} alt="" style={{ width: "30%" }} />
											<h3>{ele.name}</h3>
										</div>
									))}
								</div>
							</div>
						</button>
					</div>
					<div className="col-lg-6 col-md-12 col-sm-12 battleDiv">
						<button
							onMouseOver={() => {
								setStats(blaineTeam);
								setOpp("Blaine");
							}}
							onClick={handleBattle}
							className="battleBtn"
						>
							<h1 className="card-header text-center font-effect-anaglyph">
								Blaine
							</h1>
							<div className="span2">
								<h2>Team:</h2>
								<div className="divInDiv2">
									{blaineTeam.map((ele, i) => (
										<div key={ele.gymleader[i]}>
											<img src={pokeball} alt="" style={{ width: "30%" }} />
											<h3>{ele.name}</h3>
										</div>
									))}
								</div>
							</div>
						</button>
					</div>
					<div className="col-lg-6 col-md-12 col-sm-12 battleDiv">
						<button
							onMouseOver={() => {
								setStats(giovanniTeam);
								setOpp("Giovanni");
							}}
							onClick={handleBattle}
							className="battleBtn"
						>
							<h1 className="card-header text-center font-effect-anaglyph">
								Giovanni
							</h1>
							<div className="span2">
								<h2>Team:</h2>
								<div className="divInDiv2">
									{giovanniTeam.map((ele, i) => (
										<div key={ele.gymleader[i]}>
											<img src={pokeball} alt="" style={{ width: "30%" }} />
											<h3>{ele.name}</h3>
										</div>
									))}
								</div>
							</div>
						</button>
					</div>
				</div>
				<AnimatePresence>
					{open && (
						<motion.div
							initial={{
								opacity: 0,
							}}
							animate={{
								opacity: 1,
								transition: {
									duration: 1,
								},
							}}
							exit={{
								opacity: 0,
								transition: {
									duration: 0.3,
								},
							}}
							className={`modal-backdrop `}
						>
							<motion.div
								initial={{
									scale: 0,
								}}
								animate={{
									scale: 1,
									transition: {
										duration: 1,
										transition: {
											duration: 1,
										},
									},
								}}
								exit={{
									scale: 0,
								}}
								className="modal-content-wrapper"
							>
								<motion.div
									initial={{
										x: 100,
										opacity: 0,
									}}
									animate={{
										x: 0,
										opacity: 1,
										transition: {
											delay: 1,
											duration: 3,
										},
									}}
									exit={{
										x: 100,
										opacity: 0,
									}}
									className="modal-content"
								>
									<h5>
										{userID()}'s Battle Level:
										<span className="font-effect-3d-float">
											&nbsp;{yourDispStats}
										</span>
										<br />
										vs
										<br /> {opp}'s Battle Level:
										<span className="font-effect-3d-float">
											&nbsp;{oppDispStats}
										</span>
									</h5>

									<motion.h1
										initial={{
											x: 100,
											opacity: 0,
										}}
										animate={{
											x: 0,
											opacity: 1,
											transition: {
												delay: 2,
												duration: 3,
											},
										}}
										exit={{
											x: 100,
											opacity: 0,
										}}
										className="font-effect-anaglyph"
									>
										{loser}
									</motion.h1>
									<motion.h4
										initial={{
											x: 100,
											opacity: 0,
										}}
										animate={{
											x: 0,
											opacity: 1,
											transition: {
												delay: 3,
												duration: 2,
											},
										}}
										exit={{
											x: 100,
											opacity: 0,
										}}
									>
										was defeated by{" "}
									</motion.h4>
									<br />
									<motion.h1
										initial={{
											x: 100,
											opacity: 0,
										}}
										animate={{
											x: 0,
											opacity: 1,
											transition: {
												delay: 4,
												duration: 2,
											},
										}}
										exit={{
											x: 100,
											opacity: 0,
										}}
										className="winner font-effect-fire-animation"
									>
										{winner}
									</motion.h1>
								</motion.div>
								<button className="exitBtn" onClick={() => setOpen(false)}>
									Exit
								</button>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
			<Link className="backToList3 " to={"/PokemonTeam"}>
				{"<"} Team
			</Link>
		</>
	);
}

export default Battle;
