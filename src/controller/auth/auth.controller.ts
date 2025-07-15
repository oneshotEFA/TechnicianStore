import e, { Request, Response } from "express";

import { findUserByEmail } from "../../utilities/helper";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../config/db";

import { CustomError } from "../../cutomErrorhandler/authError";
import { loginUser, registerUser } from "../../services/auth/authServices";

export const loginController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { user } = req.body;
    const { token, userData } = await loginUser(user);
    console.log("user login");
    return res.status(200).json({
      token: token,
      userData: userData,
      message: "login successfully",
    });
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
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
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error(error);
    return res.status(500).json({ error: "internal server error" });
  }
};
export const getUserData = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { user_id } = req.params;
    const data = await prisma.users.findUnique({
      where: { user_id: Number(user_id) },
    });
    if (data)
      return res.status(200).json({
        success: true,
        message: "fetched User",
        userData: data,
      });
    else
      return res.status(404).json({
        success: false,
        message: "No user found based on the given id",
        userData: null,
      });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message || "internal server error",
      userData: null,
    });
  }
};
