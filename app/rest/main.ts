import { Config, Data, Effect } from "effect";

class FailBootstrap
  extends Data.TaggedError("main::FailBootstrap")<{ message: string }> {}

await Effect.runPromise(Effect.gen(function* () {
  const mode = yield* Config.string("MODE").pipe(Config.withDefault("local"));

  if (mode === "local") {
    const port = yield* Config.number("PORT").pipe(
      Config.withDefault(4000),
    );
    const program = yield* Effect.tryPromise({
      try: () => import("./local_program.ts"),
      catch: () =>
        new FailBootstrap({ message: "Unable to import local implementation" }),
    }).pipe(Effect.flatMap(({ local_program }) => local_program));

    void Deno.serve({ port }, program.fetch);
  } else {
    yield* Effect.die(new FailBootstrap({ message: "Unsupported mode" }));
  }
}));
