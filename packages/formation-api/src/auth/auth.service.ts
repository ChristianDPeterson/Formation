import {
	BadRequestException,
	ForbiddenException,
	Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";

import { User } from "@prisma/client";

import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
		private configService: ConfigService
	) {}

	async validateUser(username: string, pass: string): Promise<any> {
		const user = await this.userService.getUserByUsername(username);
		const isPasswordMatching = await bcrypt.compare(pass, user.password);
		return isPasswordMatching ? user : null;
	}

	async login(user: any) {
		const payload = { username: user.username, sub: user.id };

		return {
			access_token: this.jwtService.sign(payload),
		};
	}

	async signUp(createUserDto: CreateUserDto): Promise<any> {
		// const payload = { username: user.username, sub: user.id };

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
		console.log({ data });
		// Check if user exists
		const user = await this.userService.getUserByUsername(data.username);
		if (!user) throw new BadRequestException("User does not exist");

		const hashed = await this.hashData(data.password);
		console.log(data.password, user.password, hashed);

		const passwordMatches = await bcrypt.compare(
			data.password,
			user.password
		);
		if (!passwordMatches)
			throw new BadRequestException("Password is incorrect");

		const tokens = await this.getTokens(user.id, user.username);
		await this.updateRefreshToken(user.id, tokens.refreshToken);
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
					expiresIn: "15m",
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
			user.refresh_token,
			refreshToken
		);
		if (!refreshTokenMatches) throw new ForbiddenException("Access Denied");

		const tokens = await this.getTokens(user.id, user.username);
		await this.updateRefreshToken(user.id, tokens.refreshToken);
		return tokens;
	}
}
