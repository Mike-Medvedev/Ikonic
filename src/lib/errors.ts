import { HTTPSTATUSCODE } from "@/constants/constants";
import { AuthService } from "@/features/Auth/Services/authService";

/**
 * Abstract Class that defines an App error which adds a status field to a regular JS Error
 */
abstract class AppError extends Error {
  readonly status: number | undefined;
  readonly cause: unknown;

  protected constructor(name: string, message: string, status?: number, options?: { cause?: unknown }) {
    super(message, options);
    this.name = name;
    this.status = status;
    this.message = message;
    this.cause = options?.cause;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Defines ApiError which has a status field for HTTP Status codes
 */
export class ApiError extends AppError {
  constructor(status: number, message: string, opts?: { cause?: unknown }) {
    super("ApiError", message, status, opts);
  }
}
/**
 * Unknown Error for any uncaught errors
 */
export class UnknownError extends Error {}

/**
 * Network error for resource fetching such as Fetch Api
 */
export class NetworkError extends AppError {
  constructor(message: string, opts?: { cause?: unknown }) {
    super("NetworkError", message, undefined, opts);
  }
}

/**
 * Generic Error Wrapper that wraps a try catch around an async function and handles accordingly
 * @param fn original function with original parameters ...args
 * @returns the same function with error handling
 */
export function withError<TArgs extends unknown[], T>(
  fn: (...args: TArgs) => Promise<T>,
): (...args: TArgs) => Promise<T> {
  return async (...args: TArgs) => {
    try {
      const result = await fn(...args);
      return result;
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === HTTPSTATUSCODE.UNAUTHENTICATED || error.status === HTTPSTATUSCODE.FORBIDDEN) {
          console.error(`Authentication error (${error.status}), signing out.`);
          AuthService.signOut();
        }
        throw error;
      }
      throw error;
    }
  };
}

export const errors: Record<number, string> = {
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Payload Too Large",
  414: "URI Too Long",
  415: "Unsupported Media Type",
  416: "Range Not Satisfiable",
  417: "Expectation Failed",
  418: "Im a teapot",
  421: "Misdirected Request",
  422: "Unprocessable Content",
  423: "Locked",
  424: "Failed Dependency",
  425: "Too Early",
  426: "Upgrade Required",
  428: "Precondition Required",
  429: "Too Many Requests",
  431: "Request Header Fields Too Large",
  451: "Unavailable For Legal Reasons",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates",
  507: "Insufficient Storage",
  508: "Loop Detected",
  510: "Not Extended",
  511: "Network Authentication Required",
};
