import React from "react";

import {
	useUserListQuery,
	useCreateUserMutation,
} from "@formation/data-access";

const App = () => {
	const { loading, error, data } = useUserListQuery();

	const [createUser] = useCreateUserMutation({
		refetchQueries: ["userList"],
	});

	const [username, setUsername] = React.useState("");
	const [email, setEmail] = React.useState("");

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	function handleSubmit(e) {
		e.preventDefault();

		createUser({
			variables: {
				username,
				email,
			},
		});

		setUsername("");
		setEmail("");
	}

	return (
		<ul>
			{data.getAllUsers.map(({ id, username, email }) => (
				<li key={id}>
					{id} - <strong>{username}</strong> - {email}
				</li>
			))}
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
				<button type="submit">Submit</button>
			</form>
		</ul>
	);
};

export default App;
