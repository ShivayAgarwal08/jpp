import { Tt as User, ht as Account, ot as generateState, st as parseState } from "../index-BZSqJoCN.mjs";
import "../plugins-DLdyc73z.mjs";
import { AuthContext, GenericEndpointContext } from "@better-auth/core";
export * from "@better-auth/core/oauth2";

//#region src/oauth2/link-account.d.ts
declare function handleOAuthUserInfo(c: GenericEndpointContext, opts: {
  userInfo: Omit<User, "createdAt" | "updatedAt">;
  account: Omit<Account, "id" | "userId" | "createdAt" | "updatedAt">;
  callbackURL?: string | undefined;
  disableSignUp?: boolean | undefined;
  overrideUserInfo?: boolean | undefined;
  isTrustedProvider?: boolean | undefined;
}): Promise<{
  error: string;
  data: null;
  isRegister?: undefined;
} | {
  error: string;
  data: null;
  isRegister: boolean;
} | {
  data: {
    session: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      userId: string;
      expiresAt: Date;
      token: string;
      ipAddress?: string | null | undefined;
      userAgent?: string | null | undefined;
    };
    user: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      email: string;
      emailVerified: boolean;
      name: string;
      image?: string | null | undefined;
    };
  };
  error: null;
  isRegister: boolean;
}>;
//#endregion
//#region src/oauth2/utils.d.ts
declare function decryptOAuthToken(token: string, ctx: AuthContext): string | Promise<string>;
declare function setTokenUtil(token: string | null | undefined, ctx: AuthContext): string | Promise<string> | null | undefined;
//#endregion
export { decryptOAuthToken, generateState, handleOAuthUserInfo, parseState, setTokenUtil };