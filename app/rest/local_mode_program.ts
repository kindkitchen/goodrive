import { Effect } from "effect";
import { POST_api_auth_google_signIn } from "./api/POST_api_auth_google_signIn.ts";
import { LocalModeService } from "./LocalModeService.ts";
import { server } from "./server.ts";

export const local_mode_program = Effect.gen(function* () {
  const {
    port,
    google_mock_signin_redirect_handler,
    google_mock_signin_redirect_pathname,
  } = yield* LocalModeService;
  const elysia = yield* server.pipe(
    Effect.provideService(POST_api_auth_google_signIn, {
      redirect_uri:
        `http://localhost:${port}${google_mock_signin_redirect_pathname}`,
    }),
  );

  elysia.use(google_mock_signin_redirect_handler);

  return {
    elysia,
    port,
  };
}).pipe(Effect.provide(LocalModeService.Default));
