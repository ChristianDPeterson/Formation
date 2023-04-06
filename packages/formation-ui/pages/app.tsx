import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	gql,
} from "@apollo/client";
import React from "react";

import { SetForm, SetList } from "@formation/feature-sets";

const client = new ApolloClient({
	uri: "http://localhost:3000/graphql",
	cache: new InMemoryCache(),
});

const App = () => (
	<ApolloProvider client={client}>
		<h1>My Lego Sets</h1>
		<div className="flex">
			<SetForm />
			<SetList />
		</div>
	</ApolloProvider>
);

export default App;
