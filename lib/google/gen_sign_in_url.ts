import type { OAuth2Client } from "google-auth-library";

export const gen_sign_in_url = (
  oauth2_client: OAuth2Client,
  params: {
    scope: string[];
    state: string;
    login_hint?: string;
    include_granted_scopes?: boolean;
    access_type?: "offline";
  },
) => {
  const uri = oauth2_client.generateAuthUrl({
    include_granted_scopes: true,
    prompt: "consent",
    ...params,
  });

  return uri;
};
