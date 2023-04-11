import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class Form {
	@Field(() => String, { description: "ID of the form" })
	id: string;

	@Field(() => String, { description: "Name of the form" })
	name: string;

	@Field(() => Date, { description: "Date the form was created" })
	createdAt: Date;

	@Field(() => Date, { description: "Date the form was last updated" })
	updatedAt: Date;

	@Field(() => String, { description: "Owner of the form" })
	userId: string;
}
