import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	ApolloLink,
	fromPromise,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({
	uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem("token");
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
			for (const err of graphQLErrors) {
				switch (err.extensions.code) {
					case "UNAUTHENTICATED":
						// ignore 401 error for a refresh request
						if (operation.operationName === "refreshToken") return;

						// use Observable to refresh to token and retry the request
						return fromPromise(
							refreshToken().catch((error) => {
								// Handle token refresh errors e.g clear stored tokens, redirect to login
								return;
							})
						)
							.filter((value) => Boolean(value))
							.flatMap((accessToken) => {
								const oldHeaders =
									operation.getContext().headers;
								// modify the operation context with a new token
								operation.setContext({
									headers: {
										...oldHeaders,
										authorization: `Bearer ${accessToken}`,
									},
								});

								// retry the request, returning the new observable
								return forward(operation);
							});
				}
			}
		}

		if (networkError) console.log(`[Network error]: ${networkError}`);
	}
);

// Request a refresh token to then stores and returns the accessToken.
export const refreshToken = async () => {
	try {
		// get the refresh token
		const refreshToken = localStorage.getItem("refresh_token");

		// use fetch to access the refresh token endpoint
		const refresh = await fetch(
			import.meta.env.VITE_AUTH_REFRESH_ENDPOINT,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${refreshToken}`,
				},
			}
		);

		// get the json response
		const { accessToken } = await refresh.json();
		localStorage.setItem("token", accessToken);

		return accessToken;
	} catch (err) {
		// localStorage.clear();
		console.log({ err });
		throw err;
	}
};

const client = new ApolloClient({
	link: ApolloLink.from([errorLink, authLink, httpLink]),
	cache: new InMemoryCache(),
	connectToDevTools: true,
});

export default client;
