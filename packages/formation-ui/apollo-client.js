import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	ApolloLink,
	fromPromise,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

import { TokenService } from "./services/token.service";

const httpLink = createHttpLink({
	uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = TokenService.getLocalAccessToken();
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const errorLink = onError(
	({ graphQLErrors, networkError, operation, forward }) => {
		if (graphQLErrors) {
			for (let err of graphQLErrors) {
				switch (err.extensions.code) {
					case "UNAUTHENTICATED":
						// ignore 401 error for a refresh request
						if (operation.operationName === "refreshToken") return;

						// use Observable to refresh to token and retry the request
						return fromPromise(
							refreshToken()
								.catch(
									(error) => {
										// Handle token refresh errors e.g clear stored tokens, redirect to login, ...
										return;
									}
									// retry the request, returning the new observable
								)
								.then(() => {
									return forward(operation);
								})
						);
				}
			}
		}

		if (networkError) console.log(`[Network error]: ${networkError}`);
	}
);

// Request a refresh token to then stores and returns the accessToken.
const refreshToken = async () => {
	try {
		// use fetch to access the refresh token endpoint
		const refresh = await fetch("http://localhost:3000/refresh_token", {
			method: "POST",
			credentials: "include",
		});

		console.log({ refresh });
		// get the json response
		const { accessToken } = await refresh.json();

		TokenService.updateLocalAccessToken(accessToken);
		return accessToken;
	} catch (err) {
		localStorage.clear();
		throw err;
	}
};

const client = new ApolloClient({
	link: ApolloLink.from([errorLink, authLink, httpLink]),
	uri: "http://localhost:3000/graphql",
	cache: new InMemoryCache(),
	connectToDevTools: true,
});

export default client;
