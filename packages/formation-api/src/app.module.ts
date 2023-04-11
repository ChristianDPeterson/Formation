import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GraphQLBackendModule } from "./graphql/graphql.module";
import { AuthModule } from "./auth/auth.module";
import { AuthController } from "./auth/auth.controller";
import { FormModule } from "./resources/form/form.module";

@Module({
	imports: [GraphQLBackendModule, AuthModule, FormModule],
	controllers: [AppController, AuthController],
	providers: [AppService],
})
export class AppModule {}
