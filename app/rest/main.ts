import { Config, Data, Effect } from "effect";

class FailBootstrap
  extends Data.TaggedError("main::FailBootstrap")<{ message: string }> {}

await Effect.runPromise(Effect.gen(function* () {
  const mode = yield* Config.string("MODE").pipe(Config.withDefault("local"));

  if (mode === "local") {
    const { elysia, port } = yield* Effect.tryPromise({
      try: () => import("./local_mode_program.ts"),
      catch: () =>
        new FailBootstrap({ message: "Unable to import local implementation" }),
    }).pipe(Effect.flatMap(({ local_mode_program: p }) => p));

    void Deno.serve({ port }, elysia.fetch);
  } else {
    yield* Effect.die(new FailBootstrap({ message: "Unsupported mode" }));
  }
}));
