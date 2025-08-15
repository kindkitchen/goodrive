import { App, staticFiles } from "fresh";
import { req_handler } from "./api/lib_goodrvie_main_api.ts";
import { define, type State } from "./utils.ts";

export const app = new App<State>();

app.use(staticFiles());

// this is the same as the /api/:name route defined via a file. feel free to delete this!
app.get("/api2/:name", (ctx) => {
  const name = ctx.params.name;
  return new Response(
    `Hello, ${name.charAt(0).toUpperCase() + name.slice(1)}!`,
  );
});
app.all("/graphql", (ctx) => {
  return req_handler(ctx.req, {}, {
    req: ctx.req,
    req_url: new URL(ctx.req.url),
  });
});

// this can also be defined via a file. feel free to delete this!
const exampleLoggerMiddleware = define.middleware((ctx) => {
  console.log(`${ctx.req.method} ${ctx.req.url}`);
  return ctx.next();
});
app.use(exampleLoggerMiddleware);

// Include file-system based routes here
app.fsRoutes();
