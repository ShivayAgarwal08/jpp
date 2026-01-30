import "../dialect-BHuPIP4Z.mjs";
import { f as getBaseAdapter } from "../get-migration-CDvYpogu.mjs";
import "../schema-dfOF7vRb.mjs";
import "../get-request-ip-G2Tcmzbb.mjs";
import "../utils-C4Ub_EYH.mjs";
import "../api-D0cF0fk5.mjs";
import "../crypto-DgVHxgLL.mjs";
import "../cookies-CT1-kARg.mjs";
import "../url-B7VXiggp.mjs";
import "../session-BYq-s4dF.mjs";
import { n as createAuthContext, t as createBetterAuth } from "../base-vYFdAXPf.mjs";
import "../password-BRmR7rWA.mjs";
import { BetterAuthError } from "@better-auth/core/error";

//#region src/context/init-minimal.ts
const initMinimal = async (options) => {
	const adapter = await getBaseAdapter(options, async () => {
		throw new BetterAuthError("Direct database connection requires Kysely. Please use `better-auth` instead of `better-auth/minimal`, or provide an adapter (drizzleAdapter, prismaAdapter, etc.)");
	});
	const getDatabaseType = (_database) => "unknown";
	const ctx = await createAuthContext(adapter, options, getDatabaseType);
	ctx.runMigrations = async function() {
		throw new BetterAuthError("Migrations are not supported in 'better-auth/minimal'. Please use 'better-auth' for migration support.");
	};
	return ctx;
};

//#endregion
//#region src/auth/minimal.ts
/**
* Better Auth initializer for minimal mode (without Kysely)
*/
const betterAuth = (options) => {
	return createBetterAuth(options, initMinimal);
};

//#endregion
export { betterAuth };