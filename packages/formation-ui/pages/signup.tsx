import React from "react";

import TokenService from "../services/token.service";
import Router from "next/router";

const App = () => {
	const [username, setUsername] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	async function handleSubmit(e) {
		e.preventDefault();

		const response = await fetch(
			process.env.NEXT_PUBLIC_AUTH_SIGNUP_ENDPOINT,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, email, password }),
			}
		);

		// // Extract the JWT from the response
		const { accessToken, refreshToken } = await response.json();

		// // Store the token in cookie
		TokenService.updateLocalAccessToken(accessToken);
		TokenService.updateLocalRefreshToken(refreshToken);

		Router.push("/");
	}

	return (
		<ul>
			<form onSubmit={handleSubmit}>
				<label htmlFor="username">Username</label>
				<input
					type="text"
					value={username}
					onChange={(event) => setUsername(event.target.value)}
				/>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
				/>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				/>
				<button type="submit">Submit</button>
			</form>
		</ul>
	);
};

export default App;
