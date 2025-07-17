import { Data, Effect, Schema } from "effect";

class UnexpectedGoogleCallbackQs
  extends Data.TaggedError("UnexpectedGoogleCallbackQs")<{
    actual: unknown;
  }> {}

const Negative = Schema.Struct({
  error: Schema.String,
});
const Positive = Schema.Struct({
  code: Schema.String,
  state: Schema.String,
});
const validate = (actual: unknown) =>
  Schema.decodeUnknown(Positive)(actual).pipe(
    Effect.mapError(() => Schema.decodeUnknown(Negative)(actual)),
    Effect.mapError(() => new UnexpectedGoogleCallbackQs({ actual })),
  );
export const CallbackQsSchema = {
  Negative,
  Positive,
  validate,
};
