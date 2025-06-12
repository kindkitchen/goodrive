set unstable := true

export JSON_FILES_WITH_VERSION := ''

alias format := fmt
alias v := version

fmt:
    just --fmt --unstable
    deno fmt --unstable-component --unstable-sql

[script('bash')]
version:
    head -n 1 ./VERSION.MD | awk '{               
        sub(/#*\s*v?/, "");
        sub(/\s+.*/, "");
        print
      }'

bump: _pre_bump _bump fmt

@_pre_bump:
    echo
    echo  This version will be used: {{ BOLD + BLUE }}$(just v){{ NORMAL }}
    echo "{{ ITALIC }}(to change - modify first line in ./VERSION.MD){{ NORMAL }}"
    echo

[confirm('Ok? (y/N)')]
[script('bash')]
_bump:
    VERSION=$(just v)
    if ! [[ "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+(-[0-9A-Za-z.-]+)?$ ]]; then
      echo "The first line of ./VERSION.MD should be valid semver version format (markdown heading allowed): $VERSION"
      exit 1
    fi
    for FILE in {{ JSON_FILES_WITH_VERSION }}; do
      jq ".version" "$FILE" && \
      jq ".version=\"$VERSION\"" "$FILE" > tmp.$$.json && mv tmp.$$.json "$FILE"
    done
    echo {{ BOLD + BLUE }}v$VERSION

install:
    deno install --allow-scripts

_a:
    echo A

_b:
    echo B

[script('bash')]
parallel:
    trap 'kill 0' SIGINT;
    just _a &
    just _b & 
    wait
