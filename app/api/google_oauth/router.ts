import {
    gen_sign_in_url,
    GOOGLE_EMAIL_SCOPE,
    GOOGLE_GDRIVE_SCOPES,
    GOOGLE_OPEN_ID_SCOPE,
    init_oauth2_client,
} from "@lib/google";
import { Schema as S } from "effect";
import { Elysia } from "elysia";
import { plugin_config } from "../plugin_config.ts";

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
    });

const schema_success__query__google_callback = S.Struct({
    code: S.String,
    state: S.String,
});
const schema_fail__query__google_callback = S.Struct({ error: S.String });
const is_success__query__google_callback = S.is(
    schema_success__query__google_callback,
);
const is_fail__query__google_callback = S.is(
    schema_fail__query__google_callback,
);
_router_auth
    .get("/google-callback", ({ redirect, gOauth, query }) => {
        if (is_success__query__google_callback(query)) {
            console.log("ok:", query);
        } else if (is_fail__query__google_callback(query)) {
            console.log("fail:", query.error);
        } else {
            console.log("fatality:", query);
        }

        return "TODO";
    });

export const router_google_oauth = _router_auth;
