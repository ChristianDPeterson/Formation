import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";

import { GraphQLResolver } from "./graphql.resolver";
import { UserModule } from "../resources/user/user.module";
import { FormModule } from "../resources/form/form.module";

@Module({
	imports: [
		// ConfigModule,
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			installSubscriptionHandlers: true,
			fieldResolverEnhancers: ["filters"],
			cache: "bounded",
			autoSchemaFile: join(
				process.cwd(),
				"packages/formation-api/src/schema.graphql"
			),
			sortSchema: true,
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
			// context: ({ req, res, connection, payload, request, reply }) => {
			// 	return {
			// 		req,
			// 		res,
			// 		connection,
			// 		payload,
			// 		request,
			// 		reply,
			// 	};
			// },
			// subscriptions: {
			// 	"subscriptions-transport-ws": {
			// 		onConnect: (connectionParams: Record<string, unknown>) => {
			// 			return {
			// 				isSubscription: true,
			// 				...connectionParams,
			// 			};
			// 		},
			// 	},
			// },
		}),
		// modules
		UserModule,
		FormModule,
	],
	providers: [GraphQLResolver],
})
export class GraphQLBackendModule {}
