import { Config, Effect } from "effect";
import { google_signin_mock } from "./lib/google_signin_mock.ts";

export class LocalModeService
  extends Effect.Service<LocalModeService>()("LocalModeService", {
    effect: Effect.gen(function* () {
      const port = yield* Config.number("PORT").pipe(Config.withDefault(4000));
      return {
        port,
        google_mock_signin_redirect_pathname:
          google_signin_mock.redirect_pathname,
        google_mock_signin_redirect_handler:
          google_signin_mock.redirect_handler,
      };
    }),
  }) {}
