import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "./user.model";
import { UserService } from "./user.service";
import { GqlAuthGuard } from "../auth/gql-auth.guard";
import { UseGuards } from "@nestjs/common";
import { CurrentUser } from "./user.decorator";

@Resolver(() => User)
export class UserResolver {
	constructor(private userService: UserService) {}

	@Query(() => User)
	@UseGuards(GqlAuthGuard)
	async getUserById(
		@Args("id", { type: () => String }) id: string
	): Promise<User> {
		return this.userService.getUserById(id);
	}

	@Query(() => [User])
	@UseGuards(GqlAuthGuard)
	async getAllUsers(): Promise<User[]> {
		return this.userService.getAllUsers();
	}

	@Query(() => User)
	@UseGuards(GqlAuthGuard)
	async getCurrentUser(@CurrentUser() user: User): Promise<User> {
		return this.userService.getUserById(user.id);
	}
}
