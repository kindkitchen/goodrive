import { Config, Effect } from "effect";
import { Elysia } from "elysia";

const html = String.raw;
const GoogleMockSignInRedirectPage = html`
  <form method="POST" action="/api/auth/google-callback">
    <input type="text" placeholder="email" />
  </form>
`;

export class LocalModeService
  extends Effect.Service<LocalModeService>()("LocalModeService", {
    effect: Effect.gen(function* () {
      const port = yield* Config.number("PORT").pipe(Config.withDefault(4000));
      const google_mock_signin_redirect_pathname =
        "/__local_mode__/google-signin-redirect-mock";
      return {
        port,
        google_mock_signin_redirect_pathname,
        google_mock_signin_redirect_handler: new Elysia().get(
          google_mock_signin_redirect_pathname,
          () => {
            return new Response(GoogleMockSignInRedirectPage, {
              headers: { "content-type": "text/html" },
            });
          },
        ),
      };
    }),
  }) {}
