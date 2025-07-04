import { NodeRuntime } from "@effect/platform-node"
import { Effect, Layer } from "effect"
import { ConfigServiceLive } from "./config.ts"
import { GoogleAuthServiceLive } from "./google-auth/GoogleAuthService.live.ts"
import { Program } from "./Program.ts"

ConfigServiceLive

const AppLayer = Layer.mergeAll(
    GoogleAuthServiceLive.pipe(
        Layer.provide(ConfigServiceLive)
    )
)

NodeRuntime.runMain(Effect.provide(Program, AppLayer))
