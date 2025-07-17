import { Effect } from "effect";
import { Elysia } from "elysia";
import { POST_api_auth_google_signIn } from "./api/POST_api_auth_google_signIn.ts";

export const server = Effect.gen(function* () {
  const post_api_google_signIn = yield* POST_api_auth_google_signIn;
  const elysia = new Elysia()
    .get("/api/auth/google-signin", ({ redirect }) => {
      const url = post_api_google_signIn.redirect_uri;
      return redirect(url);
    })
    .post("/api/auth/google-callback", ({ redirect }) => {
      return redirect("http://localhost:4000#TODO");
    });

  return elysia;
});
