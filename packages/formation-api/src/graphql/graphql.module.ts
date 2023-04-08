import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
// import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";

import { GraphQLHelper } from "./graphql.helper";
import { GraphQLResolver } from "./graphql.resolver";
import { UserModule } from "../modules/user/user.module";

@Module({
	imports: [
		// ConfigModule,
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			installSubscriptionHandlers: true,
			fieldResolverEnhancers: ["filters"],
			cache: "bounded",
			autoSchemaFile: true,
			// cors: {
			// 	credentials: true,
			// 	origin: true,
			// },
			// formatError: (error: ApolloError) => {
			// 	return {
			// 		message: GraphQLHelper.getMessage(error),
			// 		statusCode: GraphQLHelper.getStatusCode(error),
			// 	};
			// },
			context: ({ req, res, connection, payload, request, reply }) => {
				return {
					req,
					res,
					connection,
					payload,
					request,
					reply,
				};
			},
			subscriptions: {
				"subscriptions-transport-ws": {
					onConnect: (connectionParams: Record<string, unknown>) => {
						return {
							isSubscription: true,
							...connectionParams,
						};
					},
				},
			},
		}),
		// modules
		UserModule,
	],
	providers: [GraphQLResolver],
})
export class GraphQLBackendModule {}
