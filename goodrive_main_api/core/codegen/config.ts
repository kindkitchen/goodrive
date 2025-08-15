import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: ["./type_defs/**/*.gql", "./core/**/*.gql"],
  generates: {
    "./core/codegen/out_type_defs.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-resolvers"],
      config: {
        contextType: "./core/codegen/GqlApiCtx.ts#GqlApiCtx",
        mappers: {},
        enumPrefix: true,
        enumsAsTypes: true,
        showUnusedMappers: true,
      },
    },
    "./core/codegen/out_schema.gql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
      },
    },
  },
};
export default config;
