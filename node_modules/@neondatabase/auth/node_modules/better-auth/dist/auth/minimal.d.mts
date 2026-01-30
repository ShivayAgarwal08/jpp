import { mt as Auth } from "../index-BZSqJoCN.mjs";
import "../plugins-DLdyc73z.mjs";
import { BetterAuthOptions } from "@better-auth/core";

//#region src/auth/minimal.d.ts

/**
 * Better Auth initializer for minimal mode (without Kysely)
 */
declare const betterAuth: <Options extends BetterAuthOptions>(options: Options & Record<never, never>) => Auth<Options>;
//#endregion
export { type BetterAuthOptions, betterAuth };