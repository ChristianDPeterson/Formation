import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo-client";

import App from "./app/app";
import { AuthProvider } from "./app/auth";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<StrictMode>
		<AuthProvider>
			<ApolloProvider client={client}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ApolloProvider>
		</AuthProvider>
	</StrictMode>
);
