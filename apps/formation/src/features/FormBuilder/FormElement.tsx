import { useState } from "react"
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react"
import { FormationFormField } from "./FormationFormField"

export type FormElementType = {
	id: string
	fieldName: string
	fieldType: string
	fieldLabel: string
	initialValue: string
}
export function FormElement({ formElement, onChange }) {
	const [editMode, setEditMode] = useState(true)

	if (editMode) {
		return (
			<FormationFormField
				formElement={formElement}
				onSubmit={updatedField => {
					onChange(updatedField)
					setEditMode(false)
				}}
			/>
		)
	} else {
		return (
			<FormControl>
				<FormLabel>{formElement.fieldLabel}</FormLabel>
				<Input
					readOnly
					type={formElement.fieldType}
					placeholder={formElement.initialValue}
				/>
				<Button
					mt={4}
					colorScheme='teal'
					onClick={() => {
						setEditMode(true)
					}}
				>
					Edit
				</Button>
			</FormControl>
		)
	}
}
