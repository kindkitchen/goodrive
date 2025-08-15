import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: ["./type_defs/**/*.gql"],
  generates: {
    "./codegen/out_type_defs.ts": {
      plugins: ["typescript", "typescript-operations"],
      config: {
        mappers: {},
        enumPrefix: true,
        enumsAsTypes: true,
        showUnusedMappers: true,
      },
    },
    "./codegen/out_schema.gql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
      },
    },
  },
  emitLegacyCommonJSImports: false,
};
export default config;
