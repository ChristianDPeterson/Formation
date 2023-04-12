import {
	useGetCurrentUserFormsQuery,
	useGetCurrentUserQuery,
} from "@formation/data-access";
import FormInput from "../components/FormInput/FormInput";
import { useAuth } from "../app/auth";
import { Dashboard } from "../components/Dashboard";

function HomePage() {
	const auth = useAuth();
	const currentUserQuery = useGetCurrentUserQuery();
	const currentUserFormsQuery = useGetCurrentUserFormsQuery({});

	console.log({ auth });

	if (currentUserQuery.loading || currentUserFormsQuery.loading)
		return <p>Loading...</p>;
	if (currentUserQuery.error || currentUserFormsQuery.error)
		return <p>Error :(</p>;

	const currentUser = currentUserQuery.data?.getCurrentUser;
	const currentUserForms =
		currentUserFormsQuery.data?.getCurrentUserForms || [];

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
			<FormInput />
			<Dashboard forms={currentUserForms} />
		</>
	);
}

export default HomePage;
