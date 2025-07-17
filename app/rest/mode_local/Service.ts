import { Config, Effect } from "effect";
import { google_mock_signin_redirect_pathname } from "./lib/google_mock_signin_redirect_pathname.const.ts";
import { google_mock_signin_redirect_handler } from "./lib/google_mock_signin_redirect_handler.elysia.ts";

export class LocalModeService
  extends Effect.Service<LocalModeService>()("LocalModeService", {
    effect: Effect.gen(function* () {
      const port = yield* Config.number("PORT").pipe(Config.withDefault(4000));
      return {
        port,
        google_mock_signin_redirect_pathname,
        google_mock_signin_redirect_handler,
      };
    }),
  }) {}
