set unstable := true
set allow-duplicate-recipes := true
set allow-duplicate-variables := true

import '.just/const.just'
import '.just/version.just'
import '.just/bump.just'
import '.just/print.just'
import '.just/app_lib_link.just'
import '.just/app_lib_unlink.just'
import '.just/app.just'
import '.just/format_all_justfiles.just'
import '.just/home.just'

alias v := version
alias main := goodrive_main
alias api := goodrive_main_api

ROOT := justfile_directory()

_______________:
    just --list

[script("bash")]
goodrive_main *args:
    just app goodrive_main {{ args }}

[script("bash")]
goodrive_main_api *args:
    just app goodrive_main_api {{ args }}

[script('bash')]
check *args:
    COMMAND="deno check {{ args }}"

[script('bash')]
fmt:
    just format_all_justfiles
    just api just fmt
    just main just fmt
