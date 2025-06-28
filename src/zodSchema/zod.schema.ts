import z, { string } from "zod";

export const loginschema = z.object({
  user: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});
export const registerSchema = z.object({
  userDetail: z.object({
    firstName: z.string().max(10),
    lastName: z.string().max(10),
    email: z.string().email(),
    password: z.string().min(8),
    storeName: z.string().optional(),
    phone_number: z.string(),
    address: z.string(),
  }),
});
export const materialSchema = z.object({
  name: z.string(),
  user_id: z.number(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  quantity: z.number(),
  address: z.string(),
  material_images: z.object({
    url_0: z.string(),
    url_1: z.string(),
    url_2: z.string(),
    alt_text: z.string(),
  }),
});
export const userUpdateSchema = z.object({
  user_id: z.number(),
  storeName: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone_number: z.string().optional(),
  address: z.string().optional(),
});
export const updateEmailSchema = z.object({
  newEmail: z.string().email(),
  currentPassword: z.string().min(6),
  user_id: z.number().int(),
});

export type UpdateEmailInput = z.infer<typeof updateEmailSchema>;

export const updatePasswordSchema = z.object({
  user_id: z.number(),
  oldPassword: z.string().min(8),
  newPassword: z.string().min(8),
});
export type updatePasswordInput = z.infer<typeof updatePasswordSchema>;
