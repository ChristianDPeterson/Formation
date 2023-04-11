import React from "react";

import {
	useGetCurrentUserFormsQuery,
	useGetCurrentUserQuery,
} from "@formation/data-access";
import FormInput from "../components/FormInput";

const App = () => {
	const currentUserQuery = useGetCurrentUserQuery();
	const currentUserFormsQuery = useGetCurrentUserFormsQuery({});

	if (currentUserQuery.loading || currentUserFormsQuery.loading)
		return <p>Loading...</p>;
	if (currentUserQuery.error || currentUserFormsQuery.error)
		return <p>Error :(</p>;

	const currentUser = currentUserQuery.data.getCurrentUser;
	const currentUserForms = currentUserFormsQuery.data.getCurrentUserForms;

	return (
		<>
			<div>
				{currentUser && (
					<div>
						{currentUser.id} -{" "}
						<strong>{currentUser.username}</strong> -{" "}
						{currentUser.email}
					</div>
				)}
			</div>

			<ul>
				{currentUserForms &&
					currentUserForms.map((form) => (
						<li key={form.id}>
							{form.id} - <strong>{form.name}</strong> -{" "}
							{form.userId} - {form.createdAt} - {form.updatedAt}
						</li>
					))}
			</ul>
			<FormInput />
		</>
	);
};

export default App;
