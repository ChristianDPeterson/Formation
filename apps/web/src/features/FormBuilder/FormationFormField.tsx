import {
	Button,
	FormControl as ChakraFormControl,
	FormLabel as ChakraFormLabel,
	Select as ChakraSelect,
} from "@chakra-ui/react"
import { FieldHookConfig, Formik, FormikHelpers, FormikProps, useField } from "formik"
import {
	Input as ChakraInput,
	InputProps as ChakraInputProps,
	SelectProps as ChakraSelectProps,
} from "@chakra-ui/react"
import { FormElementType } from "./FormElement"

type FormFieldProps = {
	formElement: FormElementType
	onSubmit: (formElement: FormElementType) => void
}

export function FormationFormField({ formElement, onSubmit }: FormFieldProps) {
	return (
		<Formik
			initialValues={{
				id: formElement?.id,
				fieldType: formElement?.fieldType ?? "text",
				fieldName: formElement?.fieldName,
				initialValue: formElement?.initialValue,
				fieldLabel: formElement?.fieldLabel,
			}}
			onSubmit={(values: FormElementType, { setSubmitting }: FormikHelpers<FormElementType>) => {
				console.log({ values })
				onSubmit(values)
				setSubmitting(false)
			}}
		>
			{(props: FormikProps<FormElementType>) => (
				<form onSubmit={props.handleSubmit}>
					<ChakraFormControl>
						<ChakraFormLabel>Field type</ChakraFormLabel>
						<Select id='fieldType' name='fieldType'>
							<option value='text'>Text</option>
							<option value='email'>Email</option>
						</Select>
						{/* <FormErrorMessage> */}
						{/*   {form.errors.fieldName} */}
						{/* </FormErrorMessage> */}
					</ChakraFormControl>
					<ChakraFormControl>
						<ChakraFormLabel>Field Name</ChakraFormLabel>
						<Input name='fieldName' />
					</ChakraFormControl>
					<ChakraFormControl>
						<ChakraFormLabel>Initial Value</ChakraFormLabel>

						<Input name='initialValue' />
					</ChakraFormControl>
					<ChakraFormControl>
						<ChakraFormLabel>Field Label</ChakraFormLabel>

						<Input name='fieldLabel' />
					</ChakraFormControl>
					<Button mt={4} colorScheme='teal' isLoading={props.isSubmitting} type='submit'>
						Save
					</Button>
				</form>
			)}
		</Formik>
	)
}

type InputProps = ChakraInputProps & FieldHookConfig<"input">

const Input = ({ name, ...props }: InputProps) => {
	const [field] = useField(name)
	return <ChakraInput {...props} {...field} />
}

type SelectProps = ChakraSelectProps & FieldHookConfig<"select">

const Select = ({ name, ...props }: SelectProps) => {
	const [field] = useField(name)
	return (
		<ChakraSelect {...props} {...field}>
			{props.children}
		</ChakraSelect>
	)
}
