import * as _better_auth_core4 from "@better-auth/core";
import { GenericEndpointContext } from "@better-auth/core";
import * as _better_auth_core_db0 from "@better-auth/core/db";
import * as zod415 from "zod";
import * as better_call132 from "better-call";
import * as zod_v4_core57 from "zod/v4/core";

//#region src/plugins/email-otp/types.d.ts
interface EmailOTPOptions {
  /**
   * Function to send email verification.
   *
   * It is recommended to not await the email sending to avoid timing attacks.
   * On serverless platforms, use `waitUntil` or similar to ensure the email is sent.
   */
  sendVerificationOTP: (data: {
    email: string;
    otp: string;
    type: "sign-in" | "email-verification" | "forget-password";
  }, ctx?: GenericEndpointContext | undefined) => Promise<void>;
  /**
   * Length of the OTP
   *
   * @default 6
   */
  otpLength?: number | undefined;
  /**
   * Expiry time of the OTP in seconds
   *
   * @default 300 (5 minutes)
   */
  expiresIn?: number | undefined;
  /**
   * Custom function to generate otp
   */
  generateOTP?: (data: {
    email: string;
    type: "sign-in" | "email-verification" | "forget-password";
  }, ctx?: GenericEndpointContext) => string | undefined;
  /**
   * Send email verification on sign-up
   *
   * @Default false
   */
  sendVerificationOnSignUp?: boolean | undefined;
  /**
   * A boolean value that determines whether to prevent
   * automatic sign-up when the user is not registered.
   *
   * @Default false
   */
  disableSignUp?: boolean | undefined;
  /**
   * Allowed attempts for the OTP code
   * @default 3
   */
  allowedAttempts?: number | undefined;
  /**
   * Store the OTP in your database in a secure way
   * Note: This will not affect the OTP sent to the user, it will only affect the OTP stored in your database
   *
   * @default "plain"
   */
  storeOTP?: ("hashed" | "plain" | "encrypted" | {
    hash: (otp: string) => Promise<string>;
  } | {
    encrypt: (otp: string) => Promise<string>;
    decrypt: (otp: string) => Promise<string>;
  }) | undefined;
  /**
   * Override the default email verification to use email otp instead
   *
   * @default false
   */
  overrideDefaultEmailVerification?: boolean | undefined;
}
//#endregion
//#region src/plugins/email-otp/index.d.ts
declare const emailOTP: (options: EmailOTPOptions) => {
  id: "email-otp";
  init(ctx: _better_auth_core4.AuthContext): {
    options: {
      emailVerification: {
        sendVerificationEmail(data: {
          user: _better_auth_core_db0.User;
          url: string;
          token: string;
        }, request: Request | undefined): Promise<void>;
      };
    };
  } | undefined;
  endpoints: {
    sendVerificationOTP: better_call132.StrictEndpoint<"/email-otp/send-verification-otp", {
      method: "POST";
      body: zod415.ZodObject<{
        email: zod415.ZodString;
        type: zod415.ZodEnum<{
          "sign-in": "sign-in";
          "email-verification": "email-verification";
          "forget-password": "forget-password";
        }>;
      }, zod_v4_core57.$strip>;
      metadata: {
        openapi: {
          operationId: string;
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
    } & {
      use: any[];
    }, {
      success: boolean;
    }>;
    createVerificationOTP: better_call132.StrictEndpoint<"/email-otp/create-verification-otp", {
      method: "POST";
      body: zod415.ZodObject<{
        email: zod415.ZodString;
        type: zod415.ZodEnum<{
          "sign-in": "sign-in";
          "email-verification": "email-verification";
          "forget-password": "forget-password";
        }>;
      }, zod_v4_core57.$strip>;
      metadata: {
        SERVER_ONLY: true;
        openapi: {
          operationId: string;
          description: string;
          responses: {
            200: {
              description: string;
              content: {
                "application/json": {
                  schema: {
                    type: "string";
                  };
                };
              };
            };
          };
        };
      };
    } & {
      use: any[];
    }, string>;
    getVerificationOTP: better_call132.StrictEndpoint<"/email-otp/get-verification-otp", {
      method: "GET";
      query: zod415.ZodObject<{
        email: zod415.ZodString;
        type: zod415.ZodEnum<{
          "sign-in": "sign-in";
          "email-verification": "email-verification";
          "forget-password": "forget-password";
        }>;
      }, zod_v4_core57.$strip>;
      metadata: {
        SERVER_ONLY: true;
        openapi: {
          operationId: string;
          description: string;
          responses: {
            "200": {
              description: string;
              content: {
                "application/json": {
                  schema: {
                    type: "object";
                    properties: {
                      otp: {
                        type: string;
                        nullable: boolean;
                        description: string;
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
    } & {
      use: any[];
    }, {
      otp: null;
    } | {
      otp: string;
    }>;
    checkVerificationOTP: better_call132.StrictEndpoint<"/email-otp/check-verification-otp", {
      method: "POST";
      body: zod415.ZodObject<{
        email: zod415.ZodString;
        type: zod415.ZodEnum<{
          "sign-in": "sign-in";
          "email-verification": "email-verification";
          "forget-password": "forget-password";
        }>;
        otp: zod415.ZodString;
      }, zod_v4_core57.$strip>;
      metadata: {
        openapi: {
          operationId: string;
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
    } & {
      use: any[];
    }, {
      success: boolean;
    }>;
    verifyEmailOTP: better_call132.StrictEndpoint<"/email-otp/verify-email", {
      method: "POST";
      body: zod415.ZodObject<{
        email: zod415.ZodString;
        otp: zod415.ZodString;
      }, zod_v4_core57.$strip>;
      metadata: {
        openapi: {
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
                        description: string;
                        enum: boolean[];
                      };
                      token: {
                        type: string;
                        nullable: boolean;
                        description: string;
                      };
                      user: {
                        $ref: string;
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
    } & {
      use: any[];
    }, {
      status: boolean;
      token: string;
      user: {
        id: string;
        email: string;
        emailVerified: boolean;
        name: string;
        image: string | null | undefined;
        createdAt: Date;
        updatedAt: Date;
      };
    } | {
      status: boolean;
      token: null;
      user: {
        id: string;
        email: string;
        emailVerified: boolean;
        name: string;
        image: string | null | undefined;
        createdAt: Date;
        updatedAt: Date;
      };
    }>;
    signInEmailOTP: better_call132.StrictEndpoint<"/sign-in/email-otp", {
      method: "POST";
      body: zod415.ZodObject<{
        email: zod415.ZodString;
        otp: zod415.ZodString;
      }, zod_v4_core57.$strip>;
      metadata: {
        openapi: {
          operationId: string;
          description: string;
          responses: {
            200: {
              description: string;
              content: {
                "application/json": {
                  schema: {
                    type: "object";
                    properties: {
                      token: {
                        type: string;
                        description: string;
                      };
                      user: {
                        $ref: string;
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
    } & {
      use: any[];
    }, {
      token: string;
      user: {
        id: string;
        email: string;
        emailVerified: boolean;
        name: string;
        image: string | null | undefined;
        createdAt: Date;
        updatedAt: Date;
      };
    }>;
    forgetPasswordEmailOTP: better_call132.StrictEndpoint<"/forget-password/email-otp", {
      method: "POST";
      body: zod415.ZodObject<{
        email: zod415.ZodString;
      }, zod_v4_core57.$strip>;
      metadata: {
        openapi: {
          operationId: string;
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
                        description: string;
                      };
                    };
                  };
                };
              };
            };
          };
        };
      };
    } & {
      use: any[];
    }, {
      success: boolean;
    }>;
    resetPasswordEmailOTP: better_call132.StrictEndpoint<"/email-otp/reset-password", {
      method: "POST";
      body: zod415.ZodObject<{
        email: zod415.ZodString;
        otp: zod415.ZodString;
        password: zod415.ZodString;
      }, zod_v4_core57.$strip>;
      metadata: {
        openapi: {
          operationId: string;
          description: string;
          responses: {
            200: {
              description: string;
              contnt: {
                "application/json": {
                  schema: {
                    type: string;
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
    } & {
      use: any[];
    }, {
      success: boolean;
    }>;
  };
  hooks: {
    after: {
      matcher(context: _better_auth_core4.HookEndpointContext): boolean;
      handler: (inputContext: better_call132.MiddlewareInputContext<better_call132.MiddlewareOptions>) => Promise<void>;
    }[];
  };
  $ERROR_CODES: {
    readonly OTP_EXPIRED: "OTP expired";
    readonly INVALID_OTP: "Invalid OTP";
    readonly TOO_MANY_ATTEMPTS: "Too many attempts";
  };
  rateLimit: ({
    pathMatcher(path: string): path is "/email-otp/send-verification-otp";
    window: number;
    max: number;
  } | {
    pathMatcher(path: string): path is "/email-otp/check-verification-otp";
    window: number;
    max: number;
  } | {
    pathMatcher(path: string): path is "/email-otp/verify-email";
    window: number;
    max: number;
  } | {
    pathMatcher(path: string): path is "/sign-in/email-otp";
    window: number;
    max: number;
  })[];
};
//#endregion
export { EmailOTPOptions as n, emailOTP as t };