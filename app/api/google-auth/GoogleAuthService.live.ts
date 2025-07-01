import { load } from "@std/dotenv"
import { Data, Effect, Layer } from "effect"
import { OAuth2Client } from "google-auth-library"
import { GOOGLE_EMAIL_SCOPE } from "../const.ts"
import { GoogleAuthService } from "./GoogleAuthService.ts"

export const GoogleAuthServiceLive = Layer.effect(
    GoogleAuthService,
    Effect.gen(function* () {
        const config = yield* Effect.tryPromise(
            async () => {
                await load({ export: true })
                const GOOGLE_CLIENT_ID = Deno.env.get(
                    "GOOGLE_CLIENT_ID"
                )

                if (!GOOGLE_CLIENT_ID) {
                    class MissingGoogleClientId
                        extends Data.TaggedError(
                            "google client id is missing"
                        ) {}
                    throw new MissingGoogleClientId()
                }
                const GOOGLE_CLIENT_SECRET = Deno.env.get(
                    "GOOGLE_CLIENT_SECRET"
                )

                if (!GOOGLE_CLIENT_SECRET) {
                    class MissingGoogleClientSecret
                        extends Data.TaggedError(
                            "google client secret is missing"
                        ) {}
                    throw new MissingGoogleClientSecret()
                }

                return {
                    GOOGLE_CLIENT_ID,
                    GOOGLE_CLIENT_SECRET
                }
            }
        )
        const oauth2 = yield* Effect.succeed(
            new OAuth2Client({
                clientId: config.GOOGLE_CLIENT_ID,
                clientSecret: config.GOOGLE_CLIENT_SECRET,
                redirectUri:
                    "http://localhost:4000/api/auth/google-callback"
            })
        )

        return {
            parse_cb_res_token: Effect.succeed(
                "TODO: declare type of parsing artifact, required in app" as const
            ),
            gen_sign_in_url: Effect.gen(function* () {
                const params = yield* Effect.succeed({
                    include_granted_scopes: true,
                    prompt: "consent",
                    scope: [GOOGLE_EMAIL_SCOPE],
                    access_type: "offline",
                    state: "TODO",
                    login_hint: undefined as unknown as (
                        | never
                        | string
                    )
                })

                return oauth2.generateAuthUrl(params)
            })
        }
    })
)
