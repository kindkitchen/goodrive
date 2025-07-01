import { NodeRuntime } from "@effect/platform-node"
import { Effect, Layer } from "effect"
import { GoogleAuthService } from "./google-auth/GoogleAuthService.ts"
import { Program } from "./Program.ts"

const AppLayer = Layer.mergeAll(
    Layer.succeed(GoogleAuthService, {
        gen_sign_in_url: Effect.succeed(
            "http://localhost:4000/after-google-signin"
        ),
        parse_cb_res_token: Effect.succeed(
            "TODO: declare type of parsing artifact, required in app" as const
        )
    })
)

NodeRuntime.runMain(Effect.provide(Program, AppLayer))
