import { PhoneNumberOptions, UserWithPhoneNumber } from "./types.mjs";
import * as _better_auth_core4 from "@better-auth/core";
import * as better_call12 from "better-call";
import * as zod0 from "zod";
import * as zod_v4_core0 from "zod/v4/core";

//#region src/plugins/phone-number/index.d.ts
declare const phoneNumber: (options?: PhoneNumberOptions | undefined) => {
  id: "phone-number";
  hooks: {
    before: {
      matcher: (ctx: _better_auth_core4.HookEndpointContext) => boolean;
      handler: (inputContext: better_call12.MiddlewareInputContext<better_call12.MiddlewareOptions>) => Promise<never>;
    }[];
  };
  endpoints: {
    signInPhoneNumber: better_call12.StrictEndpoint<"/sign-in/phone-number", {
      method: "POST";
      body: zod0.ZodObject<{
        phoneNumber: zod0.ZodString;
        password: zod0.ZodString;
        rememberMe: zod0.ZodOptional<zod0.ZodBoolean>;
      }, zod_v4_core0.$strip>;
      metadata: {
        openapi: {
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
                      session: {
                        $ref: string;
                      };
                    };
                  };
                };
              };
            };
            400: {
              description: string;
            };
          };
        };
      };
    }, {
      token: string;
      user: UserWithPhoneNumber;
    }>;
    sendPhoneNumberOTP: better_call12.StrictEndpoint<"/phone-number/send-otp", {
      method: "POST";
      body: zod0.ZodObject<{
        phoneNumber: zod0.ZodString;
      }, zod_v4_core0.$strip>;
      metadata: {
        openapi: {
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
                      message: {
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
      message: string;
    }>;
    verifyPhoneNumber: better_call12.StrictEndpoint<"/phone-number/verify", {
      method: "POST";
      body: zod0.ZodObject<{
        phoneNumber: zod0.ZodString;
        code: zod0.ZodString;
        disableSession: zod0.ZodOptional<zod0.ZodBoolean>;
        updatePhoneNumber: zod0.ZodOptional<zod0.ZodBoolean>;
      }, zod_v4_core0.$strip>;
      metadata: {
        openapi: {
          summary: string;
          description: string;
          responses: {
            "200": {
              description: string;
              content: {
                "application/json": {
                  schema: {
                    type: "object";
                    properties: {
                      status: {
                        type: string;
                        description: string;
                        enum: boolean[];
                      };
                      token: {
                        type: string;
                        nullable: boolean;
                        description: string;
                      };
                      user: {
                        type: string;
                        nullable: boolean;
                        properties: {
                          id: {
                            type: string;
                            description: string;
                          };
                          email: {
                            type: string;
                            format: string;
                            nullable: boolean;
                            description: string;
                          };
                          emailVerified: {
                            type: string;
                            nullable: boolean;
                            description: string;
                          };
                          name: {
                            type: string;
                            nullable: boolean;
                            description: string;
                          };
                          image: {
                            type: string;
                            format: string;
                            nullable: boolean;
                            description: string;
                          };
                          phoneNumber: {
                            type: string;
                            description: string;
                          };
                          phoneNumberVerified: {
                            type: string;
                            description: string;
                          };
                          createdAt: {
                            type: string;
                            format: string;
                            description: string;
                          };
                          updatedAt: {
                            type: string;
                            format: string;
                            description: string;
                          };
                        };
                        required: string[];
                        description: string;
                      };
                    };
                    required: string[];
                  };
                };
              };
            };
            400: {
              description: string;
            };
          };
        };
      };
    }, {
      status: boolean;
      token: string;
      user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
      } & UserWithPhoneNumber;
    } | {
      status: boolean;
      token: null;
      user: UserWithPhoneNumber;
    }>;
    requestPasswordResetPhoneNumber: better_call12.StrictEndpoint<"/phone-number/request-password-reset", {
      method: "POST";
      body: zod0.ZodObject<{
        phoneNumber: zod0.ZodString;
      }, zod_v4_core0.$strip>;
      metadata: {
        openapi: {
          description: string;
          responses: {
            "200": {
              description: string;
              content: {
                "application/json": {
                  schema: {
                    type: "object";
                    properties: {
                      status: {
                        type: string;
                        description: string;
                        enum: boolean[];
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
      status: boolean;
    }>;
    resetPasswordPhoneNumber: better_call12.StrictEndpoint<"/phone-number/reset-password", {
      method: "POST";
      body: zod0.ZodObject<{
        otp: zod0.ZodString;
        phoneNumber: zod0.ZodString;
        newPassword: zod0.ZodString;
      }, zod_v4_core0.$strip>;
      metadata: {
        openapi: {
          description: string;
          responses: {
            "200": {
              description: string;
              content: {
                "application/json": {
                  schema: {
                    type: "object";
                    properties: {
                      status: {
                        type: string;
                        description: string;
                        enum: boolean[];
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
      status: boolean;
    }>;
  };
  schema: {
    user: {
      fields: {
        phoneNumber: {
          type: "string";
          required: false;
          unique: true;
          sortable: true;
          returned: true;
        };
        phoneNumberVerified: {
          type: "boolean";
          required: false;
          returned: true;
          input: false;
        };
      };
    };
  };
  rateLimit: {
    pathMatcher(path: string): boolean;
    window: number;
    max: number;
  }[];
  options: PhoneNumberOptions | undefined;
  $ERROR_CODES: {
    readonly INVALID_PHONE_NUMBER: "Invalid phone number";
    readonly PHONE_NUMBER_EXIST: "Phone number already exists";
    readonly PHONE_NUMBER_NOT_EXIST: "phone number isn't registered";
    readonly INVALID_PHONE_NUMBER_OR_PASSWORD: "Invalid phone number or password";
    readonly UNEXPECTED_ERROR: "Unexpected error";
    readonly OTP_NOT_FOUND: "OTP not found";
    readonly OTP_EXPIRED: "OTP expired";
    readonly INVALID_OTP: "Invalid OTP";
    readonly PHONE_NUMBER_NOT_VERIFIED: "Phone number not verified";
    readonly PHONE_NUMBER_CANNOT_BE_UPDATED: "Phone number cannot be updated";
    readonly SEND_OTP_NOT_IMPLEMENTED: "sendOTP not implemented";
    readonly TOO_MANY_ATTEMPTS: "Too many attempts";
  };
};
//#endregion
export { type PhoneNumberOptions, type UserWithPhoneNumber, phoneNumber };
//# sourceMappingURL=index.d.mts.map