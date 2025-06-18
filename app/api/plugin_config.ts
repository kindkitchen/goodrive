import { init__config } from "@lib/config";
import { Effect } from "effect";
import { Elysia } from "elysia";

/// TODO: rm this check
let singleton = "maybe";

export const plugin_config = new Elysia({
    name: "config",
})
    .derive({ as: "scoped" }, async () => {
        singleton = singleton === "maybe"
            ? "yes"
            : singleton === "yes"
            ? "no"
            : "yes";

        if (singleton === "no") {
            throw new Error("plugin_config not a singleton");
        }
        return { config: await Effect.runPromise(init__config) };
    });
