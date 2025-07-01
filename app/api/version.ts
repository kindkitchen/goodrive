export const version = await import("./deno.json", {
    with: { type: "json" }
}).then(({ default: { version } }) => version).catch((_) =>
    "v0.0.0"
)
