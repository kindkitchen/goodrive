import { load } from "@std/dotenv"
import { Data, Effect, Layer, Schema } from "effect"
import { introduce_ConfigService } from "./introduce_ConfigService.ts"

class FailLoadDotenv
    extends Data.TaggedError("@lib/config::FailLoadDotenv")<
        {
            err: unknown
        }
    > {
}

class FailToValidateDotenv extends Data.TaggedError(
    "@lib/config::FailValidateDotenv"
)<{ err: unknown }> {}

export function implement_ConfigService_fromDotenvWithValidation<
    T,
    SchemaIn = unknown,
    SchemaRequirements = unknown
>(
    contract: ReturnType<typeof introduce_ConfigService<T>>,
    schema: Schema.Schema<
        T,
        SchemaIn,
        SchemaRequirements
    >,
    envPath?: string
) {
    return Layer.effect(
        contract,
        Effect.gen(function* () {
            const raw_dotenv = yield* Effect.tryPromise({
                try: async () => {
                    const config = await load(
                        envPath ? { envPath } : void null
                    )
                    return config
                },
                catch: (err) => new FailLoadDotenv({ err })
            })
            const dotenv_validated_and_parsed =
                yield* Schema.decodeUnknown(
                    schema
                )(raw_dotenv).pipe(
                    Effect.mapError((err) =>
                        new FailToValidateDotenv({ err })
                    )
                )

            return dotenv_validated_and_parsed
        })
    )
}
