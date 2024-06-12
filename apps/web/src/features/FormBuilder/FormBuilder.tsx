import { ReactElement, useState } from "react"
import { Box, Button, Card, Stack } from "@chakra-ui/react"
import { FormElementType, FormElement } from "./FormElement"

import { trpc } from "../../utils/trpc"

export function FormBuilder() {
	const [formElements, setFormElements] = useState<FormElementType[]>([])

	const handleSubmit = (newField: FormElementType) => {
		setFormElements([...formElements, newField])
	}

	const hello = trpc.hello.useQuery()

	return (
		<Stack spacing={4}>
			{formElements &&
				formElements.map((formElement, index): ReactElement => {
					return (
						<Box key={formElement.id}>
							<Card p={4}>
								<FormElement
									formElement={formElement}
									onChange={(updatedFormElement: FormElementType) => {
										const newFormElements = formElements.slice(0)
										newFormElements[index] = updatedFormElement
										setFormElements(newFormElements)
									}}
								></FormElement>
							</Card>
						</Box>
					)
				})}
			<Button
				mt={4}
				colorScheme='teal'
				onClick={() => {
					console.log("add field")
					handleSubmit({
						id: crypto.randomUUID(),
						fieldName: "",
						fieldType: "text",
						fieldLabel: "",
						initialValue: "",
					})
				}}
			>
				Add a {hello.data?.message}
			</Button>
		</Stack>
	)
}
