import { NodeRuntime } from "@effect/platform-node"
import { Effect, Layer } from "effect"
import { GoogleAuthServiceLive } from "./google-auth/GoogleAuthService.live.ts"
import { Program } from "./Program.ts"

const AppLayer = Layer.mergeAll(GoogleAuthServiceLive)

NodeRuntime.runMain(Effect.provide(Program, AppLayer))
