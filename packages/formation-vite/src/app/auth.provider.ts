import { refreshToken } from "../apollo-client";

/**
 * This represents some generic auth provider API, like Firebase.
 */
const authProvider = {
	isAuthenticated: false,
	async signin(username: string, password: string, callback: VoidFunction) {
		const response = await fetch(
			import.meta.env.VITE_AUTH_SIGNIN_ENDPOINT,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: username,
					password: password,
				}),
			}
		);

		if (response.status !== 201) {
			throw new Error("Failed to login");
		}

		// Extract the JWT from the response
		const { accessToken, refreshToken } = await response.json();

		// Store the token in cookie
		localStorage.setItem("token", accessToken);
		localStorage.setItem("refresh_token", refreshToken);

		authProvider.isAuthenticated = true;

		callback();
	},
	async signout(callback: VoidFunction) {
		const accessToken = localStorage.getItem("token");

		let response = await fetch(import.meta.env.VITE_AUTH_LOGOUT_ENDPOINT, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${accessToken}`,
			},
		});

		// Refresh token if it's expired
		if (response.status === 401) {
			const accessToken = await refreshToken();

			response = await fetch(import.meta.env.VITE_AUTH_LOGOUT_ENDPOINT, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${accessToken}`,
				},
			});
		}

		// If successful, clear the token
		if (response.status !== 200) {
			throw new Error("Failed to logout");
		}

		localStorage.clear();
		authProvider.isAuthenticated = false;
		callback();
	},
};

export { authProvider as fakeAuthProvider };
