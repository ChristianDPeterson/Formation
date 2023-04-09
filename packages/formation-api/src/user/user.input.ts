import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UserInput {
	@Field(() => String, {
		nullable: false,
		description: "User's name that will be visible",
	})
	username: string;

	@Field(() => String, {
		nullable: false,
		description: "Email that will be visible",
	})
	email: string;

	@Field(() => String, {
		nullable: false,
		description: "Password that will be visible",
	})
	password: string;
}
