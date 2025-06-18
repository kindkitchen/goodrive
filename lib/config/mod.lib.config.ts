import { load } from "@std/dotenv";
import { Effect, Schema as S } from "effect";

export const EnvSchema = S.Struct({
  GOOGLE_CLIENT_ID: S.String,
  GOOGLE_CLIENT_SECRET: S.String,
  API_HOST: S.String,
});

export const init__config = Effect.gen(function* () {
  const raw = yield* Effect.tryPromise(() => load());
  const config = yield* S.decodeUnknown(EnvSchema)(raw);

  return {
    GOOGLE: {
      client_id: config.GOOGLE_CLIENT_ID,
      secret: config.GOOGLE_CLIENT_SECRET,
    },
    API_HOST: config.API_HOST,
  };
}).pipe(Effect.orDie);
