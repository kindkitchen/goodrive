import { Effect } from "effect";
import { Api_auth_google_callback } from "../api/Api_auth_google_callback.ts";
import { Api_auth_google_signIn } from "../api/Api_auth_google_signIn.ts";
import { server } from "../server.ts";
import { LocalModeService } from "./Service.ts";
import { Api_auth_google_drive } from "../api/Api_auth_google_drive.ts";

export const local_mode_program = Effect.gen(function* () {
  const {
    port,
    google_mock_signin_redirect_handler,
    google_mock_signin_redirect_pathname,
  } = yield* LocalModeService;
  const elysia = yield* server.pipe(
    Effect.provideService(Api_auth_google_signIn, {
      redirect_uri:
        `http://localhost:${port}${google_mock_signin_redirect_pathname}`,
    }),
    Effect.provideService(Api_auth_google_callback, {
      handle: async (qs) => {
        await Promise.resolve();
        try {
          const email = JSON.parse(qs.code).email;
          console.log(email);
        } catch {
          console.warn(
            "fail to validate qs in google-callback - use default email for local mode",
          );
          console.log("TODO");
        }
        return { redirect_uri: `http://localhost:${port}` };
      },
    }),
    Effect.provideService(Api_auth_google_drive, {
      redirect_uri: `http://localhost:${port}`,
    }),
  );

  elysia.use(google_mock_signin_redirect_handler);

  return {
    elysia,
    port,
  };
}).pipe(Effect.provide(LocalModeService.Default));
