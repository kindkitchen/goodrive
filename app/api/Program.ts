import { Effect } from "effect"
import { Server } from "./Server.ts"

export const Program = Effect.gen(function* () {
    const server = yield* Server

    Deno.serve({ port: 4000 }, server.fetch)
})
