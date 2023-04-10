import { Controller, Get, Request, Post, UseGuards } from "@nestjs/common";

import { AppService } from "./app.service";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { AuthService } from "./auth/auth.service";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getData() {
		return this.appService.getData();
	}
}
