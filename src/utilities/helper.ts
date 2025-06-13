import prisma from "../config/db";

export const findUserByEmail = async (email: string) => {
  if (!email) throw new Error("no email found");
  const user = await prisma.users.findUnique({
    where: { email: email },
  });
  if (!user) return null;
  return user;
};
