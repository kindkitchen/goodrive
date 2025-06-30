import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  emitLegacyCommonJSImports: false,
  schema: ["!./schema.gql", "!node_modules", "./**/*.gql"],
  overwrite: true,
  documents: [
    "!node_modules",
    "./**/*.ts",
  ],
  generates: {
    // "./__gql__/": {
    //     preset: "client",
    //     presetConfig: {
    //         gqlTagName: "gql",
    //     },
    // },
    "./__gql__/types.ts": {
      plugins: ["typescript", "typescript-operations"],
    },
    "./schema.gql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
