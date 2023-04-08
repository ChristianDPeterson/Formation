import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User as UserClient } from "@prisma/client";

@ObjectType()
export class User implements UserClient {
	@Field(() => Int)
	id: number;

	@Field(() => String)
	username: string;

	@Field(() => String)
	email: string;
}
