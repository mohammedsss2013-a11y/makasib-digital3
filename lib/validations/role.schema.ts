import { z } from "zod";

export const userRoleSchema = z.enum(["super_admin", "admin", "editor", "user"]);

export const upsertRoleSchema = z.object({
  userId: z.string().uuid("معرف المستخدم غير صالح").optional().nullable(),
  email: z.string().email("البريد الإلكتروني غير صالح").optional().nullable(),
  role: userRoleSchema,
}).refine((input) => Boolean(input.userId || input.email), {
  message: "يجب إدخال معرف المستخدم أو البريد الإلكتروني",
});

export const deleteRoleSchema = z.string().uuid("معرف المستخدم غير صالح");
