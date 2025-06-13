import e, { Request, Response } from "express";

import { findUserByEmail } from "../../utilities/helper";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../config/db";
import { error } from "console";
import { AuthError } from "../../cutomErrorhandler/authError";
import { loginUser, registerUser } from "../../services/auth/authServices";

export const loginController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { user } = req.body;
    const { token, user_id } = await loginUser(user);
    res
      .status(200)
      .json({ token: token, user_id: user_id, message: "login successfully" });
  } catch (err) {
    if (err instanceof AuthError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const registerUserController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userDetail } = req.body;
  try {
    const user = await registerUser(userDetail);
    res.status(201).json({ message: "register successfully" });
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error(error);
    return res.status(500).json({ error: "internal server error" });
  }
};
