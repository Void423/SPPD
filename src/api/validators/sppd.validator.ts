import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sppd } from "../database/schema";

// ─── Base schemas from Drizzle ────────────────────────────────────────────────

/**
 * Base insert schema generated from the `sppd` drizzle table.
 * Used as the foundation for the create validator.
 */
const baseInsertSppd = createInsertSchema(sppd, {
  sppd_number: z
    .string()
    .min(1, "Nomor SPPD tidak boleh kosong")
    .max(100, "Nomor SPPD terlalu panjang"),

  purpose: z.string().min(5, "Tujuan perjalanan minimal 5 karakter"),

  transportation: z
    .string()
    .min(1, "Moda transportasi tidak boleh kosong")
    .max(100, "Moda transportasi terlalu panjang"),

  depart: z
    .string()
    .min(1, "Tempat keberangkatan tidak boleh kosong")
    .max(255, "Tempat keberangkatan terlalu panjang"),

  destination: z
    .string()
    .min(1, "Tempat tujuan tidak boleh kosong")
    .max(255, "Tempat tujuan terlalu panjang"),

  day: z.string().min(1, "Jumlah hari tidak boleh kosong"),

  start_time: z.iso.date(),
  end_time: z.iso.date(),
});

// ─── Create Validator ─────────────────────────────────────────────────────────

/**
 * Validator for creating a new SPPD entry.
 *
 * - `id`, `createdAt`, `updatedAt` are excluded (auto-generated server-side).
 * - `employeeId` is excluded (resolved from the authenticated session).
 * - Validates that `end_time` is not before `start_time`.
 */
export const createSppdSchema = baseInsertSppd
  .omit({
    id: true,
    employeeId: true,
    createdAt: true,
    updatedAt: true,
  })
  .refine((data) => new Date(data.end_time) >= new Date(data.start_time), {
    message: "Tanggal kembali tidak boleh sebelum tanggal keberangkatan",
    path: ["end_time"],
  });

// ─── Update Validator ─────────────────────────────────────────────────────────

/**
 * Validator for updating an existing SPPD entry (partial update / PATCH).
 *
 * All fields are optional — only the provided fields will be validated.
 * At least one field must be present in the request body.
 */
export const updateSppdSchema = baseInsertSppd
  .omit({
    id: true,
    employeeId: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Minimal satu field harus diisi untuk melakukan update",
  })
  .refine(
    (data) => {
      if (data.start_time && data.end_time) {
        return new Date(data.end_time) >= new Date(data.start_time);
      }
      return true;
    },
    {
      message: "Tanggal kembali tidak boleh sebelum tanggal keberangkatan",
      path: ["end_time"],
    },
  );

// ─── Params Validator ─────────────────────────────────────────────────────────

/**
 * Validator for route params that contain an SPPD UUID (e.g. GET /sppd/:id).
 */
export const sppdParamsSchema = z.object({
  id: z.uuid("ID SPPD tidak valid"),
});

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type CreateSppdInput = z.infer<typeof createSppdSchema>;
export type UpdateSppdInput = z.infer<typeof updateSppdSchema>;
export type SppdParams = z.infer<typeof sppdParamsSchema>;
