import { useContext } from "react"
import { AuthQueryContext, type AuthQueryOptions } from "../../lib/auth-query-provider"
import type { AnyAuthClient } from "../../types/any-auth-client"
import { useAuthMutation } from "../shared/use-auth-mutation"

export function useRevokeSession<TAuthClient extends AnyAuthClient>(
    authClient: TAuthClient,
    options?: Partial<AuthQueryOptions>
) {
    type Session = TAuthClient["$Infer"]["Session"]["session"]
    const { listSessionsKey: queryKey } = useContext(AuthQueryContext)

    return useAuthMutation({
        queryKey,
        mutationFn: authClient.revokeSession,
        options
    })
}
