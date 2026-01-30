import { mt as Auth } from "../index-BZSqJoCN.mjs";
import "../plugins-DLdyc73z.mjs";
import * as http0 from "http";
import { IncomingHttpHeaders } from "node:http";

//#region src/integrations/node.d.ts
declare const toNodeHandler: (auth: {
  handler: Auth["handler"];
} | Auth["handler"]) => (req: http0.IncomingMessage, res: http0.ServerResponse) => Promise<void>;
declare function fromNodeHeaders(nodeHeaders: IncomingHttpHeaders): Headers;
//#endregion
export { fromNodeHeaders, toNodeHandler };