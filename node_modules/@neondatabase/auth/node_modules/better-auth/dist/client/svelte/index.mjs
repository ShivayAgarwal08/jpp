import "../../url-B7VXiggp.mjs";
import { n as getClientConfig, t as createDynamicPathProxy } from "../../proxy-DNjQepc2.mjs";
import "../../parser-g6CH-tVp.mjs";
import { capitalizeFirstLetter } from "@better-auth/core/utils";

//#region src/client/svelte/index.ts
function createAuthClient(options) {
	const { pluginPathMethods, pluginsActions, pluginsAtoms, $fetch, atomListeners, $store } = getClientConfig(options);
	let resolvedHooks = {};
	for (const [key, value] of Object.entries(pluginsAtoms)) resolvedHooks[`use${capitalizeFirstLetter(key)}`] = () => value;
	return createDynamicPathProxy({
		...pluginsActions,
		...resolvedHooks,
		$fetch,
		$store
	}, $fetch, pluginPathMethods, pluginsAtoms, atomListeners);
}

//#endregion
export { createAuthClient };