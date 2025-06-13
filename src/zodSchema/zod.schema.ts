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
