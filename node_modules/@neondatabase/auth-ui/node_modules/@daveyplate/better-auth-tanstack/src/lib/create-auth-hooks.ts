import type { AnyUseQueryOptions, QueryKey } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
import { useContext } from "react"

import { useListAccounts } from "../hooks/accounts/use-list-accounts"
import { useUnlinkAccount } from "../hooks/accounts/use-unlink-account"
import { useCreateApiKey } from "../hooks/api-key/use-create-api-key"
import { useDeleteApiKey } from "../hooks/api-key/use-delete-api-key"
import { useListApiKeys } from "../hooks/api-key/use-list-api-keys"
import { useListDeviceSessions } from "../hooks/device-sessions/use-list-device-sessions"
import { useRevokeDeviceSession } from "../hooks/device-sessions/use-revoke-device-session"
import { useSetActiveSession } from "../hooks/device-sessions/use-set-active-session"
import { useActiveOrganization } from "../hooks/organization/use-active-organization"
import { useHasPermission } from "../hooks/organization/use-has-permission"
import { useInvitation } from "../hooks/organization/use-invitation"
import { useListOrganizations } from "../hooks/organization/use-list-organizations"
import { useDeletePasskey } from "../hooks/passkey/use-delete-passkey"
import { useListPasskeys } from "../hooks/passkey/use-list-passkeys"
import { useSession } from "../hooks/session/use-session"
import { useUpdateUser } from "../hooks/session/use-update-user"
import { useListSessions } from "../hooks/sessions/use-list-sessions"
import { useRevokeOtherSessions } from "../hooks/sessions/use-revoke-other-sessions"
import { useRevokeSession } from "../hooks/sessions/use-revoke-session"
import { useRevokeSessions } from "../hooks/sessions/use-revoke-sessions"
import { useAuthMutation } from "../hooks/shared/use-auth-mutation"
import { type BetterFetchRequest, useAuthQuery } from "../hooks/shared/use-auth-query"
import { useToken } from "../hooks/token/use-token"
import type { AnyAuthClient } from "../types/any-auth-client"
import type { AuthClient } from "../types/auth-client"
import { AuthQueryContext, type AuthQueryOptions } from "./auth-query-provider"
import { prefetchSession } from "./prefetch-session"

export function createAuthHooks<TAuthClient extends AnyAuthClient>(authClient: TAuthClient) {
    return {
        useSession: (options?: Partial<AnyUseQueryOptions>) => useSession(authClient, options),
        usePrefetchSession: (options?: Partial<AnyUseQueryOptions>) => {
            const queryClient = useQueryClient()
            const queryOptions = useContext(AuthQueryContext)

            return {
                prefetch: () => prefetchSession(authClient, queryClient, queryOptions, options)
            }
        },
        useUpdateUser: (options?: Partial<AuthQueryOptions>) => useUpdateUser(authClient, options),
        useToken: (options?: Partial<AnyUseQueryOptions>) => useToken(authClient, options),
        useAuthQuery: <TData>({
            queryKey,
            queryFn,
            options
        }: {
            queryKey: QueryKey
            queryFn: BetterFetchRequest<TData>
            options?: Partial<AnyUseQueryOptions>
        }) => useAuthQuery({ authClient, queryKey, queryFn, options }),
        useListAccounts: (options?: Partial<AnyUseQueryOptions>) =>
            useListAccounts(authClient, options),
        useUnlinkAccount: () => useUnlinkAccount(authClient),
        useListSessions: (options?: Partial<AnyUseQueryOptions>) =>
            useListSessions(authClient, options),
        useRevokeSession: (options?: Partial<AuthQueryOptions>) =>
            useRevokeSession(authClient, options),
        useRevokeSessions: (options?: Partial<AuthQueryOptions>) =>
            useRevokeSessions(authClient, options),
        useRevokeOtherSessions: (options?: Partial<AuthQueryOptions>) =>
            useRevokeOtherSessions(authClient, options),
        useListDeviceSessions: (options?: Partial<AnyUseQueryOptions>) =>
            useListDeviceSessions(authClient as AuthClient, options),
        useRevokeDeviceSession: (options?: Partial<AuthQueryOptions>) =>
            useRevokeDeviceSession(authClient as AuthClient, options),
        useSetActiveSession: (options?: Partial<AuthQueryOptions>) =>
            useSetActiveSession(authClient as AuthClient, options),
        useListPasskeys: (options?: Partial<AnyUseQueryOptions>) =>
            useListPasskeys(authClient as AuthClient, options),
        useDeletePasskey: (options?: Partial<AuthQueryOptions>) =>
            useDeletePasskey(authClient as AuthClient, options),
        useListApiKeys: (options?: Partial<AnyUseQueryOptions>) =>
            useListApiKeys(authClient as AuthClient, options),
        useCreateApiKey: (options?: Partial<AuthQueryOptions>) =>
            useCreateApiKey(authClient as AuthClient, options),
        useDeleteApiKey: (options?: Partial<AuthQueryOptions>) =>
            useDeleteApiKey(authClient as AuthClient, options),
        useActiveOrganization: (options?: Partial<AnyUseQueryOptions>) =>
            useActiveOrganization(authClient as AuthClient, options),
        useListOrganizations: (options?: Partial<AnyUseQueryOptions>) =>
            useListOrganizations(authClient as AuthClient, options),
        useHasPermission: (
            params: Parameters<AuthClient["organization"]["hasPermission"]>[0],
            options?: Partial<AnyUseQueryOptions>
        ) => useHasPermission(authClient as AuthClient, params, options),
        useInvitation: (
            params: Parameters<AuthClient["organization"]["getInvitation"]>[0],
            options?: Partial<AnyUseQueryOptions>
        ) => useInvitation(authClient as AuthClient, params, options),
        useAuthMutation: useAuthMutation
    }
}
