import Router from "express";
import { validateData } from "../../middlewar/zod.validation";
import { loginschema, registerSchema } from "../../zodSchema/zod.schema";
import {
  loginController,
  registerUserController,
} from "../../controller/auth/auth.controller";

const router = Router();

router.post("/register", validateData(registerSchema), registerUserController);
router.post("/login", validateData(loginschema), loginController);

export default router;
