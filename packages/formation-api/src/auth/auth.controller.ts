import { Controller, Get, Post, UseGuards, Body, Req } from "@nestjs/common";
import { Request } from "express";

import { LocalAuthGuard } from "./local-auth.guard";
import { AuthService } from "./auth.service";
import { GqlAuthGuard } from "./gql-auth.guard";
import { RefreshTokenGuard } from "./refreshToken.guard";
import { AuthDto } from "./dto/auth.dto";
import { CreateUserDto } from "../user/dto/create-user.dto";

@Controller()
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("auth/signup")
	signup(@Body() createUserDto: CreateUserDto) {
		return this.authService.signUp(createUserDto);
	}

	@Post("auth/signin")
	signin(@Body() data: AuthDto) {
		return this.authService.signIn(data);
	}

	@UseGuards(GqlAuthGuard)
	@Get("auth/logout")
	logout(@Req() req: Request) {
		this.authService.logout(req.user["sub"]);
	}

	@UseGuards(RefreshTokenGuard)
	@Get("auth/refresh")
	refreshTokens(@Req() req: Request) {
		const userId = req.user["sub"];
		const refreshToken = req.user["refreshToken"];
		return this.authService.refreshTokens(userId, refreshToken);
	}
}
