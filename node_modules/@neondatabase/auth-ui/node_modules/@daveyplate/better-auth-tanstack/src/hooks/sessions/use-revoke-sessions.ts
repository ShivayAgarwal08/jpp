import { useContext } from "react"
import { AuthQueryContext, type AuthQueryOptions } from "../../lib/auth-query-provider"
import type { AnyAuthClient } from "../../types/any-auth-client"
import { useAuthMutation } from "../shared/use-auth-mutation"

export function useRevokeSessions<TAuthClient extends AnyAuthClient>(
    authClient: TAuthClient,
    options?: Partial<AuthQueryOptions>
) {
    const { listSessionsKey: queryKey } = useContext(AuthQueryContext)

    return useAuthMutation({
        queryKey,
        mutationFn: authClient.revokeSessions,
        options
    })
}
