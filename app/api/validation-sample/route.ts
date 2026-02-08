import { HttpError, toErrorResponse } from "@/http/errors";
import { parseJsonBody } from "@/validation/parser";
import { sampleReservationSchema } from "@/validation/sample-reservation";

export async function POST(request: Request) {
  try {
    const payload = await parseJsonBody(request, sampleReservationSchema);

    return Response.json(
      {
        ok: true,
        data: payload,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof HttpError) {
      return toErrorResponse(error);
    }

    return toErrorResponse(
      new HttpError(500, "INTERNAL_SERVER_ERROR", "Unexpected server error.")
    );
  }
}
