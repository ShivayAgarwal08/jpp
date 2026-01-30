import type { AnyUseQueryOptions } from "@tanstack/react-query"
import { useContext } from "react"

import { AuthQueryContext } from "../../lib/auth-query-provider"
import type { AuthClient } from "../../types/auth-client"
import { useAuthQuery } from "../shared/use-auth-query"

export function useListPasskeys<TAuthClient extends AuthClient>(
    authClient: TAuthClient,
    options?: Partial<AnyUseQueryOptions>
) {
    const { listPasskeysKey: queryKey } = useContext(AuthQueryContext)

    return useAuthQuery({
        authClient,
        queryKey,
        queryFn: authClient.passkey.listUserPasskeys,
        options
    })
}
