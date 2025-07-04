import { Context } from "effect"

export function introduce_ConfigService<
    T
>(tag = "@lib/config::ConfigService") {
    return class ConfigService
        extends Context.Tag(tag)<ConfigService, T>() {}
}
