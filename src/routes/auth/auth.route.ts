import Router from "express";
import { validateData } from "../../middleware/zod.validation";
import { loginschema, registerSchema } from "../../zodSchema/zod.schema";
import * as authController from "../../controller/auth/auth.controller";
import { verifyToken } from "../../middleware/verifyToken";

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
router.get("/getUser", verifyToken, authController.getUserData);
export default router;
