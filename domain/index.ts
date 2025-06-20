import { Effect } from "effect";
export * from "./__gql__/types.ts";

const graphql = String.raw;

export const typeDefs = Effect
  .tryPromise(() => Deno.readTextFile("./schema.gql"))
  .pipe(Effect.match({
    onSuccess: (t) => t,
    onFailure: (err) => {
      console.warn("Failed to read domain schema.gql");
      console.error(err);

      return graphql`
        type Query {
          hello: String!
        }
    `;
    },
  }));
