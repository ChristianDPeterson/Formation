import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../app/auth";

function LoginPage() {
	const navigate = useNavigate();
	const auth = useAuth();

	console.log(auth);

	if (auth.user) {
		// If they're already logged in, send them to the home page.
		return <Navigate to="/home" replace />;
	}

	// const from = location.state?.from?.pathname || "/";

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const username = formData.get("username") as string;
		const password = formData.get("password") as string;

		auth.signin(username, password, () => {
			// Send them back to the page they tried to visit when they were
			// redirected to the login page. Use { replace: true } so we don't create
			// another entry in the history stack for the login page.  This means that
			// when they get to the protected page and click the back button, they
			// won't end up back on the login page, which is also really nice for the
			// user experience.
			navigate("/home");
		});
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>
					Username: <input name="username" type="text" />
				</label>{" "}
				<label>
					Password: <input name="password" type="password" />
				</label>{" "}
				<button type="submit">Login</button>
			</form>
		</div>
	);
}

export default LoginPage;
