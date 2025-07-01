import { Request, Response } from "express";
import { userUpdateDetail } from "../../types/type";
import {
  forgotPassword,
  resetPassword,
  updateEmail,
  updatePassword,
  updateUserInfo,
} from "../../services/auth/authUpdate.User";
export const updateUserInfoCOntroller = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const info = req.body as userUpdateDetail;
    const result = await updateUserInfo(info);
    if (result)
      return res
        .status(201)
        .json({ success: true, message: "user Info updated", user: result });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "internal sever error" });
  }
};
export const updateEmailController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const result = await updateEmail(req.body);

  if (!result.success) {
    return res.status(400).json(result);
  }

  return res.status(200).json(result);
};

export const updatePasswordController = async (
  req: Request,
  res: Response
): Promise<any> => {
  console.log(req.body);
  const result = await updatePassword(req.body);

  if (!result.success) {
    return res.status(400).json(result);
  }

  return res.status(200).json(result);
};
export const forgotPasswordController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email } = req.body;
    const result = await forgotPassword(email);
    if (result.success) {
      return res.status(201).json({
        success: true,
        message: result.message,
      });
    }
    return res.status(404).json({
      success: false,
      message: result.message,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "internal sever error" });
  }
};

export const restPasswordController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { token, newPassword } = req.body;
    const result = await resetPassword(token, newPassword);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Password reset successfully",
      });
    }
    return res.status(400).json({
      success: false,
      message: result.message,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "internal sever error" });
  }
};
