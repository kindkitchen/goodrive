import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import typeDefs from "./codegen/out_schema.gql" with { type: "text" };
// @ts-types="@as-integrations/cloudflare-workers/src/index.ts"
import {
  startServerAndCreateCloudflareWorkersHandler,
} from "@as-integrations/cloudflare-workers";
import { Effect } from "effect";
import { GqlApiCtx } from "./codegen/GqlApiCtx.ts";

export const lib_goodrive_main_api = Effect.gen(function* () {
  const apollo = new ApolloServer<GqlApiCtx>({
    typeDefs,
    resolvers: {},
    introspection: true,
    plugins: [
      ApolloServerPluginLandingPageLocalDefault(),
    ],
  });
  const req_handler = startServerAndCreateCloudflareWorkersHandler(
    apollo,
    {
      context: async ({ request: _req, env: _env, ctx }) => {
        await Promise.resolve(
          "TODO: use this context integration in proper and effective way",
        );

        return ctx; /// suppose the caller will pass required context directly
      },
    },
  );

  return yield* Effect.succeed({ req_handler });
});
