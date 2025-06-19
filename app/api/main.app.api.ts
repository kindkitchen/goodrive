import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { WebStandardAdapter } from "elysia/adapter/web-standard";
import { router__google_oauth } from "./google-oauth/router__google_oauth.ts";

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
    .use(new Elysia({ prefix: "/api/auth" }).use(router__google_oauth))
    .get("/", () => "Hello Elysia");

Deno.serve({ port: 4000 }, app.fetch);
