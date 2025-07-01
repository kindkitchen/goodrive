import { Context, Effect } from "effect"

export class GoogleAuthService extends Context.Tag(
    "GoogleAuthService"
)<GoogleAuthService, {
    gen_sign_in_url: Effect.Effect<string>,
    parse_cb_res_token: Effect.Effect<
        "TODO: declare type of parsing artifact, required in app"
    >
}>() {}
