/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app/app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const globalPrefix = "api";
	app.setGlobalPrefix(globalPrefix);
	const port = process.env.PORT || 3000;

	// Todo: Add cors configuration
	app.enableCors({
		origin: true,
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
		credentials: true,
	});
	await app.listen(port);
	Logger.log(
		`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
	);
}

bootstrap();
