import React from "react";

import { useUserListQuery } from "@formation/data-access";

const App = () => {
	const { loading, error, data } = useUserListQuery();

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<ul>
			{data.getAllUsers.map(({ id, username }) => (
				<li key={id}>
					{id} - <strong>{username}</strong>
				</li>
			))}
		</ul>
	);
};

export default App;
