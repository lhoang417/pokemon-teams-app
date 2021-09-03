import React, { useState, useEffect } from "react";
import { useEasybase } from "easybase-react";
import pokeball from "../layouts/pokeball.png";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import _ from "underscore";

function Battle() {
	const { db, useReturn, userID } = useEasybase();
	const [yourTeam, setYourTeam] = useState([]);
	const [open, setOpen] = useState(false);
	const [winner, setWinner] = useState("");
	const [loser, setLoser] = useState("");
	const [aftermath, setAftermath] = useState("");
	const [stats, setStats] = useState([]);
	const [opp, setOpp] = useState("");
	const [yourDispStats, setYourDispStats] = useState(0);
	const [oppDispStats, setOppDispStats] = useState(0);
	const [allData, setAllData] = useState([]);
	const { frame } = useReturn(() => db("POKEMON").return(), []);

	const usersArr = allData.map((e) => e.gymleader);
	const users = [...new Set(usersArr)];

	const mounted = async () => {
		const allData = await db("POKEMON").return().all();
		setAllData(allData);

		const yourData = await db("POKEMON")
			.return()
			.where({ gymleader: userID().match(/^(.+)@/)[1] })
			.all();
		setYourTeam(yourData);
	};

	useEffect(() => {
		mounted();
	}, []);
	function isSameVal(el, index, arr) {
		// Return true for the first element
		if (index === 0) {
			return true;
		} else {
			// Compare the value of the previous element
			return el.name === arr[index - 1].name;
		}
	}

	function handleBattle() {
		const resultsArr = [
			"got obliterated by",
			"got destroyed by",
			"got wrecked by",
			"is complete trash...The winner is",
			"can go home and train more. Winner is",
			"is a NOOB! Make space for",
		];

		const randomInd = Math.floor(Math.random() * resultsArr.length);
		const randomInsult = resultsArr[randomInd];
		setAftermath(randomInsult);
		let yourStats = 0;
		let oppStats = 0;
		let automatic = 0;
		let oppAuto = 0;

		for (let i = 0; i < yourTeam.length; i++) {
			if (yourTeam[0].name === "magikarp" && yourTeam.every(isSameVal)) {
				automatic = 1;
			} else {
				automatic = 0;
			}
			yourStats += yourTeam[i].hp;
			yourStats += yourTeam[i].attack;
			yourStats += yourTeam[i].defense;
			yourStats += yourTeam[i].specialattack;
			yourStats += yourTeam[i].specialdefense;
			yourStats += yourTeam[i].speed;
			setYourDispStats(yourStats);
		}
		for (let i = 0; i < stats.length; i++) {
			if (stats[0].name === "magikarp" && stats.every(isSameVal)) {
				oppAuto = 1;
			} else {
				oppAuto = 0;
			}
			oppStats += stats[i].hp;
			oppStats += stats[i].attack;
			oppStats += stats[i].defense;
			oppStats += stats[i].specialattack;
			oppStats += stats[i].specialdefense;
			oppStats += stats[i].speed;
			setOppDispStats(oppStats);
		}
		if (automatic === 1 && oppAuto === 1) {
			setYourDispStats("MAGIKARP!!");
			setOppDispStats("MAGIKARP!!");
			setLoser(
				opp
					.toLowerCase()
					.split(" ")
					.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
					.join(" ")
			);
			setWinner(
				userID()
					.match(/^(.+)@/)[1]
					.toLowerCase()
					.split(" ")
					.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
					.join(" ")
			);
			setAftermath("tied with");
			setOpen(true);
		} else if (automatic === 1 && oppAuto === 0) {
			setLoser(
				opp
					.toLowerCase()
					.split(" ")
					.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
					.join(" ")
			);
			setYourDispStats("over 9,000!!");
			setWinner("Magikarp FTW!");
			setOpen(true);
		} else if (oppAuto === 1 && automatic === 0) {
			setLoser("Your team");
			setWinner("MAGIKARP");
			setOpen(true);
		} else if (yourStats > oppStats) {
			setLoser(
				opp
					.toLowerCase()
					.split(" ")
					.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
					.join(" ")
			);
			setWinner(
				userID()
					.match(/^(.+)@/)[1]
					.toLowerCase()
					.split(" ")
					.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
					.join(" ")
			);
			setOpen(true);
		} else if (yourStats < oppStats) {
			setLoser(
				userID()
					.match(/^(.+)@/)[1]
					.toLowerCase()
					.split(" ")
					.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
					.join(" ")
			);
			setWinner(
				opp
					.toLowerCase()
					.split(" ")
					.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
					.join(" ")
			);

			setOpen(true);
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
					{users.map((e) => (
						<div key={e} className="col-lg-6 col-md-12 col-sm-12 battleDiv">
							<button
								onMouseOver={() => {
									setStats(_.where(frame, { gymleader: e }));
									setOpp(
										e
											.toLowerCase()
											.split(" ")
											.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
											.join(" ")
									);
								}}
								onClick={handleBattle}
								className="battleBtn"
							>
								<h1 className="card-header text-center font-effect-anaglyph">
									{e
										.toLowerCase()
										.split(" ")
										.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
										.join(" ")}
								</h1>

								<div className="span2">
									<h2>Team:</h2>
									<div className="divInDiv2">
										{_.where(frame, { gymleader: e }).map((ele, i) => (
											<div key={i}>
												<img
													src={pokeball}
													alt=""
													style={{ width: "30px", height: "30px" }}
												/>
												<h3>{ele.name}</h3>
											</div>
										))}
									</div>
								</div>
							</button>
						</div>
					))}
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
										{userID()
											.match(/^(.+)@/)[1]
											.toLowerCase()
											.split(" ")
											.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
											.join(" ")}
										's Battle Level:
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
										{aftermath}
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
