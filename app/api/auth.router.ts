import { Elysia } from "elysia";
import {
    gen__sign_in_url,
    GOOGLE_EMAIL_SCOPE,
    GOOGLE_OPEN_ID_SCOPE,
    init__oauth2_client,
} from "@lib/google";

export const auth_router = new Elysia()
    .decorate(
        "gOauth",
        init__oauth2_client({
            client_id: "TODO",
            client_secret: "TODO",
            redirect_url: "TODO",
        }),
    )
    .get("/google-email", ({ redirect, gOauth }) => {
        const url = gen__sign_in_url(gOauth, {
            scope: [
                GOOGLE_EMAIL_SCOPE,
                GOOGLE_OPEN_ID_SCOPE,
            ],
            state: "TODO",
        });

        return redirect(url);
    });
