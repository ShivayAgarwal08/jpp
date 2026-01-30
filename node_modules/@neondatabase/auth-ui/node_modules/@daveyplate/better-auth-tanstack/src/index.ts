export * from "./lib/auth-query-provider"
export * from "./lib/create-auth-hooks"
export * from "./lib/create-auth-prefetches"
export * from "./lib/prefetch-session"

export type NonThrowableResult = {
    data: {
        status?: boolean
        success?: boolean
        [key: string]: unknown
    } | null
    error: {
        code?: string | undefined
        message?: string | undefined
        status: number
        statusText: string
    } | null
}

export type ThrowableResult = { status?: boolean; [key: string]: unknown }
