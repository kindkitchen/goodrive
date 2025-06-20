set unstable := true

export JSON_FILES_WITH_VERSION := 'deno.json app/api/deno.json lib/google/deno.json lib/config/deno.json'

alias format := fmt
alias v := version

fmt:
    just --fmt --unstable
    deno fmt --unstable-component --unstable-sql --ignore=app/api
    deno fmt --config app/api/deno.json

[script('bash')]
[working-directory('app/api')]
@api *args='':
    {{ args }}

api_generate:
    just api deno run --allow-all npm:@graphql-codegen/cli/graphql-codegen-esm
    # just api deno run -RW scripts/post-generate.ts

[script('bash')]
version:
    head -n 1 ./VERSION.md | awk '{               
        sub(/#*\s*v?/, "");
        sub(/\s+.*/, "");
        print
      }'

bump: _pre_bump _bump fmt

@_pre_bump:
    echo
    echo  This version will be used: {{ BOLD + BLUE }}$(just v){{ NORMAL }}
    echo "{{ ITALIC }}(to change - modify first line in ./VERSION.md){{ NORMAL }}"
    echo

[confirm('Ok? (y/N)')]
[script('bash')]
_bump:
    VERSION=$(just v)
    if ! [[ "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+(-[0-9A-Za-z.-]+)?$ ]]; then
      echo "The first line of ./VERSION.md should be valid semver version format (markdown heading allowed): $VERSION"
      exit 1
    fi
    for FILE in {{ JSON_FILES_WITH_VERSION }}; do
      jq ".version" "$FILE" && \
      jq ".version=\"$VERSION\"" "$FILE" > tmp.$$.json && mv tmp.$$.json "$FILE"
    done
    echo {{ BOLD + BLUE }}v$VERSION

build: _parallel
    deno task install

_a:
    echo A

_b:
    echo B

[script('bash')]
_parallel:
    trap 'kill 0' SIGINT;
    just _a &
    just _b & 
    wait

dev_api:
    deno run --allow-all app/api/main_api.ts --watch-hmr
