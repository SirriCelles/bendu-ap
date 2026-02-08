import { z } from "zod";

import { HttpError, validationErrorFromZod } from "@/http/errors";

export async function parseJsonBody<TSchema extends z.ZodTypeAny>(
  request: Request,
  schema: TSchema
): Promise<z.infer<TSchema>> {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    throw new HttpError(400, "BAD_REQUEST", "Request body must be valid JSON.");
  }

  const result = schema.safeParse(payload);
  if (!result.success) {
    throw validationErrorFromZod(result.error);
  }

  return result.data;
}

export function parseSearchParams<TSchema extends z.ZodTypeAny>(
  request: Request,
  schema: TSchema
): z.infer<TSchema> {
  const source = Object.fromEntries(new URL(request.url).searchParams.entries());
  const result = schema.safeParse(source);

  if (!result.success) {
    throw validationErrorFromZod(result.error);
  }

  return result.data;
}

export function parseParams<TSchema extends z.ZodTypeAny>(
  params: unknown,
  schema: TSchema
): z.infer<TSchema> {
  const result = schema.safeParse(params);

  if (!result.success) {
    throw validationErrorFromZod(result.error);
  }

  return result.data;
}
