import React, { useState, useEffect, useRef } from "react";
import { useEasybase } from "easybase-react";
import "./Chatroom.css";
import { Link } from "react-router-dom";

function Chatroom() {
	const { db, useReturn, userID } = useEasybase();
	const { frame } = useReturn(() => db("CHATROOM").return(), []);
	const [message, setMessage] = useState("");
	const [nameToDelete, setNameToDelete] = useState("");

	function createMessage(e) {
		if (e.key === "Enter" && message.length !== 0) {
			db("CHATROOM", true)
				.insert({
					username: userID().match(/^(.+)@/)[1],
					message: message,
				})
				.one();
			setMessage("");
		}
	}
	const messageEl = useRef(null);
	const handleDelete = async (e) => {
		await db("CHATROOM", true).delete().where({ message: nameToDelete }).one();
	};

	useEffect(() => {
		if (messageEl) {
			messageEl.current.addEventListener("DOMNodeInserted", (event) => {
				const { currentTarget: target } = event;
				target.scroll({ top: target.scrollHeight, behavior: "smooth" });
			});
		}
	}, []);

	return (
		<div id="ChatWindow__container">
			<div className="chatroomLinks">
				<Link className="backtoBattle" to={`/battle`}>
					{"<"}Battle
				</Link>
				<Link className="backtoBattle" to={"/PokemonTeam"}>
					{"<"}Team
				</Link>
				<Link className="backtoBattle" to="/Dashboard">
					{"<"}PokemonList
				</Link>
			</div>
			<h1 className="text-center font-effect-fire-animation">
				Trash Talk Room
			</h1>
			<div id="ChatWindow__messagesParentContainer">
				<div id="ChatWindow__messagesChildContainer" ref={messageEl}>
					{frame.map((message, i) => (
						<div key={i} className="msgDiv">
							<h3 className="messageH2">
								{message.username
									.toLowerCase()
									.split(" ")
									.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
									.join(" ")}
								:&nbsp;
							</h3>
							<h3>{message.message}</h3>
							<button
								className="messageDeleteBtn"
								onMouseOver={() => {
									setNameToDelete(message.message);
								}}
								onClick={(e) => {
									handleDelete(e.target.value);
								}}
							>
								Delete
							</button>
						</div>
					))}
				</div>
			</div>
			<div id="ChatWindow__newMessageContainer">
				<input
					placeholder="Say somethin...no apostrophes"
					onKeyPress={createMessage}
					onChange={(e) => {
						setMessage(e.target.value);
					}}
					value={message}
				/>
			</div>
		</div>
	);
}

export default Chatroom;
