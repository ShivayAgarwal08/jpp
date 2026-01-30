import { AccessControl, Statements } from "../access/types.mjs";
import { AdminOptions, InferAdminRolesFromOption, SessionWithImpersonatedBy, UserWithRole } from "./types.mjs";
import "../index.mjs";
import * as _better_auth_core39 from "@better-auth/core";
import * as _better_auth_core_db23 from "@better-auth/core/db";
import * as better_call705 from "better-call";
import * as zod1922 from "zod";
import * as zod_v4_core268 from "zod/v4/core";

//#region src/plugins/admin/admin.d.ts
declare const admin: <O extends AdminOptions>(options?: O | undefined) => {
  id: "admin";
  init(): {
    options: {
      databaseHooks: {
        user: {
          create: {
            before(user: {
              id: string;
              createdAt: Date;
              updatedAt: Date;
              email: string;
              emailVerified: boolean;
              name: string;
              image?: string | null | undefined;
            } & Record<string, unknown>): Promise<{
              data: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                emailVerified: boolean;
                name: string;
                image?: string | null | undefined;
                role: string;
              };
            }>;
          };
        };
        session: {
          create: {
            before(session: {
              id: string;
              createdAt: Date;
              updatedAt: Date;
              userId: string;
              expiresAt: Date;
              token: string;
              ipAddress?: string | null | undefined;
              userAgent?: string | null | undefined;
            } & Record<string, unknown>, ctx: _better_auth_core39.GenericEndpointContext | null): Promise<void>;
          };
        };
      };
    };
  };
  hooks: {
    after: {
      matcher(context: _better_auth_core39.HookEndpointContext): boolean;
      handler: (inputContext: better_call705.MiddlewareInputContext<better_call705.MiddlewareOptions>) => Promise<SessionWithImpersonatedBy[] | undefined>;
    }[];
  };
  endpoints: {
    setRole: better_call705.StrictEndpoint<"/admin/set-role", {
      method: "POST";
      body: zod1922.ZodObject<{
        userId: zod1922.ZodCoercedString<unknown>;
        role: zod1922.ZodUnion<readonly [zod1922.ZodString, zod1922.ZodArray<zod1922.ZodString>]>;
      }, zod_v4_core268.$strip>;
      requireHeaders: true;
      use: ((inputContext: better_call705.MiddlewareInputContext<better_call705.MiddlewareOptions>) => Promise<{
        session: {
          user: UserWithRole;
          session: _better_auth_core_db23.Session;
        };
      }>)[];
      metadata: {
        openapi: {
          operationId: string;
          summary: string;
          description: string;
          responses: {
            200: {
              description: string;
              content: {
                "application/json": {
                  schema: {
                    type: "object";
                    properties: {
                      user: {
                        $ref: string;
                      };
                    };
                  };
                };
              };
            };
          };
        };
        $Infer: {
          body: {
            userId: string;
            role: InferAdminRolesFromOption<O & Required<Pick<AdminOptions, "defaultRole" | "adminRoles" | "bannedUserMessage">>> | InferAdminRolesFromOption<O & Required<Pick<AdminOptions, "defaultRole" | "adminRoles" | "bannedUserMessage">>>[];
          };
        };
      };
    }, {
      user: UserWithRole;
    }>;
    getUser: better_call705.StrictEndpoint<"/admin/get-user", {
      method: "GET";
      query: zod1922.ZodObject<{
        id: zod1922.ZodString;
      }, zod_v4_core268.$strip>;
      use: ((inputContext: better_call705.MiddlewareInputContext<better_call705.MiddlewareOptions>) => Promise<{
        session: {
          user: UserWithRole;
          session: _better_auth_core_db23.Session;
        };
      }>)[];
      metadata: {
        openapi: {
          operationId: string;
          summary: string;
          description: string;
          responses: {
            200: {
              description: string;
              content: {
                "application/json": {
                  schema: {
                    type: "object";
                    properties: {
                      user: {
                        $ref: string;
                      };
                    };
                  };
                };
              };
            };
          };
        };
      };
    }, UserWithRole>;
    createUser: better_call705.StrictEndpoint<"/admin/create-user", {
      method: "POST";
      body: zod1922.ZodObject<{
        email: zod1922.ZodString;
        password: zod1922.ZodOptional<zod1922.ZodString>;
        name: zod1922.ZodString;
        role: zod1922.ZodOptional<zod1922.ZodUnion<readonly [zod1922.ZodString, zod1922.ZodArray<zod1922.ZodString>]>>;
        data: zod1922.ZodOptional<zod1922.ZodRecord<zod1922.ZodString, zod1922.ZodAny>>;
      }, zod_v4_core268.$strip>;
      metadata: {
        openapi: {
          operationId: string;
          summary: string;
          description: string;
          responses: {
            200: {
              description: string;
              content: {
                "application/json": {
                  schema: {
                    type: "object";
                    properties: {
                      user: {
                        $ref: string;
                      };
                    };
                  };
                };
              };
            };
          };
        };
        $Infer: {
          body: {
            email: string;
            password?: string | undefined;
            name: string;
            role?: InferAdminRolesFromOption<O & Required<Pick<AdminOptions, "defaultRole" | "adminRoles" | "bannedUserMessage">>> | InferAdminRolesFromOption<O & Required<Pick<AdminOptions, "defaultRole" | "adminRoles" | "bannedUserMessage">>>[] | undefined;
            data?: Record<string, any> | undefined;
          };
        };
      };
    }, {
      user: UserWithRole;
    }>;
    adminUpdateUser: better_call705.StrictEndpoint<"/admin/update-user", {
      method: "POST";
      body: zod1922.ZodObject<{
        userId: zod1922.ZodCoercedString<unknown>;
        data: zod1922.ZodRecord<zod1922.ZodAny, zod1922.ZodAny>;
      }, zod_v4_core268.$strip>;
      use: ((inputContext: better_call705.MiddlewareInputContext<better_call705.MiddlewareOptions>) => Promise<{
        session: {
          user: UserWithRole;
          session: _better_auth_core_db23.Session;
        };
      }>)[];
      metadata: {
        openapi: {
          operationId: string;
          summary: string;
          description: string;
          responses: {
            200: {
              description: string;
              content: {
                "application/json": {
                  schema: {
                    type: "object";
                    properties: {
                      user: {
                        $ref: string;
                      };
                    };
                  };
                };
              };
            };
          };
        };
      };
    }, UserWithRole>;
    listUsers: better_call705.StrictEndpoint<"/admin/list-users", {
      method: "GET";
      use: ((inputContext: better_call705.MiddlewareInputContext<better_call705.MiddlewareOptions>) => Promise<{
        session: {
          user: UserWithRole;
          session: _better_auth_core_db23.Session;
        };
      }>)[];
      query: zod1922.ZodObject<{
        searchValue: zod1922.ZodOptional<zod1922.ZodString>;
        searchField: zod1922.ZodOptional<zod1922.ZodEnum<{
          name: "name";
          email: "email";
        }>>;
        searchOperator: zod1922.ZodOptional<zod1922.ZodEnum<{
          contains: "contains";
          starts_with: "starts_with";
          ends_with: "ends_with";
        }>>;
        limit: zod1922.ZodOptional<zod1922.ZodUnion<[zod1922.ZodString, zod1922.ZodNumber]>>;
        offset: zod1922.ZodOptional<zod1922.ZodUnion<[zod1922.ZodString, zod1922.ZodNumber]>>;
        sortBy: zod1922.ZodOptional<zod1922.ZodString>;
        sortDirection: zod1922.ZodOptional<zod1922.ZodEnum<{
          asc: "asc";
          desc: "desc";
        }>>;
        filterField: zod1922.ZodOptional<zod1922.ZodString>;
        filterValue: zod1922.ZodOptional<zod1922.ZodUnion<[zod1922.ZodUnion<[zod1922.ZodString, zod1922.ZodNumber]>, zod1922.ZodBoolean]>>;
        filterOperator: zod1922.ZodOptional<zod1922.ZodEnum<{
          eq: "eq";
          ne: "ne";
          lt: "lt";
          lte: "lte";
          gt: "gt";
          gte: "gte";
          contains: "contains";
        }>>;
      }, zod_v4_core268.$strip>;
      metadata: {
        openapi: {
          operationId: string;
          summary: string;
          description: string;
          responses: {
            200: {
              description: string;
              content: {
                "application/json": {
                  schema: {
                    type: "object";
                    properties: {
                      users: {
                        type: string;
                        items: {
                          $ref: string;
                        };
                      };
                      total: {
                        type: string;
                      };
                      limit: {
                        type: string;
                      };
                      offset: {
                        type: string;
                      };
                    };
                    required: string[];
                  };
                };
              };
            };
          };
        };
      };
    }, {
      users: UserWithRole[];
      total: number;
      limit: number | undefined;
      offset: number | undefined;
    } | {
      users: never[];
      total: number;
    }>;
    listUserSessions: better_call705.StrictEndpoint<"/admin/list-user-sessions", {
      method: "POST";
      use: ((inputContext: better_call705.MiddlewareInputContext<better_call705.MiddlewareOptions>) => Promise<{
        session: {
          user: UserWithRole;
          session: _better_auth_core_db23.Session;
        };
      }>)[];
      body: zod1922.ZodObject<{
        userId: zod1922.ZodCoercedString<unknown>;
      }, zod_v4_core268.$strip>;
      metadata: {
        openapi: {
          operationId: string;
          summary: string;
          description: string;
          responses: {
            200: {
              description: string;
              content: {
                "application/json": {
                  schema: {
                    type: "object";
                    properties: {
                      sessions: {
                        type: string;
                        items: {
                          $ref: string;
                        };
                      };
                    };
                  };
                };
              };
            };
          };
        };
      };
    }, {
      sessions: SessionWithImpersonatedBy[];
    }>;
    unbanUser: better_call705.StrictEndpoint<"/admin/unban-user", {
      method: "POST";
      body: zod1922.ZodObject<{
        userId: zod1922.ZodCoercedString<unknown>;
      }, zod_v4_core268.$strip>;
      use: ((inputContext: better_call705.MiddlewareInputContext<better_call705.MiddlewareOptions>) => Promise<{
        session: {
          user: UserWithRole;
          session: _better_auth_core_db23.Session;
        };
      }>)[];
      metadata: {
        openapi: {
          operationId: string;
          summary: string;
          description: string;
          responses: {
            200: {
              description: string;
              content: {
                "application/json": {
                  schema: {
                    type: "object";
                    properties: {
                      user: {
                        $ref: string;
                      };
                    };
                  };
                };
              };
            };
          };
        };
      };
    }, {
      user: UserWithRole;
    }>;
    banUser: better_call705.StrictEndpoint<"/admin/ban-user", {
      method: "POST";
      body: zod1922.ZodObject<{
        userId: zod1922.ZodCoercedString<unknown>;
        banReason: zod1922.ZodOptional<zod1922.ZodString>;
        banExpiresIn: zod1922.ZodOptional<zod1922.ZodNumber>;
      }, zod_v4_core268.$strip>;
      use: ((inputContext: better_call705.MiddlewareInputContext<better_call705.MiddlewareOptions>) => Promise<{
        session: {
          user: UserWithRole;
          session: _better_auth_core_db23.Session;
        };
      }>)[];
      metadata: {
        openapi: {
          operationId: string;
          summary: string;
          description: string;
          responses: {
            200: {
              description: string;
              content: {
                "application/json": {
                  schema: {
                    type: "object";
                    properties: {
                      user: {
                        $ref: string;
                      };
                    };
                  };
                };
              };
            };
          };
        };
      };
    }, {
      user: UserWithRole;
    }>;
    impersonateUser: better_call705.StrictEndpoint<"/admin/impersonate-user", {
      method: "POST";
      body: zod1922.ZodObject<{
        userId: zod1922.ZodCoercedString<unknown>;
      }, zod_v4_core268.$strip>;
      use: ((inputContext: better_call705.MiddlewareInputContext<better_call705.MiddlewareOptions>) => Promise<{
        session: {
          user: UserWithRole;
          session: _better_auth_core_db23.Session;
        };
      }>)[];
      metadata: {
        openapi: {
          operationId: string;
          summary: string;
          description: string;
          responses: {
            200: {
              description: string;
              content: {
                "application/json": {
                  schema: {
                    type: "object";
                    properties: {
                      session: {
                        $ref: string;
                      };
                      user: {
                        $ref: string;
                      };
                    };
                  };
                };
              };
            };
          };
        };
      };
    }, {
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
      user: UserWithRole;
    }>;
    stopImpersonating: better_call705.StrictEndpoint<"/admin/stop-impersonating", {
      method: "POST";
      requireHeaders: true;
    }, {
      session: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        expiresAt: Date;
        token: string;
        ipAddress?: string | null | undefined;
        userAgent?: string | null | undefined;
      } & Record<string, any>;
      user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
      } & Record<string, any>;
    }>;
    revokeUserSession: better_call705.StrictEndpoint<"/admin/revoke-user-session", {
      method: "POST";
      body: zod1922.ZodObject<{
        sessionToken: zod1922.ZodString;
      }, zod_v4_core268.$strip>;
      use: ((inputContext: better_call705.MiddlewareInputContext<better_call705.MiddlewareOptions>) => Promise<{
        session: {
          user: UserWithRole;
          session: _better_auth_core_db23.Session;
        };
      }>)[];
      metadata: {
        openapi: {
          operationId: string;
          summary: string;
          description: string;
          responses: {
            200: {
              description: string;
              content: {
                "application/json": {
                  schema: {
                    type: "object";
                    properties: {
                      success: {
                        type: string;
                      };
                    };
                  };
                };
              };
            };
          };
        };
      };
    }, {
      success: boolean;
    }>;
    revokeUserSessions: better_call705.StrictEndpoint<"/admin/revoke-user-sessions", {
      method: "POST";
      body: zod1922.ZodObject<{
        userId: zod1922.ZodCoercedString<unknown>;
      }, zod_v4_core268.$strip>;
      use: ((inputContext: better_call705.MiddlewareInputContext<better_call705.MiddlewareOptions>) => Promise<{
        session: {
          user: UserWithRole;
          session: _better_auth_core_db23.Session;
        };
      }>)[];
      metadata: {
        openapi: {
          operationId: string;
          summary: string;
          description: string;
          responses: {
            200: {
              description: string;
              content: {
                "application/json": {
                  schema: {
                    type: "object";
                    properties: {
                      success: {
                        type: string;
                      };
                    };
                  };
                };
              };
            };
          };
        };
      };
    }, {
      success: boolean;
    }>;
    removeUser: better_call705.StrictEndpoint<"/admin/remove-user", {
      method: "POST";
      body: zod1922.ZodObject<{
        userId: zod1922.ZodCoercedString<unknown>;
      }, zod_v4_core268.$strip>;
      use: ((inputContext: better_call705.MiddlewareInputContext<better_call705.MiddlewareOptions>) => Promise<{
        session: {
          user: UserWithRole;
          session: _better_auth_core_db23.Session;
        };
      }>)[];
      metadata: {
        openapi: {
          operationId: string;
          summary: string;
          description: string;
          responses: {
            200: {
              description: string;
              content: {
                "application/json": {
                  schema: {
                    type: "object";
                    properties: {
                      success: {
                        type: string;
                      };
                    };
                  };
                };
              };
            };
          };
        };
      };
    }, {
      success: boolean;
    }>;
    setUserPassword: better_call705.StrictEndpoint<"/admin/set-user-password", {
      method: "POST";
      body: zod1922.ZodObject<{
        newPassword: zod1922.ZodString;
        userId: zod1922.ZodCoercedString<unknown>;
      }, zod_v4_core268.$strip>;
      use: ((inputContext: better_call705.MiddlewareInputContext<better_call705.MiddlewareOptions>) => Promise<{
        session: {
          user: UserWithRole;
          session: _better_auth_core_db23.Session;
        };
      }>)[];
      metadata: {
        openapi: {
          operationId: string;
          summary: string;
          description: string;
          responses: {
            200: {
              description: string;
              content: {
                "application/json": {
                  schema: {
                    type: "object";
                    properties: {
                      status: {
                        type: string;
                      };
                    };
                  };
                };
              };
            };
          };
        };
      };
    }, {
      status: boolean;
    }>;
    userHasPermission: better_call705.StrictEndpoint<"/admin/has-permission", {
      method: "POST";
      body: zod1922.ZodIntersection<zod1922.ZodObject<{
        userId: zod1922.ZodOptional<zod1922.ZodCoercedString<unknown>>;
        role: zod1922.ZodOptional<zod1922.ZodString>;
      }, zod_v4_core268.$strip>, zod1922.ZodUnion<readonly [zod1922.ZodObject<{
        permission: zod1922.ZodRecord<zod1922.ZodString, zod1922.ZodArray<zod1922.ZodString>>;
        permissions: zod1922.ZodUndefined;
      }, zod_v4_core268.$strip>, zod1922.ZodObject<{
        permission: zod1922.ZodUndefined;
        permissions: zod1922.ZodRecord<zod1922.ZodString, zod1922.ZodArray<zod1922.ZodString>>;
      }, zod_v4_core268.$strip>]>>;
      metadata: {
        openapi: {
          description: string;
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object";
                  properties: {
                    permission: {
                      type: string;
                      description: string;
                      deprecated: boolean;
                    };
                    permissions: {
                      type: string;
                      description: string;
                    };
                  };
                  required: string[];
                };
              };
            };
          };
          responses: {
            "200": {
              description: string;
              content: {
                "application/json": {
                  schema: {
                    type: "object";
                    properties: {
                      error: {
                        type: string;
                      };
                      success: {
                        type: string;
                      };
                    };
                    required: string[];
                  };
                };
              };
            };
          };
        };
        $Infer: {
          body: ({
            permission: { [key in keyof (O["ac"] extends AccessControl<infer S extends Statements> ? S : {
              readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
              readonly session: readonly ["list", "revoke", "delete"];
            })]?: ((O["ac"] extends AccessControl<infer S extends Statements> ? S : {
              readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
              readonly session: readonly ["list", "revoke", "delete"];
            })[key] extends readonly unknown[] ? (O["ac"] extends AccessControl<infer S extends Statements> ? S : {
              readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
              readonly session: readonly ["list", "revoke", "delete"];
            })[key][number] : never)[] | undefined };
            permissions?: never | undefined;
          } | {
            permissions: { [key in keyof (O["ac"] extends AccessControl<infer S extends Statements> ? S : {
              readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
              readonly session: readonly ["list", "revoke", "delete"];
            })]?: ((O["ac"] extends AccessControl<infer S extends Statements> ? S : {
              readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
              readonly session: readonly ["list", "revoke", "delete"];
            })[key] extends readonly unknown[] ? (O["ac"] extends AccessControl<infer S extends Statements> ? S : {
              readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
              readonly session: readonly ["list", "revoke", "delete"];
            })[key][number] : never)[] | undefined };
            permission?: never | undefined;
          }) & {
            userId?: string | undefined;
            role?: InferAdminRolesFromOption<O> | undefined;
          };
        };
      };
    }, {
      error: null;
      success: boolean;
    }>;
  };
  $ERROR_CODES: {
    readonly FAILED_TO_CREATE_USER: "Failed to create user";
    readonly USER_ALREADY_EXISTS: "User already exists.";
    readonly USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "User already exists. Use another email.";
    readonly YOU_CANNOT_BAN_YOURSELF: "You cannot ban yourself";
    readonly YOU_ARE_NOT_ALLOWED_TO_CHANGE_USERS_ROLE: "You are not allowed to change users role";
    readonly YOU_ARE_NOT_ALLOWED_TO_CREATE_USERS: "You are not allowed to create users";
    readonly YOU_ARE_NOT_ALLOWED_TO_LIST_USERS: "You are not allowed to list users";
    readonly YOU_ARE_NOT_ALLOWED_TO_LIST_USERS_SESSIONS: "You are not allowed to list users sessions";
    readonly YOU_ARE_NOT_ALLOWED_TO_BAN_USERS: "You are not allowed to ban users";
    readonly YOU_ARE_NOT_ALLOWED_TO_IMPERSONATE_USERS: "You are not allowed to impersonate users";
    readonly YOU_ARE_NOT_ALLOWED_TO_REVOKE_USERS_SESSIONS: "You are not allowed to revoke users sessions";
    readonly YOU_ARE_NOT_ALLOWED_TO_DELETE_USERS: "You are not allowed to delete users";
    readonly YOU_ARE_NOT_ALLOWED_TO_SET_USERS_PASSWORD: "You are not allowed to set users password";
    readonly BANNED_USER: "You have been banned from this application";
    readonly YOU_ARE_NOT_ALLOWED_TO_GET_USER: "You are not allowed to get user";
    readonly NO_DATA_TO_UPDATE: "No data to update";
    readonly YOU_ARE_NOT_ALLOWED_TO_UPDATE_USERS: "You are not allowed to update users";
    readonly YOU_CANNOT_REMOVE_YOURSELF: "You cannot remove yourself";
    readonly YOU_ARE_NOT_ALLOWED_TO_SET_NON_EXISTENT_VALUE: "You are not allowed to set a non-existent role value";
    readonly YOU_CANNOT_IMPERSONATE_ADMINS: "You cannot impersonate admins";
    readonly INVALID_ROLE_TYPE: "Invalid role type";
  };
  schema: {
    user: {
      fields: {
        role: {
          type: "string";
          required: false;
          input: false;
        };
        banned: {
          type: "boolean";
          defaultValue: false;
          required: false;
          input: false;
        };
        banReason: {
          type: "string";
          required: false;
          input: false;
        };
        banExpires: {
          type: "date";
          required: false;
          input: false;
        };
      };
    };
    session: {
      fields: {
        impersonatedBy: {
          type: "string";
          required: false;
        };
      };
    };
  };
  options: NoInfer<O>;
};
//#endregion
export { admin };
//# sourceMappingURL=admin.d.mts.map