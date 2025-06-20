import { typeDefs } from "@/domain";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
// @ts-types="@as-integrations/cloudflare-workers/src/index.ts"
import { startServerAndCreateCloudflareWorkersHandler } from "@as-integrations/cloudflare-workers";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { Effect } from "effect";

const apollo = new ApolloServer({
    schema: addMocksToSchema({
        schema: makeExecutableSchema({
            typeDefs: await Effect.runPromise(typeDefs),
        }),
    }),

    introspection: true,
    plugins: [
        ApolloServerPluginLandingPageLocalDefault(),
    ],
});

export const apollo_handler = startServerAndCreateCloudflareWorkersHandler(
    apollo,
    {
        context: async ({ env, request, ctx }) => {
            return {};
        },
    },
);
