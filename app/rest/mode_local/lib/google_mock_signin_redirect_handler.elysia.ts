import { Elysia } from "elysia";
import { google_mock_signin_redirect_Page } from "./google_mock_signin_redirect_Page.ts";
import { google_mock_signin_redirect_pathname } from "./google_mock_signin_redirect_pathname.const.ts";

export const google_mock_signin_redirect_handler = new Elysia().get(
  google_mock_signin_redirect_pathname,
  ({ query }) => {
    return new Response(google_mock_signin_redirect_Page, {
      headers: {
        "content-type": "text/html",
      },
    });
  },
);
