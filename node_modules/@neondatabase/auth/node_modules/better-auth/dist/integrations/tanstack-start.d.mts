import * as _better_auth_core0 from "@better-auth/core";
import * as better_call123 from "better-call";

//#region src/integrations/tanstack-start.d.ts
declare const tanstackStartCookies: () => {
  id: "tanstack-start-cookies";
  hooks: {
    after: {
      matcher(ctx: _better_auth_core0.HookEndpointContext): true;
      handler: (inputContext: better_call123.MiddlewareInputContext<better_call123.MiddlewareOptions>) => Promise<void>;
    }[];
  };
};
//#endregion
export { tanstackStartCookies };