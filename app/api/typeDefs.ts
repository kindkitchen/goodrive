import { join } from "@std/path"
import { Data, Effect } from "effect"
export * from "./__gql__/types.ts"

export const typeDefs = Effect
    .fn("generate typeDefs")(function* () {
        return yield* Effect.tryPromise({
            try: () =>
                Deno.readTextFile(
                    join(Deno.cwd(), "schema.gql")
                ),
            catch: (err) => {
                class FailTypeDefs extends Data.TaggedError(
                    "fail to generate typeDefs"
                )<{
                    origin_error: string
                }> {}

                return new FailTypeDefs({
                    origin_error: String(err)
                })
            }
        })
    })
