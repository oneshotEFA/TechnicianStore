import { Router } from "express";
import authroutes from "./auth/auth.route";
const router = Router();
router.use("/auth", authroutes);

export default router;
