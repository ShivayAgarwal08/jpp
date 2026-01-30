import { type AnyUseQueryOptions, useQuery } from "@tanstack/react-query"
import { useContext } from "react"

import { AuthQueryContext } from "../../lib/auth-query-provider"
import type { AnyAuthClient } from "../../types/any-auth-client"
import type { AuthClient } from "../../types/auth-client"

export function useSession<TAuthClient extends AnyAuthClient>(
    authClient: TAuthClient,
    options?: Partial<AnyUseQueryOptions>
) {
    type SessionData = TAuthClient["$Infer"]["Session"]
    type User = TAuthClient["$Infer"]["Session"]["user"]
    type Session = TAuthClient["$Infer"]["Session"]["session"]

    const { sessionQueryOptions, sessionKey: queryKey, queryOptions } = useContext(AuthQueryContext)
    const mergedOptions = { ...queryOptions, ...sessionQueryOptions, ...options }

    const result = useQuery<SessionData>({
        queryKey,
        queryFn: () => (authClient as AuthClient).getSession({ fetchOptions: { throw: true } }),
        ...mergedOptions
    })

    return {
        ...result,
        session: result.data?.session as Session | undefined,
        user: result.data?.user as User | undefined
    }
}
