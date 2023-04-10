import React from "react";

import { useCreateUserMutation } from "@formation/data-access";

const App = () => {
	const [createUser] = useCreateUserMutation({
		refetchQueries: ["userList"],
	});

	const [username, setUsername] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	function handleSubmit(e) {
		e.preventDefault();

		createUser({
			variables: {
				username,
				email,
				password,
			},
		});

		setUsername("");
		setEmail("");
		setPassword("");
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
