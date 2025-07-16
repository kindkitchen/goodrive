import { Effect } from "effect";
import { Elysia } from "elysia";

export const local_program = Effect.gen(function* () {
  yield* Effect.succeed("TODO");

  const server = new Elysia();

  return server;
});
