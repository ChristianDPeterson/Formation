import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreateFormInput {
	@Field(() => String, { description: "Name of the form" })
	name: string;
}
