export const TOP_LEVEL_API_URL = import.meta.env.VITE_API_URL || '';

export const getApiUrl = (endpoint) => {
    // Remove leading slash if present to avoid double slashes if API_URL has trailing slash
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const baseUrl = TOP_LEVEL_API_URL.endsWith('/') ? TOP_LEVEL_API_URL.slice(0, -1) : TOP_LEVEL_API_URL;

    // If no API_URL (dev mode with proxy), keep as relative
    if (!baseUrl) return `/${cleanEndpoint}`;

    return `${baseUrl}/${cleanEndpoint}`;
};
