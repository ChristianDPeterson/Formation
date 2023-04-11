import {
	BadRequestException,
	ForbiddenException,
	Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";

import { UserService } from "../resources/user/user.service";
import { CreateUserDto } from "../resources/user/dto/create-user.dto";
import { AuthDto } from "./dto/auth.dto";
import { User } from "@prisma/client";

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
		private configService: ConfigService
	) {}

	async validate(username: string, password: string): Promise<User> {
		const user = await this.userService.getUserByUsername(username);
		if (!user) throw new BadRequestException("User does not exist");

		const passwordMatches = await bcrypt.compare(password, user.password);
		if (!passwordMatches)
			throw new BadRequestException("Password is incorrect");

		return user;
	}

	async signUp(createUserDto: CreateUserDto): Promise<any> {
		// Check if user exists
		const userExists = await this.userService.getUserByUsername(
			createUserDto.username
		);
		if (userExists) {
			throw new BadRequestException("User already exists");
		}

		// Hash password
		const hash = await this.hashData(createUserDto.password);
		const newUser = await this.userService.createUser(
			createUserDto.username,
			createUserDto.email,
			hash
		);
		const tokens = await this.getTokens(newUser.id, newUser.username);
		await this.updateRefreshToken(newUser.id, tokens.refreshToken);
		return tokens;
	}

	async signIn(data: AuthDto) {
		const existingUser = await this.validate(data.username, data.password);

		if (!existingUser) {
			throw new ForbiddenException("Invalid credentials");
		}

		const tokens = await this.getTokens(
			existingUser.id,
			existingUser.username
		);
		await this.updateRefreshToken(existingUser.id, tokens.refreshToken);
		return tokens;
	}

	async logout(userId: string) {
		return this.userService.update(userId, { refresh_token: null });
	}

	async hashData(data: string) {
		return await bcrypt.hash(data, 10);
	}

	async updateRefreshToken(userId: string, refreshToken: string) {
		const hashedRefreshToken = await this.hashData(refreshToken);
		await this.userService.update(userId, {
			refresh_token: hashedRefreshToken,
		});
	}

	async getTokens(userId: string, username: string) {
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(
				{
					sub: userId,
					username,
				},
				{
					secret: this.configService.get<string>("JWT_ACCESS_SECRET"),
					expiresIn: "60s",
				}
			),
			this.jwtService.signAsync(
				{
					sub: userId,
					username,
				},
				{
					secret: this.configService.get<string>(
						"JWT_REFRESH_SECRET"
					),
					expiresIn: "7d",
				}
			),
		]);

		return {
			accessToken,
			refreshToken,
		};
	}

	async refreshTokens(userId: string, refreshToken: string) {
		const user = await this.userService.getUserById(userId);
		if (!user || !user.refresh_token)
			throw new ForbiddenException("Access Denied");

		const refreshTokenMatches = await bcrypt.compare(
			refreshToken,
			user.refresh_token
		);
		if (!refreshTokenMatches) throw new ForbiddenException("Access Denied");

		const tokens = await this.getTokens(user.id, user.username);
		await this.updateRefreshToken(user.id, tokens.refreshToken);
		return tokens;
	}
}
