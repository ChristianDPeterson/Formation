import { CreateFormInput } from "./create-form.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateFormInput extends PartialType(CreateFormInput) {
	@Field(() => String, { description: "ID of the form" })
	id: string;

	@Field(() => String, { description: "Name of the form" })
	name: string;
}
