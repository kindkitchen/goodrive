import { Config, Effect } from "effect";
import { google_drive_redirect_mock } from "./lib/google_drive_redirect_mock.ts";
import { google_signin_redirect_mock } from "./lib/google_signin_redirect_mock.ts";

export class LocalModeService
  extends Effect.Service<LocalModeService>()("LocalModeService", {
    effect: Effect.gen(function* () {
      const port = yield* Config.number("PORT").pipe(Config.withDefault(4000));
      return {
        port,
        google_signin_redirect_mock,
        google_drive_redirect_mock,
      };
    }),
  }) {}
