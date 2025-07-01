import { Effect } from "effect"
import { server } from "./server.ts"

export const program = Effect.promise(async () => {
    const info = Deno.serve({ port: 4000 }, server.fetch)

    return await Promise.resolve(info)
})
