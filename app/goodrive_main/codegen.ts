import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: ["./lib/goodrive_type_defs/**/*.gql"],
  generates: {
    "./codegen/out_goodrive_type_defs.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-resolvers"],
      config: {
        contextType: "./codegen/GqlApiCtx.ts#GqlApiCtx",
        mappers: {},
        enumPrefix: true,
        enumsAsTypes: true,
        showUnusedMappers: true,
      },
    },
    "./schema.gql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
      },
    },
  },
  emitLegacyCommonJSImports: false,
};
export default config;
