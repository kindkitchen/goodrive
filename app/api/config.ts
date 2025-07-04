import { Schema } from "effect"
import { implement_ConfigService_fromDotenvWithValidation } from "./lib/config/implement_ConfigService_fromDotenvWithValidation.ts"
import { introduce_ConfigService } from "./lib/config/introduce_ConfigService.ts"

type ConfigType = {
    googleOauth2: {
        clientId: string,
        clientSecret: string,
        redirectUri: string
    }
}
export const ConfigService = introduce_ConfigService<
    ConfigType
>()

const ConfigSchema = Schema.Struct({
    googleOauth2: Schema.Struct({
        clientId: Schema.String,
        clientSecret: Schema.String,
        redirectUri: Schema.String
    })
})

const DotenvSchema = Schema.Struct({
    GOOGLE_CLIENT_ID: Schema.String,
    GOOGLE_CLIENT_SECRET: Schema.String,
    GOOGLE_REDIRECT_URI: Schema.String
})

export const ConfigServiceLive =
    implement_ConfigService_fromDotenvWithValidation(
        ConfigService,
        Schema.transform(
            DotenvSchema,
            ConfigSchema,
            {
                strict: true,
                decode: (
                    {
                        GOOGLE_CLIENT_ID,
                        GOOGLE_CLIENT_SECRET,
                        GOOGLE_REDIRECT_URI
                    }
                ) => ({
                    googleOauth2: {
                        clientId: GOOGLE_CLIENT_ID,
                        clientSecret: GOOGLE_CLIENT_SECRET,
                        redirectUri: GOOGLE_REDIRECT_URI
                    }
                }),
                encode: ({ googleOauth2 }) => ({
                    GOOGLE_CLIENT_ID: googleOauth2.clientId,
                    GOOGLE_CLIENT_SECRET:
                        googleOauth2.clientSecret,
                    GOOGLE_REDIRECT_URI:
                        googleOauth2.redirectUri
                })
            }
        )
    )
