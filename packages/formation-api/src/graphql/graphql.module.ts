import { ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
// import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";

import { GraphQLHelper } from "./graphql.helper";
import { GraphQLResolver } from "./graphql.resolver";
import { UserModule } from "../modules/user/user.module";

@Module({
	imports: [
		// ConfigModule,
		GraphQLModule.forRoot<ApolloDriverConfig>(
			GraphQLHelper.getApolloDriverConfig()
		),
		// modules
		UserModule,
	],
	providers: [GraphQLResolver],
})
export class GraphQLBackendModule {}
