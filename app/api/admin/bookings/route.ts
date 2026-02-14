import { auth } from "@/auth";
import { HttpError, toErrorResponse } from "@/lib/http/errors";
import { requireAdminSession } from "@/lib/security/admin-session";

export async function GET(): Promise<Response> {
  try {
    const session = await auth();
    requireAdminSession(session);

    return Response.json(
      {
        data: [],
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof HttpError) {
      return toErrorResponse(error);
    }

    return toErrorResponse(new HttpError(500, "INTERNAL_SERVER_ERROR", "Unexpected server error."));
  }
}
