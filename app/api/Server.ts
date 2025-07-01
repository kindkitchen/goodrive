import { swagger } from "@elysiajs/swagger"
import { Elysia } from "elysia"
import { WebStandardAdapter } from "elysia/adapter/web-standard"
import { apollo_handler } from "./apollo_handler/mod_apollo_handler.ts"
import { version } from "./version.ts"
import { Effect } from "effect"
import { GoogleAuthService } from "./google-auth/GoogleAuthService.ts"

export const Server = Effect.gen(function* () {
    const { gen_sign_in_url } = yield* GoogleAuthService

    const elysia = new Elysia({
        adapter: WebStandardAdapter,
        experimental: true
    })
        .all(
            "/graphql",
            ({ request }) => apollo_handler(request, {}, {})
        )
        .get("/api/auth/google-signin", ({ redirect }) => {
            return redirect(Effect.runSync(gen_sign_in_url))
        })
        .get("/version", version)
        .get(
            "/",
            ({ redirect, request: { url } }) => {
                const { host, protocol } = new URL(url)

                return redirect(
                    `${protocol}//${host}/swagger`
                )
            }
        )
        .use(
            swagger({
                provider: "swagger-ui",
                documentation: {
                    externalDocs: {
                        url: "/graphql",
                        description: "Internal service API"
                    }
                },
                exclude: "/graphql"
            })
        )

    return elysia
})
