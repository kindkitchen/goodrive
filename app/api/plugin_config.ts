import { init__config } from "@lib/config";
import { Effect } from "effect";
import { Elysia } from "elysia";

const config = await Effect.runPromise(init__config);

export const plugin_config = new Elysia({
    name: "config",
})
    .state("config", config);
