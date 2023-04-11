import { useState } from "react";
import Router from "next/router";
import TokenService from "../services/token.service";
// import Layout from "../components/layout";
// import Form from "../components/form";

const Login = () => {
	const [errorMsg, setErrorMsg] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();

		if (errorMsg) setErrorMsg("");

		const body = {
			username: e.currentTarget.username.value,
			password: e.currentTarget.password.value,
		};

		try {
			const response = await fetch(
				process.env.NEXT_PUBLIC_AUTH_SIGNIN_ENDPOINT,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(body),
				}
			);

			// // Extract the JWT from the response
			const { accessToken, refreshToken } = await response.json();

			// // Store the token in cookie
			TokenService.updateLocalAccessToken(accessToken);
			TokenService.updateLocalRefreshToken(refreshToken);
			// //...
			// // Do something the token in the login method
			// await login({ jwt_token });

			Router.push("/");
		} catch (error) {
			console.error("An unexpected error happened occurred:", error);
			setErrorMsg(error.message);
		}
	}

	return (
		<div className="login">
			<form onSubmit={handleSubmit}>
				<label>
					<span>Username</span>
					<input type="text" name="username" required />
				</label>
				<label>
					<span>Password</span>
					<input type="password" name="password" required />
				</label>
				{/* {!isLogin && (
      <label>
        <span>Repeat password</span>
        <input type="password" name="rpassword" required />
      </label>
    )} */}

				<div className="submit">
					<button type="submit">Login</button>
					{/* {isLogin ? (
        <>
          <Link href="/signup" legacyBehavior>
            <a>I don't have an account</a>
          </Link>
          
        </>
      ) : (
        <>
          <Link href="/login" legacyBehavior>
            <a>I already have an account</a>
          </Link>
          <button type="submit">Signup</button>
        </>
      )} */}
				</div>
				{errorMsg && <p className="error">{errorMsg}</p>}
			</form>
		</div>
	);
};

export default Login;
