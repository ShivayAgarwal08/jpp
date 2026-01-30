import "../env-D6s-lvJz.mjs";
import "../async_hooks-CrTStdt6.mjs";
import { f as runWithEndpointContext } from "../context-su4uu82y.mjs";
import { createEndpoint, createMiddleware } from "better-call";

//#region src/api/index.ts
const optionsMiddleware = createMiddleware(async () => {
	/**
	* This will be passed on the instance of
	* the context. Used to infer the type
	* here.
	*/
	return {};
});
const createAuthMiddleware = createMiddleware.create({ use: [optionsMiddleware, createMiddleware(async () => {
	return {};
})] });
const use = [optionsMiddleware];
const createAuthEndpoint = (path, options, handler) => {
	return createEndpoint(path, {
		...options,
		use: [...options?.use || [], ...use]
	}, async (ctx) => runWithEndpointContext(ctx, () => handler(ctx)));
};

//#endregion
export { createAuthEndpoint, createAuthMiddleware, optionsMiddleware };