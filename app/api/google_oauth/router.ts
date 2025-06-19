import {
    gen_sign_in_url,
    GOOGLE_EMAIL_SCOPE,
    GOOGLE_GDRIVE_SCOPES,
    GOOGLE_OPEN_ID_SCOPE,
    init_oauth2_client,
} from "@lib/google";
import { Match } from "effect";
import { Elysia } from "elysia";
import { plugin_config } from "../plugin_config.ts";
import { google_callback_handler } from "./google_callback_handler.ts";

const _router_auth = new Elysia()
    .use(plugin_config)
    .derive((
        {
            store: {
                config: { API_HOST, GOOGLE: { client_id, secret } },
            },
        },
    ) => ({
        gOauth: init_oauth2_client({
            client_id,
            secret,
            redirect_url: `${API_HOST}/api/auth/google-callback`,
        }),
    }))
    .get("/google-email", ({ redirect, gOauth }) => {
        const url = gen_sign_in_url(gOauth, {
            scope: [
                GOOGLE_EMAIL_SCOPE,
                GOOGLE_OPEN_ID_SCOPE,
            ],
            state: "TODO",
        });

        return redirect(url);
    })
    .get("/google-drive", ({ redirect, gOauth }) => {
        const url = gen_sign_in_url(gOauth, {
            scope: GOOGLE_GDRIVE_SCOPES,
            state: "TODO",
            access_type: "offline",
            include_granted_scopes: true,
        });

        return redirect(url);
    })
    .get(
        "/google-callback",
        async (
            { redirect, gOauth, query, store: { config: { API_HOST } } },
        ) => {
            const result = await google_callback_handler({
                query,
                gOauth,
            });

            return Match.type<typeof result>().pipe(
                Match.tag(
                    "/google_callback_handler/Success",
                    (_res) => redirect(API_HOST),
                ),
                Match.tag(
                    "/google_callback_handler/FailError",
                    (_error) => redirect(API_HOST),
                ),
                Match.tag(
                    "/google_callback_handler/FailPanic",
                    (_panic) => redirect(API_HOST),
                ),
                Match.tag(
                    "/google_callback_handler/FailMismatchState",
                    (_mismatch_state) => redirect(API_HOST),
                ),
                Match.tag(
                    "/google_callback_handler/FailParseCode",
                    (_parsing_fail) => redirect(API_HOST),
                ),
                Match.exhaustive,
            )(result);
        },
    );

export const router_google_oauth = _router_auth;
