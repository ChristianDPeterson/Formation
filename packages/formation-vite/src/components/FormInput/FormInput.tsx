import { CreateFormInput, useCreateFormMutation } from "@formation/data-access";
import { useState } from "react";

const FormInput = () => {
	const [createForm] = useCreateFormMutation({
		refetchQueries: ["getCurrentUserForms"],
	});

	const [name, setName] = useState<string>("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const createFormInput: CreateFormInput = {
			name: name,
		};

		createForm({ variables: { createFormInput } });
		setName("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				<span>Form Name</span>
				<input
					type="text"
					name="name"
					required
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</label>
			<button type="submit">Create Form</button>
		</form>
	);
};

export default FormInput;
