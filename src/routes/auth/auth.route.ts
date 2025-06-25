import Router from "express";
import { validateData } from "../../middleware/zod.validation";
import {
  loginschema,
  registerSchema,
  updateEmailSchema,
  updatePasswordSchema,
  userUpdateSchema,
} from "../../zodSchema/zod.schema";
import * as authController from "../../controller/auth/auth.controller";
import { verifyToken } from "../../middleware/verifyToken";
import {
  updateEmailController,
  updatePasswordController,
  updateUserInfoCOntroller,
} from "../../controller/auth/user.Controller";

const router = Router();

router.post(
  "/register",
  validateData(registerSchema),
  authController.registerUserController
);
router.post(
  "/login",
  validateData(loginschema),
  authController.loginController
);
router.get("/getUser/:user_id", verifyToken, authController.getUserData);
router.post(
  "/update",
  validateData(userUpdateSchema),
  verifyToken,
  updateUserInfoCOntroller
);
router.post(
  "/update/email",
  validateData(updateEmailSchema),
  verifyToken,
  updateEmailController
);
router.post(
  "/update/password",
  validateData(updatePasswordSchema),
  verifyToken,
  updatePasswordController
);
export default router;
