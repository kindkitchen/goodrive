import { Elysia } from "elysia";

const html = String.raw;
const redirect_pathname =
  "/__local_mode__/google-signin-redirect-mock" as const;
const method = "GET";
const action = "/api/auth/google-callback";
const page = html`
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    </head>
    <body class="py-20 flex items-start justify-center min-h-screen bg-gray-200">
      <div
        class="bg-white p-6 rounded shadow flex flex-col"
      >
        <form
          method="${method}"
          action="${action}"
        >
          <input
            class="border border-gray-300 p-2 rounded w-full"
            type="text"
            placeholder="email"
          />
        </form>
      </div>
    </body>
  </html>
`;
const redirect_handler = new Elysia().get(
  redirect_pathname,
  () => {
    return new Response(page, {
      headers: {
        "content-type": "text/html",
      },
    });
  },
);

export const google_signin_redirect_mock = {
  redirect_pathname,
  redirect_handler,
};
