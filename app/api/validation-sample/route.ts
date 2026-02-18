import { HttpError, toErrorResponse } from "@/lib/http/errors";
import {
  createRateLimitError,
  getRequestIdentifier,
  limitRequest,
  rateLimitHeaders,
} from "@/lib/security/rate-limit";
import { bookingReservationRequestSchema } from "@/lib/validation/booking";
import { parseJsonBody } from "@/lib/validation/parser";

export async function POST(request: Request) {
  try {
    const rateLimitResult = await limitRequest("sample_write", getRequestIdentifier(request));
    if (!rateLimitResult.success) {
      const errorResponse = toErrorResponse(createRateLimitError(rateLimitResult));
      const headers = new Headers(errorResponse.headers);
      const limitHeaders = rateLimitHeaders(rateLimitResult);
      for (const [key, value] of Object.entries(limitHeaders)) {
        headers.set(key, value);
      }
      return new Response(errorResponse.body, {
        status: errorResponse.status,
        headers,
      });
    }

    const payload = await parseJsonBody(request, bookingReservationRequestSchema);

    const successResponse = Response.json(
      {
        ok: true,
        data: payload,
      },
      { status: 201 }
    );
    const headers = new Headers(successResponse.headers);
    const limitHeaders = rateLimitHeaders(rateLimitResult);
    for (const [key, value] of Object.entries(limitHeaders)) {
      headers.set(key, value);
    }
    return new Response(successResponse.body, {
      status: successResponse.status,
      headers,
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return toErrorResponse(error);
    }

    return toErrorResponse(new HttpError(500, "INTERNAL_SERVER_ERROR", "Unexpected server error."));
  }
}
