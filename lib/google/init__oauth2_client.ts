import { OAuth2Client } from "google-auth-library";

export const init__oauth2_client = ({
  client_id,
  client_secret,
  redirect_url,
}: {
  client_id: string;
  client_secret: string;
  redirect_url: string;
}) => {
  const google_oauth2_client = new OAuth2Client({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: redirect_url,
  });

  return google_oauth2_client;
};
