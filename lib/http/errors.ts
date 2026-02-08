import { z } from "zod";

export type HttpErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "TOO_MANY_REQUESTS"
  | "INTERNAL_SERVER_ERROR"
  | "VALIDATION_ERROR";

export type ErrorResponseBody = {
  error: {
    code: HttpErrorCode;
    message: string;
    details?: Record<string, string[]>;
  };
};

export class HttpError extends Error {
  readonly status: number;
  readonly code: HttpErrorCode;
  readonly details?: Record<string, string[]>;

  constructor(
    status: number,
    code: HttpErrorCode,
    message: string,
    details?: Record<string, string[]>
  ) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function validationErrorFromZod(error: z.ZodError): HttpError {
  const { fieldErrors } = z.flattenError(error);
  return new HttpError(
    400,
    "VALIDATION_ERROR",
    "Validation failed for request data.",
    fieldErrors
  );
}

export function toErrorResponse(error: HttpError): Response {
  const body: ErrorResponseBody = {
    error: {
      code: error.code,
      message: error.message,
      details: error.details,
    },
  };

  return Response.json(body, { status: error.status });
}
