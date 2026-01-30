import { useContext } from "react"
import { AuthQueryContext, type AuthQueryOptions } from "../../lib/auth-query-provider"
import type { AnyAuthClient } from "../../types/any-auth-client"
import { useAuthMutation } from "../shared/use-auth-mutation"

export function useUpdateUser<TAuthClient extends AnyAuthClient>(
    authClient: TAuthClient,
    options?: Partial<AuthQueryOptions>
) {
    type SessionData = TAuthClient["$Infer"]["Session"]

    const { sessionKey: queryKey } = useContext(AuthQueryContext)

    return useAuthMutation({
        queryKey,
        mutationFn: authClient.updateUser,
        optimisticData: (params, previousSession: SessionData) => ({
            ...previousSession,
            user: { ...previousSession.user, ...params }
        }),
        options
    })
}
