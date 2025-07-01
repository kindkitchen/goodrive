import { swagger } from "@elysiajs/swagger"
import { Elysia } from "elysia"
import { WebStandardAdapter } from "elysia/adapter/web-standard"
import { apollo_handler } from "./apollo_handler/mod_apollo_handler.ts"
import { version } from "./version.ts"

export const server = new Elysia({
    adapter: WebStandardAdapter,
    experimental: true
})
    .all(
        "/graphql",
        ({ request }) => apollo_handler(request, {}, {})
    )
    .get("/version", version)
    .get(
        "/",
        ({ redirect, request: { url } }) => {
            const { host, protocol } = new URL(url)

            return redirect(`${protocol}//${host}/swagger`)
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
