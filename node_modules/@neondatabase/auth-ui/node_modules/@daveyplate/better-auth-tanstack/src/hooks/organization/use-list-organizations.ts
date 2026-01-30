import type { AnyUseQueryOptions } from "@tanstack/react-query"
import type { AuthClient } from "../../types/auth-client"
import { useAuthQuery } from "../shared/use-auth-query"

export function useListOrganizations<TAuthClient extends AuthClient>(
    authClient: TAuthClient,
    options?: Partial<AnyUseQueryOptions>
) {
    const queryKey = ["organizations"]

    return useAuthQuery({
        authClient,
        queryKey,
        queryFn: authClient.organization.list,
        options
    })
}
