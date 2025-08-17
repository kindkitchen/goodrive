import { Effect } from "effect";
import { App, staticFiles } from "fresh";
import { lib_goodrive_main_api } from "./api/lib_goodrvie_main_api.ts";
import { define, type State } from "./utils.ts";

const exampleLoggerMiddleware = define.middleware((ctx) => {
  console.log(`${ctx.req.method} ${ctx.req.url}`);
  return ctx.next();
});
const main = Effect.gen(function* () {
  const { req_handler } = yield* lib_goodrive_main_api;
  const fresh = new App<State>()
    .use(staticFiles()).get("/api2/:name", (ctx) => {
      const name = ctx.params.name;
      return new Response(
        `Hello, ${name.charAt(0).toUpperCase() + name.slice(1)}!`,
      );
    }).all("/graphql", (ctx) => {
      return req_handler(ctx.req, {}, {
        req: ctx.req,
        req_url: new URL(ctx.req.url),
      });
    }).use(exampleLoggerMiddleware)
    .fsRoutes();

  return fresh;
});

export const app = await Effect.runPromise(main);
