import { OAuth2Client } from "google-auth-library";

export const init__oauth2_client = ({
  client_id,
  secret,
  redirect_url,
}: {
  client_id: string;
  secret: string;
  redirect_url: string;
}) => {
  const google_oauth2_client = new OAuth2Client({
    clientId: client_id,
    clientSecret: secret,
    redirectUri: redirect_url,
  });

  return google_oauth2_client;
};
