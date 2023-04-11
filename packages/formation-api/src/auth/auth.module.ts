import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local/local.strategy";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { UserModule } from "../resources/user/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { RefreshTokenStrategy } from "./refreshToken/refreshToken.strategy";
import { ConfigService } from "@nestjs/config";

@Module({
	imports: [
		UserModule,
		PassportModule,
		JwtModule.register({
			global: true,
			secret: process.env.JWT_ACCESS_SECRET,
			signOptions: { expiresIn: "60s" },
		}),
	],
	providers: [
		AuthService,
		ConfigService,
		LocalStrategy,
		JwtStrategy,
		RefreshTokenStrategy,
	],
	exports: [AuthService],
})
export class AuthModule {}
