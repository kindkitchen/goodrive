import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { WebStandardAdapter } from "elysia/adapter/web-standard";

const app = new Elysia({
    adapter: WebStandardAdapter,
    experimental: true,
})
    .use(swagger())
    .get("/ws", (c) => {
        const { socket, response } = Deno.upgradeWebSocket(c.request);

        socket.onopen = () => {
            socket.send("Deno is awesome!");
        };

        return response;
    })
    .get("/", () => "Hello Elysia");

Deno.serve({ port: 4000 }, app.fetch);
