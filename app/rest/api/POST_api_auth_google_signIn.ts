import { Context } from "effect";
export class POST_api_auth_google_signIn
  extends Context.Tag("POST_api_auth_google_signIn")<
    POST_api_auth_google_signIn,
    {
      redirect_uri: string;
    }
  >() {}
