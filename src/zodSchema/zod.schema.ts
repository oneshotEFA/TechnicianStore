import z from "zod";

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
    storeName: z.string(),
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
  material_images: z.object({
    url_0: z.string(),
    url_1: z.string(),
    url_2: z.string(),
    alt_text: z.string(),
  }),
});
