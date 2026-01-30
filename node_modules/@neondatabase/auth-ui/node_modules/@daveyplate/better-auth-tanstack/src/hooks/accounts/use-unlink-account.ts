import { useContext } from "react"
import { AuthQueryContext, type AuthQueryOptions } from "../../lib/auth-query-provider"
import type { AnyAuthClient } from "../../types/any-auth-client"
import { useAuthMutation } from "../shared/use-auth-mutation"

export function useUnlinkAccount<TAuthClient extends AnyAuthClient>(
    authClient: TAuthClient,
    options?: AuthQueryOptions
) {
    const { listAccountsKey: queryKey } = useContext(AuthQueryContext)

    return useAuthMutation({
        queryKey,
        mutationFn: authClient.unlinkAccount,
        options
    })
}
