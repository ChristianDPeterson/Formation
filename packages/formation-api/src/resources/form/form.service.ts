import { Injectable } from "@nestjs/common";
import { CreateFormInput } from "./dto/create-form.input";
import { UpdateFormInput } from "./dto/update-form.input";
import { PrismaService } from "../../../prisma/prisma.service";
import { User } from "../user/user.model";

@Injectable()
export class FormService {
	constructor(private prisma: PrismaService) {}

	create(createFormInput: CreateFormInput, userId: string) {
		return this.prisma.form.create({
			data: {
				...createFormInput,
				userId,
			},
		});
	}

	// getAllForms() {
	// 	return this.prisma.form.findMany();
	// }

	getForm(id: string) {
		return this.prisma.form.findUnique({
			where: {
				id,
			},
		});
	}

	getAllFormsForUser(userId: string) {
		return this.prisma.form.findMany({
			where: {
				userId,
			},
		});
	}

	update(id: string, updateFormInput: UpdateFormInput) {
		return this.prisma.form.update({
			where: {
				id: id,
			},
			data: {
				...updateFormInput,
			},
		});
	}

	remove(id: string) {
		return this.prisma.form.delete({
			where: {
				id: id,
			},
		});
	}
}
