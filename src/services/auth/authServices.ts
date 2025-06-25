import { loginUserType, userDetail } from "../../types/type";
import { findUserByEmail } from "../../utilities/helper";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "../../config/db";
import { CustomError } from "../../cutomErrorhandler/authError";
export const registerUser = async (newuser: userDetail) => {
  const existing = await findUserByEmail(newuser.email);
  if (existing) {
    throw new CustomError("email already exist", 401);
  }
  const hashpass = await bcrypt.hash(newuser.password, 10);
  const user = await prisma.users.create({
    data: {
      ...newuser,
      password: hashpass,
    },
  });
  return user;
};

export const loginUser = async (login: loginUserType) => {
  const user = await findUserByEmail(login.email);
  if (!user) {
    throw new CustomError("invalid email address", 401);
  }
  const isMatch = await bcrypt.compare(login.password, user.password);
  if (!isMatch) {
    throw new CustomError("invalid password");
  }
  const JWT_KEY = process.env.JWT_KEY || "";
  const token = jwt.sign(
    {
      userId: user.user_id,
      email: user.email,
    },
    JWT_KEY,
    {
      expiresIn: "7d",
    }
  );
  return { token: token, userData: user };
};
