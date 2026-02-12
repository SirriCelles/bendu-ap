import { z } from "zod";

export type RawSearchParams = Record<string, string | string[] | undefined>;

const roomTypeSchema = z.enum(["room", "studio", "apartment"]);

const isoDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must use YYYY-MM-DD format");

const roomsSearchParamsSchema = z
  .object({
    checkIn: isoDateSchema.optional(),
    checkOut: isoDateSchema.optional(),
    guests: z
      .preprocess((value) => {
        if (value === undefined || value === "") return undefined;
        if (typeof value === "string") return Number(value);
        return value;
      }, z.number().int().min(1).max(12).optional())
      .optional(),
    type: roomTypeSchema.optional(),
  })
  .superRefine((value, ctx) => {
    const hasAnyCoreFilter =
      value.checkIn !== undefined || value.checkOut !== undefined || value.guests !== undefined;

    if (hasAnyCoreFilter) {
      if (!value.checkIn) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "checkIn is required when applying availability filters.",
          path: ["checkIn"],
        });
      }

      if (!value.checkOut) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "checkOut is required when applying availability filters.",
          path: ["checkOut"],
        });
      }

      if (value.guests === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "guests is required when applying availability filters.",
          path: ["guests"],
        });
      }
    }

    if (value.checkIn && value.checkOut) {
      const start = new Date(value.checkIn);
      const end = new Date(value.checkOut);
      if (!Number.isNaN(start.getTime()) && !Number.isNaN(end.getTime()) && end <= start) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "checkOut must be after checkIn.",
          path: ["checkOut"],
        });
      }
    }
  });

export type RoomsSearchFilters = {
  checkIn?: string;
  checkOut?: string;
  guests: number;
  type?: z.infer<typeof roomTypeSchema>;
};

export type ParsedRoomsSearchParams = {
  filters: RoomsSearchFilters;
  hasActiveFilters: boolean;
  errors: string[];
};

function firstValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export function parseRoomsSearchParams(params: RawSearchParams): ParsedRoomsSearchParams {
  const normalized = {
    checkIn: firstValue(params.checkIn)?.trim(),
    checkOut: firstValue(params.checkOut)?.trim(),
    guests: firstValue(params.guests)?.trim(),
    type: firstValue(params.type)?.trim().toLowerCase(),
  };

  const result = roomsSearchParamsSchema.safeParse(normalized);

  if (!result.success) {
    return {
      filters: { guests: 1 },
      hasActiveFilters: Object.values(normalized).some(Boolean),
      errors: result.error.issues.map((issue) => issue.message),
    };
  }

  const data = result.data;

  return {
    filters: {
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guests: data.guests ?? 1,
      type: data.type,
    },
    hasActiveFilters: Boolean(data.checkIn || data.checkOut || data.guests || data.type),
    errors: [],
  };
}
