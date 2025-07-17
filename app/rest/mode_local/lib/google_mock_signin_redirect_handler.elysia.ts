import { Elysia } from "elysia";
import { google_mock_signin_redirect_Page } from "./google_mock_signin_redirect_Page.tsx";
import { google_mock_signin_redirect_pathname } from "./google_mock_signin_redirect_pathname.const.ts";

export const google_mock_signin_redirect_handler = new Elysia().get(
  google_mock_signin_redirect_pathname,
  () => {
    return google_mock_signin_redirect_Page;
  },
);
