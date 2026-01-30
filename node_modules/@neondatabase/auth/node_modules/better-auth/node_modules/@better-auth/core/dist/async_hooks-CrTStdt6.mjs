import { c as env } from "./env-D6s-lvJz.mjs";

//#region src/async_hooks/index.ts
/**
* Due to the lack of AsyncLocalStorage in some environments (like Convex),
*
* We assume serverless functions are short-lived and single-threaded, so we can use a simple polyfill.
*/
var AsyncLocalStoragePolyfill = class {
	#current = void 0;
	run(store, fn) {
		const prev = this.#current;
		this.#current = store;
		const result = fn();
		if (result instanceof Promise) return result.finally(() => {
			this.#current = prev;
		});
		this.#current = prev;
		return result;
	}
	getStore() {
		return this.#current;
	}
};
const AsyncLocalStoragePromise = import(
	/* @vite-ignore */
	/* webpackIgnore: true */
	"node:async_hooks"
).then((mod) => mod.AsyncLocalStorage).catch((err) => {
	if ("AsyncLocalStorage" in globalThis) return globalThis.AsyncLocalStorage;
	if (typeof window !== "undefined") return null;
	if (env["CONVEX_CLOUD_URL"] || env["CONVEX_SITE_URL"]) return AsyncLocalStoragePolyfill;
	console.warn("[better-auth] Warning: AsyncLocalStorage is not available in this environment. Some features may not work as expected.");
	console.warn("[better-auth] Please read more about this warning at https://better-auth.com/docs/installation#mount-handler");
	console.warn("[better-auth] If you are using Cloudflare Workers, please see: https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag");
	throw err;
});
async function getAsyncLocalStorage() {
	const mod = await AsyncLocalStoragePromise;
	if (mod === null) throw new Error("getAsyncLocalStorage is only available in server code");
	else return mod;
}

//#endregion
export { getAsyncLocalStorage as t };