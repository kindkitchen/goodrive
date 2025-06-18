import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { WebStandardAdapter } from "elysia/adapter/web-standard";
import { router_auth } from "./router.auth.ts";

let wsConnections = 0;

const app = new Elysia({
    adapter: WebStandardAdapter,
    experimental: true,
})
    .use(swagger())
    .get("/ws", (c) => {
        const { socket, response } = Deno.upgradeWebSocket(c.request);

        socket.onopen = () => {
            ++wsConnections;
            socket.send("Deno is awesome!");
            if (wsConnections > 100) {
                socket.close();
            }
        };
        socket.onclose = () => {
            wsConnections > 0 && --wsConnections;
        };

        return response;
    })
    .use(new Elysia({ prefix: "/api/auth" }).use(router_auth))
    .get("/", () => "Hello Elysia");

Deno.serve({ port: 4000 }, app.fetch);
