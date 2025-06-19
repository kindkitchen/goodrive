import type { GetTokenResponse, OAuth2Client, TokenInfo } from "@lib/google";
import { Data, Either, Schema as S } from "effect";

const PositiveQs = S.Struct({
    code: S.String,
    state: S.String,
});
const NegativeQs = S.Struct({ error: S.String });
const is_qs_positive = S.is(
    PositiveQs,
);

const FailError = Data.tagged<FailError>(
    "/google_callback_handler/FailError",
);

const FailPanic = Data.tagged<FailPanic>(
    "/google_callback_handler/FailPanic",
);

const FailMismatchState = Data.tagged<FailMismatchState>(
    "/google_callback_handler/FailMismatchState",
);

const FailParseCode = Data.tagged<FailParseCode>(
    "/google_callback_handler/FailParseCode",
);

const Success = Data.tagged<Success>("/google_callback_handler/Success");

export const google_callback_handler = async (
    { query, gOauth }: { query: Record<string, string>; gOauth: OAuth2Client },
) => {
    if (!is_qs_positive(query)) {
        return S.decodeUnknownEither(NegativeQs)(query).pipe(Either.match({
            onRight: (error) => FailError(error),
            onLeft: (panic) =>
                FailPanic({
                    error: panic,
                }),
        }));
    }

    const { code, state } = query;

    if (state !== "TODO") {
        return FailMismatchState({ message: "TODO" });
    }

    const payload = await gOauth.getToken(
        code,
    );

    if (!payload.tokens.access_token) {
        return FailParseCode({ message: "TODO" });
    }

    const info = await gOauth.getTokenInfo(payload.tokens.access_token);

    console.log(info);

    return Success({
        info,
        payload,
    });
};

interface Success {
    _tag: "/google_callback_handler/Success";
    payload: GetTokenResponse;
    info: TokenInfo;
}

interface FailError {
    _tag: "/google_callback_handler/FailError";
    error: string;
}

interface FailPanic {
    _tag: "/google_callback_handler/FailPanic";
    error: unknown;
}

interface FailMismatchState {
    _tag: "/google_callback_handler/FailMismatchState";
    message?: string;
}

interface FailParseCode {
    _tag: "/google_callback_handler/FailParseCode";
    message?: string;
}
