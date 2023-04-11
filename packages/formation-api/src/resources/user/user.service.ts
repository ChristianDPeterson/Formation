import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "../../../prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async getAllUsers(): Promise<User[]> {
		return this.prisma.user.findMany();
	}

	async getUserById(id: string): Promise<User> {
		return this.prisma.user.findUnique({
			where: {
				id,
			},
		});
	}

	async getUserByUsername(username: string): Promise<User> {
		return this.prisma.user.findUnique({
			where: {
				username,
			},
		});
	}

	async getUserByEmail(email: string): Promise<User> {
		return this.prisma.user.findUnique({
			where: {
				email,
			},
		});
	}

	async createUser(
		username: string,
		email: string,
		password: string
	): Promise<User> {
		// check if username or email already exists
		const userExists = await this.prisma.user.findFirst({
			where: {
				OR: [{ username }, { email }],
			},
		});
		if (userExists) throw new Error("User already exists");

		return this.prisma.user.create({
			data: {
				username,
				email,
				password,
			},
		});
	}

	async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
		return this.prisma.user.update({
			where: {
				id,
			},
			data: updateUserDto,
		});
	}
}
