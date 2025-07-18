import { Effect } from "effect";
import { Elysia } from "elysia";
import { Api_auth_google_callback } from "./api/Api_auth_google_callback.ts";
import { Api_auth_google_signIn } from "./api/Api_auth_google_signIn.ts";
import { Api_auth_google_drive } from "./api/Api_auth_google_drive.ts";

export const server = Effect.gen(function* () {
  const api_auth_google_signIn = yield* Api_auth_google_signIn;
  const api_auth_google_callback = yield* Api_auth_google_callback;
  const api_auth_google_drive = yield* Api_auth_google_drive;
  const elysia = new Elysia()
    .get("/api/auth/google-signin", ({ redirect }) => {
      const url = api_auth_google_signIn.redirect_uri;
      return redirect(url);
    })
    .get("/api/auth/google-drive", ({ redirect }) => {
      const url = api_auth_google_drive.redirect_uri;

      return redirect(url);
    })
    .get("/api/auth/google-callback", async ({ redirect, query }) => {
      const { redirect_uri } = await api_auth_google_callback.handle(query);
      return redirect(redirect_uri);
    });

  return elysia;
});
