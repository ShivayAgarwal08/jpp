import { Tt as User, wt as Session } from "./index-BZSqJoCN.mjs";
import { GenericEndpointContext } from "@better-auth/core";
import * as z from "zod";
import * as better_call203 from "better-call";

//#region src/plugins/one-time-token/index.d.ts
interface OneTimeTokenOptions {
  /**
   * Expires in minutes
   *
   * @default 3
   */
  expiresIn?: number | undefined;
  /**
   * Only allow server initiated requests
   */
  disableClientRequest?: boolean | undefined;
  /**
   * Generate a custom token
   */
  generateToken?: ((session: {
    user: User & Record<string, any>;
    session: Session & Record<string, any>;
  }, ctx: GenericEndpointContext) => Promise<string>) | undefined;
  /**
   * This option allows you to configure how the token is stored in your database.
   * Note: This will not affect the token that's sent, it will only affect the token stored in your database.
   *
   * @default "plain"
   */
  storeToken?: ("plain" | "hashed" | {
    type: "custom-hasher";
    hash: (token: string) => Promise<string>;
  }) | undefined;
}
declare const oneTimeToken: (options?: OneTimeTokenOptions | undefined) => {
  id: "one-time-token";
  endpoints: {
    /**
     * ### Endpoint
     *
     * GET `/one-time-token/generate`
     *
     * ### API Methods
     *
     * **server:**
     * `auth.api.generateOneTimeToken`
     *
     * **client:**
     * `authClient.oneTimeToken.generate`
     *
     * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/one-time-token#api-method-one-time-token-generate)
     */
    generateOneTimeToken: better_call203.StrictEndpoint<"/one-time-token/generate", {
      method: "GET";
      use: ((inputContext: better_call203.MiddlewareInputContext<better_call203.MiddlewareOptions>) => Promise<{
        session: {
          session: Record<string, any> & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            expiresAt: Date;
            token: string;
            ipAddress?: string | null | undefined;
            userAgent?: string | null | undefined;
          };
          user: Record<string, any> & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined;
          };
        };
      }>)[];
    } & {
      use: any[];
    }, {
      token: string;
    }>;
    /**
     * ### Endpoint
     *
     * POST `/one-time-token/verify`
     *
     * ### API Methods
     *
     * **server:**
     * `auth.api.verifyOneTimeToken`
     *
     * **client:**
     * `authClient.oneTimeToken.verify`
     *
     * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/one-time-token#api-method-one-time-token-verify)
     */
    verifyOneTimeToken: better_call203.StrictEndpoint<"/one-time-token/verify", {
      method: "POST";
      body: z.ZodObject<{
        token: z.ZodString;
      }, z.core.$strip>;
    } & {
      use: any[];
    }, {
      session: Session & Record<string, any>;
      user: User & Record<string, any>;
    }>;
  };
};
//#endregion
export { oneTimeToken as n, OneTimeTokenOptions as t };