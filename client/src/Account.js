import React, { useState } from "react";
// import { Form, Button } from "react-bootstrap";
import { useEasybase } from "easybase-react";

function Account() {
	const [trainer, setTrainer] = useState("");
	const [password, setPassword] = useState("");
	const [success, setSuccess] = useState("");
	const [loggedInUser, setLoggedInUser] = useState("");

	function validateForm() {
		return (
			trainer.length > 0 &&
			password.match(
				/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
			)
		);
	}

	function handleSubmit(event) {
		event.preventDefault();
	}

	const { signIn, signUp } = useEasybase();

	const clearInputs = () => {
		setTrainer("");
		setPassword("");
	};

	const handleLogInPress = async () => {
		await signIn(trainer, password);

		clearInputs();
	};

	const handleSignUpPress = async () => {
		await signUp(trainer, password, {
			created_at: new Date().toString,
			username: trainer,
		});
		// if (res.success) {
		// 	await signIn(email, password);
		// }
		setLoggedInUser(trainer);

		clearInputs();
		setSuccess(`Sign up sucessful, please sign in with New Trainer Name:`);
	};

	return (
		<div className="loginDiv">
			<div className="welcome">
				<h1>
					Welcome to <span>P</span>okemon <span>T</span>eams
				</h1>
			</div>
			<div className="Login">
				<form onSubmit={handleSubmit}>
					<div className="inputForForm" size="lg" controlId="Trainer">
						<label>Trainer Name</label>
						<input
							// autoFocus
							type="text"
							// value={trainer}
							onChange={(e) => setTrainer(e.target.value)}
						/>
					</div>
					<div className="inputForForm2" size="lg" controlId="password">
						<label style={{ paddingTop: ".5em" }}>
							Password
							<h5 className="pwDesc">
								Must Contain 8 Characters, One Uppercase, One Lowercase, One
								Number and one special case Character
							</h5>
						</label>

						<input
							type="password"
							// value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div
						className="logButtonDiv"
						style={{ display: "flex", margin: ".2rem" }}
					>
						<button
							onClick={handleSignUpPress}
							className="logInBtn"
							// block="true"
							size="lg"
							type="submit"
							disabled={!validateForm()}
						>
							Signup
						</button>
						<button
							onClick={handleLogInPress}
							className="logInBtn"
							// block="true"
							size="lg"
							type="submit"
							disabled={!validateForm()}
						>
							Login
						</button>
					</div>
					<h1 className="successH1">
						{success}
						{loggedInUser}
					</h1>
				</form>
			</div>
		</div>
	);
}

export default Account;
