import { createAuthClient } from '@neondatabase/neon-js/auth';

export const auth = createAuthClient({
    authUrl: import.meta.env.VITE_NEON_AUTH_URL,
});
