import { useState } from "react"
import { FormBuilder } from "./features/FormBuilder/FormBuilder.tsx"
import { Container } from "@chakra-ui/react"
import { Navbar } from "./components/Navbar/index.ts"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import { trpc } from "./utils/trpc"

export function App() {
	const [queryClient] = useState(() => new QueryClient())
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: "http://localhost:3000/trpc",

					// You can pass any HTTP headers you wish here
					async headers() {
						return {
							authorization: "secret",
						}
					},
				}),
			],
		}),
	)

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<Navbar />
				<Container>
					<FormBuilder />
					<div></div>
				</Container>
			</QueryClientProvider>
		</trpc.Provider>
	)
}

export default App
