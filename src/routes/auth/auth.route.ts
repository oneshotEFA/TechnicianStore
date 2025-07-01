import Router from "express";
import { validateData } from "../../middleware/zod.validation";
import * as zodSchema from "../../zodSchema/zod.schema";
import * as authController from "../../controller/auth/auth.controller";
import { verifyToken } from "../../middleware/verifyToken";
import * as userController from "../../controller/auth/user.Controller";

const router = Router();

router.post(
  "/register",
  validateData(zodSchema.registerSchema),
  authController.registerUserController
);
router.post(
  "/login",
  validateData(zodSchema.loginschema),
  authController.loginController
);
router.get("/getUser/:user_id", verifyToken, authController.getUserData);
router.post(
  "/update",
  validateData(zodSchema.userUpdateSchema),
  verifyToken,
  userController.updateUserInfoCOntroller
);
router.post(
  "/update/email",
  validateData(zodSchema.updateEmailSchema),
  verifyToken,
  userController.updateEmailController
);
router.post(
  "/update/password",
  validateData(zodSchema.updatePasswordSchema),
  verifyToken,
  userController.updatePasswordController
);

router.post("/forgot", userController.forgotPasswordController);
router.post("/forgot/reset", userController.restPasswordController);
export default router;
