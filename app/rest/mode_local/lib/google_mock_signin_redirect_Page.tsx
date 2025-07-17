const html = String.raw;

export const google_mock_signin_redirect_Page = html`
  <form method="POST" action="/api/auth/google-callback">
    <input type="text" placeholder="email" />
  </form>
`;
