import { Context } from "effect";

export class Api_auth_google_drive
  extends Context.Tag("Api_auth_google_drive")<Api_auth_google_drive, {
    redirect_uri: string;
  }>() {}
