import { Elysia } from "elysia";
import { node } from "@elysiajs/node";
import { swagger } from "@elysiajs/swagger";

const app = new Elysia({
    adapter: node(),
})
    .use(swagger())
    .get("/", () => "Hello Elysia");

Deno.serve({
    port: 4000,
}, app.fetch);
