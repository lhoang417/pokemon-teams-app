import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
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

	const clearInputs = async () => {
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
				<Form onSubmit={handleSubmit}>
					<Form.Group className="inputForForm" size="lg" controlId="Trainer">
						<Form.Label>Trainer Name</Form.Label>
						<Form.Control
							autoFocus
							type="text"
							value={trainer}
							onChange={(e) => setTrainer(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="inputForForm2" size="lg" controlId="password">
						<Form.Label style={{ paddingTop: ".5em" }}>
							Password
							<h5 className="pwDesc">
								Must Contain 8 Characters, One Uppercase, One Lowercase, One
								Number and one special case Character
							</h5>
						</Form.Label>

						<Form.Control
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>
					<div
						className="logButtonDiv"
						style={{ display: "flex", margin: ".2rem" }}
					>
						<Button
							onClick={handleSignUpPress}
							className="logInBtn"
							// block="true"
							size="lg"
							type="submit"
							disabled={!validateForm()}
						>
							Signup
						</Button>
						<Button
							onClick={handleLogInPress}
							className="logInBtn"
							// block="true"
							size="lg"
							type="submit"
							disabled={!validateForm()}
						>
							Login
						</Button>
					</div>
					<h1 className="successH1">
						{success}
						{loggedInUser}
					</h1>
				</Form>
			</div>
		</div>
	);
}

export default Account;
