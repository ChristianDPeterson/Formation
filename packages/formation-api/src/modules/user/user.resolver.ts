import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { User } from "./user.model";
import { UserService } from "./user.service";

@Resolver(() => User)
export class UserResolver {
	constructor(private userService: UserService) {}

	@Query(() => User)
	async getUserById(
		@Args("id", { type: () => Int }) id: number
	): Promise<User> {
		return this.userService.getUserById(id);
	}

	@Query(() => [User])
	async getAllUsers(): Promise<User[]> {
		return this.userService.getAllUsers();
	}
}
