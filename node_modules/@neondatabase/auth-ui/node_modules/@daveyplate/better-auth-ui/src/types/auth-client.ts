import { passkeyClient } from "@better-auth/passkey/client"
import {
    anonymousClient,
    apiKeyClient,
    emailOTPClient,
    genericOAuthClient,
    magicLinkClient,
    multiSessionClient,
    oneTapClient,
    organizationClient,
    twoFactorClient,
    usernameClient
} from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    plugins: [
        apiKeyClient(),
        multiSessionClient(),
        passkeyClient(),
        oneTapClient({
            clientId: ""
        }),
        genericOAuthClient(),
        anonymousClient(),
        usernameClient(),
        magicLinkClient(),
        emailOTPClient(),
        twoFactorClient(),
        organizationClient({
            teams: {
                enabled: true
            }
        })
    ]
})

export type AuthClient = typeof authClient

export type Session = AuthClient["$Infer"]["Session"]["session"]
export type User = AuthClient["$Infer"]["Session"]["user"]
