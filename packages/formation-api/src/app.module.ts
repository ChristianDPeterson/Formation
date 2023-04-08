import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GraphQLBackendModule } from "./graphql/graphql.module";

@Module({
	imports: [
		// ConfigModule.forRoot({
		// 	load: [redisConfig],
		// 	cache: true,
		// }),
		GraphQLBackendModule,
		// RedisClientModule,
		// PubSubModule,
		// LoggerModule,
	],
	controllers: [], // AppController
	providers: [AppService],
})
export class AppModule {}
