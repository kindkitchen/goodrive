import type { OAuth2Client } from "google-auth-library";
import { SECOND } from "@std/datetime";

export const parse__token_from_db_res = async (
  token: string,
  oauth2_client: OAuth2Client,
) => {
  const payload = await oauth2_client.getToken(token);

  if (!payload.tokens.access_token) {
    throw new Error(
      `Unable to process data from google <token>`,
    );
  }

  const info = await oauth2_client.getTokenInfo(
    payload.tokens.access_token,
  );

  if (info.expiry_date - Date.now() < 60 * SECOND * 2) {
    throw new Error(
      "The remained time of google access token live is too small",
    );
  }

  return {
    payload,
    info,
  };
};
