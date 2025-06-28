import { equal } from "assert";
import prisma from "../config/db";
import fs from "fs";
export const findUserByEmail = async (email: string) => {
  if (!email) throw new Error("no email found");
  const user = await prisma.users.findFirst({
    where: {
      email: {
        equals: email,
        mode: "insensitive", // Case-insensitive comparison
      },
    },
  });
  if (!user) return null;
  return user;
};

export const deleteImg = (filePath: string) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Failed to delete file:", filePath, err);
    } else {
      //deleteing
    }
  });
};
