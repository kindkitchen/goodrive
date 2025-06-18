import {
    gen__sign_in_url,
    GOOGLE_EMAIL_SCOPE,
    GOOGLE_GDRIVE_SCOPES,
    GOOGLE_OPEN_ID_SCOPE,
    init__oauth2_client,
} from "@lib/google";
import { Elysia } from "elysia";
import { plugin_config } from "./plugin_config.ts";

export const router_auth = new Elysia()
    .use(plugin_config)
    .derive((
        {
            store: {
                config: { API_HOST, GOOGLE: { client_id, secret } },
            },
        },
    ) => ({
        gOauth: init__oauth2_client({
            client_id,
            secret,
            redirect_url: `${API_HOST}/api/auth/google-callback`,
        }),
    }))
    .get("/google-email", ({ redirect, gOauth }) => {
        const url = gen__sign_in_url(gOauth, {
            scope: [
                GOOGLE_EMAIL_SCOPE,
                GOOGLE_OPEN_ID_SCOPE,
            ],
            state: "TODO",
        });

        return redirect(url);
    })
    .get("/google-drive", ({ redirect, gOauth }) => {
        const url = gen__sign_in_url(gOauth, {
            scope: GOOGLE_GDRIVE_SCOPES,
            state: "TODO",
            access_type: "offline",
            include_granted_scopes: true,
        });

        return redirect(url);
    });
