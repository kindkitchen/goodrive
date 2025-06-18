import { Schema as S } from "effect";

export const EnvSchema = S.Struct({
  GOOGLE_CLIENT_ID: S.String,
  GOOGLE_CLIENT_SECRET: S.String,
});

export const config = {
  TODO: "todo",
} as const;
