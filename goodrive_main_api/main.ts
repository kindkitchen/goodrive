import { GqlApiCtx } from "./core/codegen/GqlApiCtx.ts";
import { req_handler } from "./core/lib_goodrvie_main_api.ts";

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
