import type { AnyUseQueryOptions } from "@tanstack/react-query"
import type { AnyAuthClient } from "../../types/any-auth-client"
import type { AuthClient } from "../../types/auth-client"
import { useAuthQuery } from "../shared/use-auth-query"

export function useInvitation<TAuthClient extends AnyAuthClient>(
    authClient: TAuthClient,
    params: Parameters<AuthClient["organization"]["getInvitation"]>[0],
    options?: Partial<AnyUseQueryOptions>
) {
    const queryKey = ["invitation", JSON.stringify(params)]

    return useAuthQuery({
        authClient,
        queryKey,
        queryFn: (fnParams) =>
            (authClient as AuthClient).organization.getInvitation({ ...params, ...fnParams }),
        options
    })
}
