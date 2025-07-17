import { Context } from "effect";

export class Api_auth_google_callback extends Context.Tag(
  "Api_auth_google_callback",
)<Api_auth_google_callback, {
  handle: (qs: Record<string, string>) => Promise<{ redirect_uri: string }>;
}>() {}
