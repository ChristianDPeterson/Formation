import React from "react";

import {
	useUserListQuery,
	useCreateUserMutation,
	useGetCurrentUserQuery,
} from "@formation/data-access";

const App = () => {
	const { loading, error, data } = useGetCurrentUserQuery();

	const [createUser] = useCreateUserMutation({
		refetchQueries: ["userList"],
	});

	const [username, setUsername] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

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
	}

	return (
		<ul>
			{data?.getCurrentUser && (
				<li key={data.getCurrentUser.id}>
					{data.getCurrentUser.id} -{" "}
					<strong>{data.getCurrentUser.username}</strong> -{" "}
					{data.getCurrentUser.email}
				</li>
			)}
		</ul>
	);
};

export default App;
