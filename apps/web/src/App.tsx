import { FormBuilder } from "./features/FormBuilder/FormBuilder.tsx"
import { Container } from "@chakra-ui/react"
import { Navbar } from "./components/Navbar/index.ts"

export function App() {
	return (
		<>
			<Navbar />
			<Container>
				<FormBuilder />
			</Container>
		</>
	)
}
