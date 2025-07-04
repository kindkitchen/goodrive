import { Effect, Layer } from "effect"
import { OAuth2Client } from "google-auth-library"
import { ConfigService } from "../config.ts"
import { GOOGLE_EMAIL_SCOPE } from "../const.ts"
import { GoogleAuthService } from "./GoogleAuthService.ts"

export const GoogleAuthServiceLive = Layer.effect(
    GoogleAuthService,
    Effect.gen(function* () {
        const { googleOauth2 } = yield* ConfigService
        const oauth2 = yield* Effect.succeed(
            new OAuth2Client(googleOauth2)
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
