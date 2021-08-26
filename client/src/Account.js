import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useEasybase } from "easybase-react";

function Account() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [success, setSuccess] = useState("");

	function validateForm() {
		return (
			email.match(
				/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
			) &&
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
		setEmail("");
		setPassword("");
	};

	const handleLogInPress = async () => {
		await signIn(email, password);
		clearInputs();
	};

	const handleSignUpPress = async () => {
		await signUp(email, password, {
			created_at: new Date().toString,
		});
		// if (res.success) {
		// 	await signIn(email, password);
		// }
		clearInputs();
		setSuccess("Sign up sucessful, please sign in to access the App");
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
					<Form.Group size="lg" controlId="email">
						<Form.Label>Email</Form.Label>
						<Form.Control
							autoFocus
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>
					<Form.Group size="lg" controlId="password">
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
					<div style={{ display: "flex", margin: ".2rem" }}>
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
					<h1 className="successH1">{success}</h1>
				</Form>
			</div>
		</div>
	);
}

export default Account;
