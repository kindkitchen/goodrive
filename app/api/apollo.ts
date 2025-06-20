import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
// @ts-types="@as-integrations/cloudflare-workers/src/index.ts"
import { startServerAndCreateCloudflareWorkersHandler } from "@as-integrations/cloudflare-workers";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";

const typeDefs = ``;

const apollo = new ApolloServer({
    schema: addMocksToSchema({
        schema: makeExecutableSchema({ typeDefs }),
    }),

    introspection: true,
    plugins: [
        ApolloServerPluginLandingPageLocalDefault(),
    ],
});
