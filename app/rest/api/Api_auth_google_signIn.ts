import { Context } from "effect";
export class Api_auth_google_signIn
  extends Context.Tag("Api_auth_google_signIn")<
    Api_auth_google_signIn,
    {
      redirect_uri: string;
    }
  >() {}
