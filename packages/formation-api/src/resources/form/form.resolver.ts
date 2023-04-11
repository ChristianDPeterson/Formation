import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { FormService } from "./form.service";
import { Form } from "./entities/form.entity";
import { CreateFormInput } from "./dto/create-form.input";
import { UpdateFormInput } from "./dto/update-form.input";
import { JwtAuthGuard } from "../../auth/jwt/jwt.guard";
import { UseGuards } from "@nestjs/common";
import { User } from "../user/user.model";
import { CurrentUser } from "../user/user.decorator";

@Resolver(() => Form)
export class FormResolver {
	constructor(private readonly formService: FormService) {}

	@Mutation(() => Form)
	@UseGuards(JwtAuthGuard)
	createForm(
		@Args("createFormInput") createFormInput: CreateFormInput,
		@CurrentUser() user: User
	) {
		return this.formService.create(createFormInput, user.id);
	}

	@Query(() => [Form])
	@UseGuards(JwtAuthGuard)
	getCurrentUserForms(@CurrentUser() user: User) {
		return this.formService.getAllFormsForUser(user.id);
	}

	@Query(() => Form)
	@UseGuards(JwtAuthGuard)
	getForm(@Args("id", { type: () => String }) id: string) {
		return this.formService.getForm(id);
	}

	@Mutation(() => Form)
	@UseGuards(JwtAuthGuard)
	updateForm(@Args("updateFormInput") updateFormInput: UpdateFormInput) {
		return this.formService.update(updateFormInput.id, updateFormInput);
	}

	@Mutation(() => Form)
	@UseGuards(JwtAuthGuard)
	removeForm(@Args("id", { type: () => String }) id: string) {
		return this.formService.remove(id);
	}
}
