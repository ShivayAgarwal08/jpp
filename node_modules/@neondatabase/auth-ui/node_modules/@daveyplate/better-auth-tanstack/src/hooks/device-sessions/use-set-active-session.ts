import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
import { useContext } from "react"

import { AuthQueryContext, type AuthQueryOptions } from "../../lib/auth-query-provider"

import type { AuthClient } from "../../types/auth-client"
import { useOnMutateError } from "../shared/use-mutate-error"

export function useSetActiveSession<TAuthClient extends AuthClient>(
    authClient: TAuthClient,
    options?: Partial<AuthQueryOptions>
) {
    type SetActiveSessionParams = Parameters<TAuthClient["multiSession"]["setActive"]>[0]

    const queryClient = useQueryClient()
    const { onMutateError } = useOnMutateError()
    const context = useContext(AuthQueryContext)
    const { listDeviceSessionsKey: queryKey } = { ...context, ...options }

    const mutation = useMutation({
        mutationFn: ({ fetchOptions = { throw: true }, ...params }: SetActiveSessionParams) =>
            authClient.multiSession.setActive({ fetchOptions, ...params }),
        onError: (error) => onMutateError(error, queryKey),
        onSettled: () => queryClient.clear()
    })

    const {
        mutate: setActiveSession,
        mutateAsync: setActiveSessionAsync,
        isPending: setActiveSessionPending,
        error: setActiveSessionError
    } = mutation

    return {
        ...mutation,
        setActiveSession,
        setActiveSessionAsync,
        setActiveSessionPending,
        setActiveSessionError
    }
}
