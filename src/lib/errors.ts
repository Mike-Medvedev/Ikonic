import { HTTPSTATUSCODE } from "@/constants/constants";
import { AuthService } from "@/features/Auth/Services/authService";

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

export class ApiError extends AppError {
  constructor(status: number, message: string, opts?: { cause?: unknown }) {
    super("ApiError", message, status, opts);
  }
}
export class UnknownError extends Error {}

export class NetworkError extends AppError {
  constructor(message: string, opts?: { cause?: unknown }) {
    super("NetworkError", message, undefined, opts);
  }
}

export function withError<T>(fn: () => Promise<T>): () => Promise<T> {
  return async () => {
    try {
      const result = await fn();
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
