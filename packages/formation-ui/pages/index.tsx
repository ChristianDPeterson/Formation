import React from "react";

import { useGetCurrentUserQuery } from "@formation/data-access";

const App = () => {
	const { loading, error, data } = useGetCurrentUserQuery();

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

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
