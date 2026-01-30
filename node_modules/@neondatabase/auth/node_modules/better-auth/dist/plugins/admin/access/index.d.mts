import "../../../index-BZSqJoCN.mjs";
import "../../../plugins-DLdyc73z.mjs";
import { c as Subset, t as AuthorizeResponse } from "../../../index-B1fASdrI.mjs";
import "../../../index-K6Y-wVlZ.mjs";
import "../../../index-CRKlsq0c.mjs";
import "../../../index-CpKH-xWB.mjs";
import "../../../index-CNMCZNM-.mjs";
import "../../../index-Bc5A5Xje.mjs";
import "../../../index-iRK1LqiD.mjs";
import "../../../index-BInUfw2R.mjs";
import "../../../index-CkZRXsqi.mjs";
import "../../../index-Bd216dFj.mjs";
import "../../../index-B01OM6Wg.mjs";
import "../../../index-C3Osl3iH.mjs";
import "../../../index-Cm6yBUc4.mjs";
import "../../../index-CircvHXF.mjs";
import "../../../index-D4n3RgcF.mjs";
import "../../../index-CTqO-57U.mjs";
import "../../../index-DOcLs18d.mjs";
import "../../../index-BpQUAVLc.mjs";
import "../../../index-CmCL4oIp.mjs";
import "../../../index-D6frN7IY.mjs";
import "../../../index-DF8xqi-5.mjs";

//#region src/plugins/admin/access/statement.d.ts
declare const defaultStatements: {
  readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
  readonly session: readonly ["list", "revoke", "delete"];
};
declare const defaultAc: {
  newRole<K extends "session" | "user">(statements: Subset<K, {
    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
    readonly session: readonly ["list", "revoke", "delete"];
  }>): {
    authorize<K_1 extends K>(request: K_1 extends infer T extends keyof Subset<K, {
      readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
      readonly session: readonly ["list", "revoke", "delete"];
    }> ? { [key in T]?: Subset<K, {
      readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
      readonly session: readonly ["list", "revoke", "delete"];
    }>[key] | {
      actions: Subset<K, {
        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
        readonly session: readonly ["list", "revoke", "delete"];
      }>[key];
      connector: "OR" | "AND";
    } | undefined } : never, connector?: "OR" | "AND"): AuthorizeResponse;
    statements: Subset<K, {
      readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
      readonly session: readonly ["list", "revoke", "delete"];
    }>;
  };
  statements: {
    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
    readonly session: readonly ["list", "revoke", "delete"];
  };
};
declare const adminAc: {
  authorize<K extends "session" | "user">(request: K extends infer T extends keyof Subset<"session" | "user", {
    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
    readonly session: readonly ["list", "revoke", "delete"];
  }> ? { [key in T]?: Subset<"session" | "user", {
    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
    readonly session: readonly ["list", "revoke", "delete"];
  }>[key] | {
    actions: Subset<"session" | "user", {
      readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
      readonly session: readonly ["list", "revoke", "delete"];
    }>[key];
    connector: "OR" | "AND";
  } | undefined } : never, connector?: "OR" | "AND"): AuthorizeResponse;
  statements: Subset<"session" | "user", {
    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
    readonly session: readonly ["list", "revoke", "delete"];
  }>;
};
declare const userAc: {
  authorize<K extends "session" | "user">(request: K extends infer T extends keyof Subset<"session" | "user", {
    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
    readonly session: readonly ["list", "revoke", "delete"];
  }> ? { [key in T]?: Subset<"session" | "user", {
    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
    readonly session: readonly ["list", "revoke", "delete"];
  }>[key] | {
    actions: Subset<"session" | "user", {
      readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
      readonly session: readonly ["list", "revoke", "delete"];
    }>[key];
    connector: "OR" | "AND";
  } | undefined } : never, connector?: "OR" | "AND"): AuthorizeResponse;
  statements: Subset<"session" | "user", {
    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
    readonly session: readonly ["list", "revoke", "delete"];
  }>;
};
declare const defaultRoles: {
  admin: {
    authorize<K extends "session" | "user">(request: K extends infer T extends keyof Subset<"session" | "user", {
      readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
      readonly session: readonly ["list", "revoke", "delete"];
    }> ? { [key in T]?: Subset<"session" | "user", {
      readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
      readonly session: readonly ["list", "revoke", "delete"];
    }>[key] | {
      actions: Subset<"session" | "user", {
        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
        readonly session: readonly ["list", "revoke", "delete"];
      }>[key];
      connector: "OR" | "AND";
    } | undefined } : never, connector?: "OR" | "AND"): AuthorizeResponse;
    statements: Subset<"session" | "user", {
      readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
      readonly session: readonly ["list", "revoke", "delete"];
    }>;
  };
  user: {
    authorize<K extends "session" | "user">(request: K extends infer T extends keyof Subset<"session" | "user", {
      readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
      readonly session: readonly ["list", "revoke", "delete"];
    }> ? { [key in T]?: Subset<"session" | "user", {
      readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
      readonly session: readonly ["list", "revoke", "delete"];
    }>[key] | {
      actions: Subset<"session" | "user", {
        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
        readonly session: readonly ["list", "revoke", "delete"];
      }>[key];
      connector: "OR" | "AND";
    } | undefined } : never, connector?: "OR" | "AND"): AuthorizeResponse;
    statements: Subset<"session" | "user", {
      readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
      readonly session: readonly ["list", "revoke", "delete"];
    }>;
  };
};
//#endregion
export { adminAc, defaultAc, defaultRoles, defaultStatements, userAc };