import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import Head from "next/head";
import "./styles.css";

function CustomApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Welcome to formation-ui!</title>
			</Head>
			<main className="app">
				<ApolloProvider client={client}>
					<Component {...pageProps} />
				</ApolloProvider>
			</main>
		</>
	);
}

export default CustomApp;
