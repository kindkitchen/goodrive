import { Effect } from "effect";
import { GqlApiCtx } from "./core/codegen/GqlApiCtx.ts";
import { lib_goodrive_main_api } from "./core/lib_goodrvie_main_api.ts";

const main = Effect.gen(function* () {
  const { req_handler } = yield* lib_goodrive_main_api;

  Deno.serve({
    port: +(Deno.env.get("PORT") || 3333),
  }, (req) => {
    const req_url = new URL(req.url);

    if (req_url.pathname === "/graphql") {
      return req_handler(
        req,
        {},
        {
          req,
          req_url,
        } satisfies GqlApiCtx,
      );
    }

    return new Response("Not found", { status: 404 });
  });
});

await Effect.runPromise(main);
